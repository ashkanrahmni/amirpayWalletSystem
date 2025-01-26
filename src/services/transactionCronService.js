// const User = require('../models/User');
// const Transaction = require('../models/Transaction');
// const { TransActionsUsdt } = require('./walletService');
// const cron = require('node-cron');
// const {TronWeb} = require('tronweb');
// const USDT_CONTRACT = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";
// const tronHost = new TronWeb({
//     fullHost: 'https://nile.trongrid.io/',
//     headers: { 'TRON-PRO-API-KEY': '75b32ce0-a172-42d9-9f79-180f4f44f714' },
//     privateKey:'A80B2726F5051D291A903854230DFE1D62BFE46ECAF92C31A7D5B72400B55FB5'
//   });

// async function processNewTransactions() {
//     try {
//         // دریافت کاربران آنلاین
//         const onlineUsers = await User.find({ status: 'online' });

//         for (const user of onlineUsers) {
//             // دریافت تراکنش‌های کاربر
//             const transactions = await TransActionsUsdt(user.tetherWallet.addressBase58);
//             for (const tx of transactions.transactions) {
//                 console.log(tx)
//                 // بررسی تراکنش‌های جدید
//                 const existingTransaction = await Transaction.findOne({ hash: tx.hash });
                
//                 if (!existingTransaction && tx.contractRet === 'SUCCESS' && tx.toAddress === user.tetherWallet.addressBase58) {
//                     try {
//                         const amount = parseInt(tx.amount) / 1000000;
                        
//                         await processTransferToMainWallet();

//                         await saveOriginalTransaction(tx, user, amount);

//                         await updateUserBalance(user._id, amount);

//                         console.log(`Transaction processed for user ${user.firstName} ${user.lastName}: ${amount} USDT`);
                        
//                     } catch (error) {
//                         console.error('Error in transfer process:', error);
//                     }
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error in transaction cron:', error);
//     }
// }

// async function processTransferToMainWallet() {
//     const mainWalletAddress = 'TYLMtC8Uxshcecc7DkxF43qrdS97M6Dicw';
//     const privateKey = 'A80B2726F5051D291A903854230DFE1D62BFE46ECAF92C31A7D5B72400B55FB5';
    
//     // پارامترهای قرارداد هوشمند USDT
//     const contractAddress = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj';
//     const amount = 1000000000; // مقدار USDT (با 6 رقم اعشار)
    
//     try {
//         // ایجاد تراکنش انتقال USDT
//         const parameter = [{
//             type: 'address',
//             value: 'TUyUUYjkVwRvToyvCArEXz2KBm5GYyfcf3'
//         }, {
//             type: 'uint256',
//             value: amount
//         }];

//         const transaction = await tronHost.transactionBuilder.triggerSmartContract(
//             contractAddress,
//             'transfer(address,uint256)',
//             {},
//             parameter,
//             'TYLMtC8Uxshcecc7DkxF43qrdS97M6Dicw'
//         );
//         console.log({transaction})
//         // امضای تراکنش
//         const signedTxn = await tronHost.trx.sign(transaction.transaction, privateKey);
        
//         // ارسال تراکنش
//         const receipt = await tronHost.trx.sendRawTransaction(signedTxn);
//         console.log('Transaction Receipt:', receipt);
//         return receipt;
//     } catch (error) {
//         console.error('Error in USDT transfer:', error);
//         throw error;
//     }
// }

// async function saveOriginalTransaction(tx, user, amount) {
//     const originalTransaction = new Transaction({
//         blocksNumber: tx.block,
//         hash: tx.hash,
//         userId: user._id,
//         type: 'buy',
//         amount: amount,
//         price: 0,
//         date: new Date(tx.timestamp)
//     });
//     await originalTransaction.save();
// }

// async function updateUserBalance(userId, amount) {
//     await User.findByIdAndUpdate(userId, {
//         $inc: { balance: amount }
//     });
// }

// processTransferToMainWallet()
// // اجرای کرون جاب هر 1 دقیقه
// cron.schedule('*/1 * * * *', processNewTransactions);

// module.exports = {
//     processNewTransactions
// }; 