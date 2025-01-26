const express = require('express');
const { GenerateWallet ,  SendTransaction , CheckBalances , UsdtMerger} = require('../controller/walletController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();


router.get('/usdt', UsdtMerger)
router.post('/make' , GenerateWallet)

router.post('/send' , SendTransaction)

router.post('/check' , CheckBalances)

module.exports = router;