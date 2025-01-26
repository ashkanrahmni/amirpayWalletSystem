// src/controllers/exchangeController.js
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const RialTransaction = require('../models/RialTransaction');
const jwt = require('jsonwebtoken');
const { getTetherPrice } = require('../services/priceService');
const { getSellOrders } = require('../services/orderService');
const { getBalance, getUsdtBalance, getBalancebyToken, TransActionsUsdt } = require('../services/walletService');
const { getIPGUri, ipgCallback } = require('../services/amirPayServices');
const NobitexService = require('../services/nobitexService');
const Order = require('../models/Order');
const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};


exports.ipgCallback = async (req, res,next) => {
  try {
    const {orderId , status} = req.query
    if(status == 'OK'){
       const CB =  await ipgCallback(orderId)
       console.log(CB)
       if(CB.code === 100 || CB.success === true){
        const transaction = await RialTransaction.findOne({orderId:orderId})
        const user = await User.findById(transaction.userId)
        transaction.status = true
        user.wallet += transaction.price
        await user.save()
        await transaction.save()
        const payload = {
          firstName:user.firstName,
          lastName:user.lastName,
          phone:user.phone,
          email:user.email,
          tetherWallet:user.tetherWallet,
          status:user.status,
          balance:user.balance,
          wallet:user.wallet
      }
        const token = jwt.sign({ id: user._id,payload }, '1234567890', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.redirect('/exchange/wallets')
        return;
       }
  
    }else{
      res.redirect('/exchange/wallets')
      return;
    }
  } catch (error) {
    next(error)
  }
}


exports.IpgStart = async (req, res,next) => {
  try {
    const { amount } = req.body;
    const IPG =await  getIPGUri(amount,`واریزی ${amount}`);
    console.log(IPG)
    const rialSchema = new RialTransaction(
      {
        userId:req.user.id,
        price:amount,
        orderId:IPG.orderId,
      }
    )
    await rialSchema.save()
    res.redirect(IPG.linkMain)
    return;
  } catch (error) {
    next(error)
  }
}
exports.buyTether = async (req, res) => {
  try {
    const { amount } = req.body; // مقدار خرید
    const userId = req.user.id; 
    const tetherPrice = await getTetherPrice();
    const totalCost = amount * tetherPrice;

    const user = await User.findById(userId);
    if (user.wallet < totalCost) {
      return res.status(400).json({ message: 'موجودی کافی نیست.' });
    }

    user.wallet -= totalCost;
    await user.save();

    const transaction = new Transaction({
      userId,
      type: 'buy',
      amount,
      price: tetherPrice,
    });
    await transaction.save();

    res.status(200).json({ message: 'خرید موفقیت‌آمیز بود.', transaction });
  } catch (error) {
    res.status(500).json({ message: 'خطا در خرید تتر.', error: error.message });
  }
};

exports.sellTether = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    const tetherPrice = await getTetherPrice();
    const totalRevenue = amount * tetherPrice;

    const user = await User.findById(userId);
    if (user.wallet < amount) {
      return res.status(400).json({ message: 'تتر کافی نیست.' });
    }

    user.wallet += totalRevenue;
    await user.save();

    const transaction = new Transaction({
      userId,
      type: 'sell',
      amount,
      price: tetherPrice,
    });
    await transaction.save();

    res.status(200).json({ message: 'فروش موفقیت‌آمیز بود.', transaction });
  } catch (error) {
    res.status(500).json({ message: 'خطا در فروش تتر.', error: error.message });
  }
};

exports.PanelIndex = async (req, res, next) => {
    try {
        // دریافت سفارشات فروش فعال و مرتب‌سازی بر اساس قیمت نزولی
        const sellOrders = await Order.find({ type: "sell", status: "open" })
            .sort({ price: -1 })
            .select('price amountRemaining createdAt _id')
            .lean()
            .limit(10);

        // دریافت سفارشات خرید فعال و مرتب‌سازی بر اساس قیمت نزولی
        const buyOrders = await Order.find({ type: "buy", status: "open" })
            .sort({ price: -1 })
            .select('price amountRemaining createdAt _id')
            .lean()
            .limit(10);

        // محاسبه مبلغ کل برای هر سفارش فروش
        sellOrders.forEach(order => {
            order.totalAmount = order.price * order.amountRemaining; // استفاده از amountRemaining
        });

        // محاسبه مبلغ کل برای هر سفارش خرید
        buyOrders.forEach(order => {
            order.totalAmount = order.price * order.amountRemaining;
        });
        const rawTransactions = await Order.find({ApprovedBy:req.user.id}).lean();
        const transactions = rawTransactions.map(transaction => ({
            ...transaction,
            totalAmount: transaction.price * transaction.amount
        }));        
        const lowestSellOrder = await Order.findOne({ 
          type: "sell", 
          status: "open" 
      })
      .sort({ price: 1 })
      .lean();

      // محاسبه بالاترین قیمت خرید
      const highestBuyOrder = await Order.findOne({ 
          type: "buy", 
          status: "open" 
      })
      .sort({ price: -1 })
      .lean();

        // const balance = await getBalance(req.user.payload.tetherWallet.addressBase58);

        // ارسال داده‌ها به ویو
        return res.render('panel/index', {
            title: 'پنل مدیریت',
            layout: 'main',
            user: req.user,
            balance: 0,
            buyOrders,
            sellOrders,
            Transactions: transactions,
            wallet: req.user.payload.wallet,
            lowestSellOrder,
            highestBuyOrder
        });
    } catch (error) {
        // مدیریت خطاها
        next(error);
    }
};

exports.walletIndex = async (req, res, next) => {
    try {
        // بررسی وجود کاربر و اطلاعات آن
        if (!req.user || !req.user.id) {
            return res.redirect('/auth/login');
        }

        // دریافت تراکنش‌ها
        const transactions = await RialTransaction.find({ userId: req.user.id })
            .sort({ date: -1 })
            .lean(); 
        const transactionsUSDT = await Transaction.find({ userId: req.user.id })
            .sort({ date: -1 })
            .lean(); 
        return res.render('panel/wallets', {
            user: req.user,
            layout: 'main',
            balance: req.user.payload?.balance || 0,
            wallet: req.user.payload?.tetherWallet?.addressBase58,
            RialBalance: formatNumber(req.user.payload?.wallet || 0),
            Transactions: transactions,
            TransactionsUSDT:transactionsUSDT
        });
    } catch (error) {
        console.error('Error in walletIndex:', error);
        next(error);
    }
}