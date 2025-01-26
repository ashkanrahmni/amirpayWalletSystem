// const Tron= require('tronweb');
// const User = require('../models/User');

// // تنظیمات اولیه ترون
// const tron = new Tron({
//     fullHost: 'https://api.trongrid.io',
//     headers: { "TRON-PRO-API-KEY": 'your-api-key' }
// });

// // آدرس کیف پول مادر
// const MOTHER_WALLET = 'TR3eoAx7KQYnFrkDwYiZy3ueVgdGP2zKx1';
// const MOTHER_PRIVATE_KEY = 'your-private-key';

// async function checkUserDeposits() {
//     try {
//         // دریافت همه کاربران
//         const users = await User.find({});

//         for (const user of users) {
//             const userWallet = user.tetherWallet.addressHEX;
            
//             // دریافت تراکنش‌های کیف پول کاربر
//             const transactions = await tron.getTransactionsByAddress(userWallet);
            
//             for (const tx of transactions) {
//                 // بررسی تراکنش‌های جدید و تأیید شده
//                 if (tx.to === userWallet && !tx.processed) {
//                     const amount = tx.amount;
                    
//                     // انتقال تتر به کیف پول مادر
//                     await transferToMotherWallet(
//                         user.tetherWallet.privateKey,
//                         userWallet,
//                         MOTHER_WALLET,
//                         amount
//                     );

//                     // به‌روزرسانی موجودی کاربر
//                     await updateUserBalance(user._id, amount);
                    
//                     // علامت‌گذاری تراکنش به عنوان پردازش شده
//                     await markTransactionAsProcessed(tx.id);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('خطا در بررسی واریزی‌ها:', error);
//     }
// }

// async function transferToMotherWallet(userPrivateKey, fromAddress, toAddress, amount) {
//     try {
//         const transaction = await tron.transactionBuilder.sendTrc20(
//             'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // آدرس قرارداد USDT
//             toAddress,
//             amount,
//             fromAddress
//         );

//         const signedTx = await tron.trx.sign(transaction, userPrivateKey);
//         const result = await tron.trx.sendRawTransaction(signedTx);
        
//         return result;
//     } catch (error) {
//         console.error('خطا در انتقال به کیف پول مادر:', error);
//         throw error;
//     }
// }

// async function updateUserBalance(userId, amount) {
//     try {
//         await User.findByIdAndUpdate(userId, {
//             $inc: { balance: amount }
//         });
//     } catch (error) {
//         console.error('خطا در به‌روزرسانی موجودی کاربر:', error);
//         throw error;
//     }
// }

// async function markTransactionAsProcessed(txId) {
//     // ذخیره تراکنش‌های پردازش شده در دیتابیس
//     // این بخش را می‌توانید با توجه به نیاز خود پیاده‌سازی کنید
// }

// // اجرای دوره‌ای چک کردن واریزی‌ها
// setInterval(checkUserDeposits, 60000); // هر یک دقیقه

// module.exports = {
//     checkUserDeposits,
//     transferToMotherWallet
// }; 