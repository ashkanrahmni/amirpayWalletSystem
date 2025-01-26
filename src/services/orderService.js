const Order = require("../models/Order");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

async function processOrder(buyerId, orderId) {
    try {
        // دریافت سفارش و خریدار
        const order = await Order.findById(orderId);
        const buyer = await User.findById(buyerId);
        
        if (!order || !buyer) {
            throw new Error('سفارش یا خریدار یافت نشد');
        }

        // دریافت فروشنده
        const seller = await User.findById(order.user);
        if (!seller) {
            throw new Error('فروشنده یافت نشد');
        }

        // محاسبه مبلغ کل
        const totalAmount = order.price * order.amountRemaining;

        // بررسی موجودی خریدار
        if (buyer.wallet < totalAmount) {
            throw new Error('موجودی ریالی کافی نیست');
        }

        // انجام تراکنش
        await executeTransaction(buyer, seller, order, totalAmount);

        return {
            success: true,
            message: 'معامله با موفقیت انجام شد'
        };

    } catch (error) {
        console.error('خطا در پردازش سفارش:', error);
        throw error;
    }
}

async function executeTransaction(buyer, seller, order, totalAmount) {
    const session = await Order.startSession();
    session.startTransaction();

    try {
        buyer.wallet -= totalAmount;
        await buyer.save({ session });

        buyer.balance += order.amountRemaining;
        await buyer.save({ session });

        seller.wallet += totalAmount;
        await seller.save({ session });

        // ثبت تراکنش
        const transaction = new Transaction({
            blocksNumber: Date.now(),
            hash: `TX${Date.now()}`,
            userId: buyer._id,
            type: 'buy',
            amount: order.amountRemaining,
            price: order.price,
            date: new Date()
        });
        await transaction.save({ session });

        // به‌روزرسانی وضعیت سفارش
        order.status = 'completed';
        order.amountRemaining = 0;
        await order.save({ session });

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = {
    processOrder
};