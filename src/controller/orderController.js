const Order = require("../models/Order");
const User = require("../models/User");
const { processOrder } = require('../services/orderService');


exports.Buy = async (req, res) => {
    const { amount, price , orderId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(200).json({ error: "کاربر یافت نشد" });

        }
        const totalCost = amount * price;
        if (user.wallet < totalCost) {
          return res.status(200).json({ error: "موجودی  کافی نمیباشد" });

        }
      if(orderId === ""){
        const order = new Order({
            user: req.user.id,
            type: "buy",
            amount: amount,
            amountRemaining: amount,
            price: price,
            status: "open",
          });
          await order.save();
          return res.status(200).json({ error: "سفارش شما ثبت و پردازش شد" });
   
       }
      const order = await Order.findById(orderId);
      const seller = await User.findById(order.user)
      

      if(user._id.equals(order.user)){
        return res.status(200).json({ error: "سفارش شما ثبت و پردازش شد" });
      }
  
    
    await User.findByIdAndUpdate({_id:user._id} , {$set:{wallet:Number(user.wallet) - totalCost,balance:Number(user.balance) + Number(amount)}} , {new:true});
    await User.findByIdAndUpdate({_id:seller._id}  , {$set:{balance:Number(seller.balance) - Number(amount) , wallet:Number(seller.wallet) + Number(totalCost)}} , {new:true})      
    await Order.findByIdAndUpdate({_id:order._id} , {$set:{status:"completed" , ApprovedBy:user._id}} , {new:true})      

    return res.status(200).json({ error: "سفارش خرید ثبت و پردازش شد" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "سفارش خرید ثبت و پردازش شد" });

    }
  };
  

exports.Sell = async (req, res) => {
    const { amount, price,orderId  } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "کاربر یافت نشد" });
        }       
        if (user.balance < amount) {
          return res.status(400).json({ error: "موجودی تتر کافی" });

        }             
        if(orderId === ""){
            console.log("THIS SAVE ORDER")
            const order = new Order({
                user: req.user.id,
                type: "sell",
                amount: amount,
                amountRemaining: amount,
                price: price,
                status: "open",
              });
              await order.save();
              return res.status(200).json({ error: "درخواست شما ثبت شد" });

          }else{
            const order = await Order.findById(orderId)
            const seller = await User.findById(order.user)
            if(user._id.equals(order.user)){
              return res.status(200).json({ error: "سفارش مطعلق به شماست" });

              }
              console.log()
        const totalAmount = amount * price;
        
        await User.findByIdAndUpdate(
            {_id: user._id}, 
            {$set: {
                balance: Number(user.balance) - Number(amount),
                wallet: Number(user.wallet) + totalAmount
            }}, 
            {new: true}
        );
        
        await User.findByIdAndUpdate(
            {_id: seller._id}, 
            {$set: {
                balance: Number(seller.balance) + Number(amount),
                wallet: Number(seller.wallet) - totalAmount
            }}, 
            {new: true}
        );      
        
        await Order.findByIdAndUpdate(
            {_id: order._id}, 
            {$set: {status: "completed", ApprovedBy: user._id}}, 
            {new: true}
        );
  
        return res.status(200).json({ error: "سفارش فروش ثبت و پردازش شد" });

    }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "مجدد امتحان کنید" });

    }
};
  
exports.exchange = async (req, res) => {
    try {
      // دریافت پیشنهادات فروش فعال
      const sellOrders = await Order.find({ 
        type: "sell",
        status: "open"
      })
      .sort({ price: 1 }) // مرتب‌سازی بر اساس قیمت (صعودی)
      .select('price amount amountRemaining createdAt')
      .limit(10);
  
      // اضافه کردن محاسبه مبلغ کل
      const processedSellOrders = sellOrders.map(order => ({
        ...order.toObject(),
        totalAmount: order.amountRemaining * order.price,
      }));
  
      res.render('panel/index', {
        user: req.user,
        sellOrders: processedSellOrders,
      });
    } catch (error) {
      console.error('Error in exchange route:', error);
      res.render('panel/index', {
        user: req.user,
        sellOrders: [],
        error: 'خطا در بارگذاری اطلاعات',
      });
    }
  };
  
exports.buyOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        await processOrder(req.user.id, orderId);
        
        req.flash('success', 'خرید با موفقیت انجام شد');
        res.redirect('/exchange');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/exchange');
    }
};
  