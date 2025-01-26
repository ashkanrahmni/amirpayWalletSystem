const express = require('express');
const router = express.Router();
const {Buy,Sell} = require('../controller/orderController');
const authMiddleware = require('../middleware/auth');

router.post("/buy",authMiddleware,Buy);

router.post("/sell",authMiddleware,Sell);


  
module.exports = router;