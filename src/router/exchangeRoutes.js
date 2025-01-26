const express = require('express');
const { buyTether, sellTether,PanelIndex,walletIndex,ipgCallback ,IpgStart} = require('../controller/exchangeController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();



router.get('/' , authMiddleware, PanelIndex)
router.get('/wallets' , authMiddleware, walletIndex)
router.get('/market' , authMiddleware, PanelIndex)
router.get('/profile' , authMiddleware, PanelIndex)

router.get('/ipg/callback', ipgCallback)


router.post('/ipg/start',authMiddleware, IpgStart)

router.post('/buy', buyTether);

router.post('/sell', sellTether);


module.exports = router;