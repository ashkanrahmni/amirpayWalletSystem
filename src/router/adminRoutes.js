const express = require('express');
const router = express.Router();
const { 
    AdminDashboardIndex, 
    AdminUsersIndex, 
    AdminTransActionsIndex, 
    AdminSetting,
    approveTransaction,
    rejectTransaction,
    blockUser,
    unblockUser,
    AdminWalletsIndex,
    AdminRialTransactionsIndex,
    AdminUsdtTransactionsIndex
} = require('../controller/adminController');

// مسیرهای اصلی
router.get('/dashboard', AdminDashboardIndex);
router.get('/users', AdminUsersIndex);
router.get('/wallets', AdminWalletsIndex);
router.get('/transactions', AdminTransActionsIndex);
router.get('/rial-transactions', AdminRialTransactionsIndex);
router.get('/usdt-transactions', AdminUsdtTransactionsIndex);
router.get('/setting', AdminSetting);
router.post('/setting', AdminSetting);

// مسیرهای API
router.post('/transactions/:transactionId/approve', approveTransaction);
router.post('/transactions/:transactionId/reject', rejectTransaction);
router.post('/users/:userId/block', blockUser);
router.post('/users/:userId/unblock', unblockUser);

module.exports = router;
