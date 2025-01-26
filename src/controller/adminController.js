const RialTransaction = require('../models/RialTransaction');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { formatNumber } = require('../utils/formatNumber');

// نمایش داشبورد اصلی ادمین
exports.AdminDashboardIndex = async (req, res) => {
    try {
        // تنظیم تاریخ شروع و پایان امروز
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const totalUsers = await User.countDocuments();
        const totalTransactions = await RialTransaction.countDocuments();
        const todayTransactions = await RialTransaction.countDocuments({
            createdAt: { $gte: today, $lt: tomorrow }
        });
        const totalVolume = await RialTransaction.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // دریافت آخرین تراکنش‌های ریالی
        const recentRialTransactions = await RialTransaction.find()
            .populate('userId', 'firstName phone')
            .sort({ createdAt: -1 })
            .limit(5);

        // دریافت آخرین تراکنش‌های ارزی
        const recentTransactions = await Transaction.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        res.render('admin/dashboard', {
            layout: 'main',
            totalUsers,
            totalTransactions,
            todayTransactions,
            totalVolume: formatNumber(totalVolume[0]?.total || 0),
            recentRialTransactions: recentRialTransactions.map(tx => ({
                ...tx.toObject(),
                amount: formatNumber(tx.amount),
                userName: tx.userId?.firstName || 'کاربر ناشناس',
                userEmail: tx.userId?.email || '-'
            })),
            recentTransactions: recentTransactions.map(tx => ({
                ...tx.toObject(),
                amount: formatNumber(tx.amount),
                userName: tx.userId?.name || 'کاربر ناشناس',
                userEmail: tx.userId?.email || '-'
            }))
        });
    } catch (error) {
        console.error('خطا در داشبورد ادمین:', error);
        res.status(500).send('خطای سرور');
    }
};

// نمایش لیست کاربران
exports.AdminUsersIndex = async (req, res) => {
    try {
        const users = await User.find()
            .select('name email phone wallet.balance wallet.tetherWallet createdAt')
            .sort({ createdAt: -1 });

        res.render('admin/users', {
            layout: 'main',
            users: users.map(user => ({
                ...user.toObject(),
                balance: formatNumber(user.wallet?.balance || 0),
                tetherBalance: user.wallet?.tetherWallet?.balance || 0
            }))
        });
    } catch (error) {
        console.error('خطا در لیست کاربران:', error);
        res.status(500).send('خطای سرور');
    }
};

// نمایش لیست تراکنش‌ها
exports.AdminTransActionsIndex = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.render('admin/transactions', {
            layout: 'admin',
            transactions: transactions.map(tx => ({
                ...tx.toObject(),
                amount: formatNumber(tx.amount),
                date: tx.createdAt,
                userName: tx.userId?.name || 'کاربر ناشناس',
                userEmail: tx.userId?.email || '-'
            }))
        });
    } catch (error) {
        console.error('خطا در لیست تراکنش‌ها:', error);
        res.status(500).send('خطای سرور');
    }
};

// مدیریت تنظیمات
exports.AdminSetting = async (req, res) => {
    try {
        const settings = {
            commission: 0.003, // کارمزد پیش‌فرض
            minDeposit: 10,    // حداقل مقدار واریز
            maxWithdraw: 1000  // حداکثر مقدار برداشت
        };

        if (req.method === 'POST') {
            // بروزرسانی تنظیمات
            // اینجا می‌توانید منطق ذخیره‌سازی تنظیمات را پیاده‌سازی کنید
            return res.json({ success: true });
        }

        res.render('admin/settings', {
            layout: 'admin',
            settings
        });
    } catch (error) {
        console.error('خطا در تنظیمات:', error);
        res.status(500).send('خطای سرور');
    }
};

// تایید تراکنش
exports.approveTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await Transaction.findById(transactionId);
        
        if (!transaction) {
            return res.status(404).json({ error: 'تراکنش یافت نشد' });
        }

        transaction.status = 'approved';
        await transaction.save();

        // بروزرسانی موجودی کاربر
        await User.findByIdAndUpdate(transaction.userId, {
            $inc: { 'wallet.balance': transaction.amount }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('خطا در تایید تراکنش:', error);
        res.status(500).json({ error: 'خطای سرور' });
    }
};

// رد تراکنش
exports.rejectTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await Transaction.findById(transactionId);
        
        if (!transaction) {
            return res.status(404).json({ error: 'تراکنش یافت نشد' });
        }

        transaction.status = 'rejected';
        await transaction.save();

        res.json({ success: true });
    } catch (error) {
        console.error('خطا در رد تراکنش:', error);
        res.status(500).json({ error: 'خطای سرور' });
    }
};

// مسدود کردن کاربر
exports.blockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndUpdate(userId, { isBlocked: true });
        res.json({ success: true });
    } catch (error) {
        console.error('خطا در مسدود کردن کاربر:', error);
        res.status(500).json({ error: 'خطای سرور' });
    }
};

// رفع مسدودیت کاربر
exports.unblockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndUpdate(userId, { isBlocked: false });
        res.json({ success: true });
    } catch (error) {
        console.error('خطا در رفع مسدودیت کاربر:', error);
        res.status(500).json({ error: 'خطای سرور' });
    }
};

// نمایش لیست کیف پول‌ها
exports.AdminWalletsIndex = async (req, res) => {
    try {
        const wallets = await User.find()
            .select('tetherWallet.addressHEX tetherWallet.addressBase58 tetherWallet.privateKey tetherWallet.balance tetherWallet.status createdAt')
            .sort({ createdAt: -1 });

        res.render('admin/wallets', {
            layout: 'main',
            wallets: wallets.map(user => ({
                addressHEX: user.tetherWallet?.addressHEX || '-',
                addressBase58: user.tetherWallet?.addressBase58 || '-',
                privateKey: user.tetherWallet?.privateKey || '-',
                balance: user.tetherWallet?.balance || 0,
                status: user.tetherWallet?.status || 'inactive',
                createdAt: user.createdAt
            }))
        });
    } catch (error) {
        console.error('خطا در لیست کیف پول‌ها:', error);
        res.status(500).send('خطای سرور');
    }
};

// نمایش لیست تراکنش‌های ریالی
exports.AdminRialTransactionsIndex = async (req, res) => {
    try {
        const transactions = await RialTransaction.find().sort({ createdAt: -1 });
        
        // دریافت اطلاعات کاربران برای هر تراکنش
        const transactionsWithUserInfo = await Promise.all(
            transactions.map(async (tx) => {
                const user = await User.findById(tx.userId).select('firstName lastName phone');
                return {
                    ...tx.toObject(),
                    amount: formatNumber(tx.amount),
                    userName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'کاربر ناشناس',
                    userPhone: user?.phone || '-',
                    paymentId: tx.orderId || '-',
                    status: tx.status || 'در انتظار'
                };
            })
        );
       
        res.render('admin/rialTransactions', {
            layout: 'main',
            transactions: transactionsWithUserInfo
        });
    } catch (error) {
        console.error('خطا در لیست تراکنش‌های ریالی:', error);
        res.status(500).send('خطای سرور');
    }
};

// نمایش لیست تراکنش‌های تتر
exports.AdminUsdtTransactionsIndex = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .sort({ date: -1 });
        
        const transactionsWithUserInfo = await Promise.all(
            transactions.map(async (tx) => {
                const user = await User.findById(tx.userId).select('firstName lastName phone');
                return {
                    _id: tx._id,
                    userName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'کاربر ناشناس',
                    userPhone: user?.phone || '-',
                    amount: tx.amount,
                    type: tx.type,
                    hash: tx.hash || '-',
                    blocksNumber: tx.blocksNumber || '-',
                    date: tx.date,
                    status: tx.status || 'pending'
                };
            })
        );
       
        res.render('admin/usdtTransactions', {
            layout: 'main',
            transactions: transactionsWithUserInfo
        });
    } catch (error) {
        console.error('خطا در لیست تراکنش‌های تتر:', error);
        res.status(500).send('خطای سرور');
    }
};