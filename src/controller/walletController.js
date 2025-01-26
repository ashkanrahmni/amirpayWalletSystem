const { ethers } = require('ethers');
const {TronWeb} = require('tronweb');
const axios =  require('axios')

// Generate Wallets
exports.GenerateWallet = async (req, res, next) => {
    try {
        const wallet = ethers.Wallet.createRandom();

        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
        });
        const account = await tronWeb.createAccount();

        return res.status(200).json({
            BSC: {
                wallet
            },
            TRC20: {
                account
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.UsdtMerger = async (req, res, next) => {
    try{
       const response =  await axios.get('https://api.nobitex.ir/market/stats?srcCurrency=usdt&dstCurrency=rls',{
            headers:{
            "Content-Type":"application/json"
            }
        })
        return res.status(200).json(response.data.stats)
    }catch(e){
        next(e)
    }
};

exports.CheckBalances = async (req, res, next) => {
    try {
        const { bscAddress, trc20Address, trc20ContractAddress } = req.body;

        const bscProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const bscBalanceWei = await bscProvider.getBalance(bscAddress);
        const bscBalance = ethers.utils.formatEther(bscBalanceWei);

        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
        });
        const trxBalance = await tronWeb.trx.getBalance(trc20Address) / 1e6; 

        let trc20Balance = 0;
        if (trc20ContractAddress) {
            const contract = await tronWeb.contract().at(trc20ContractAddress);
            trc20Balance = await contract.balanceOf(trc20Address).call();
            trc20Balance = tronWeb.toDecimal(trc20Balance) / 1e6;
        }

        return res.status(200).json({
            BSC: {
                address: bscAddress,
                balance: bscBalance,
            },
            TRC20: {
                address: trc20Address,
                trxBalance: trxBalance,
                tokenBalance: trc20Balance,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.SendTransaction = async (req, res, next) => {
    try {
        const { chain, privateKey, toAddress, amount, contractAddress } = req.body;

        if (chain === 'BSC') {
            const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
            const wallet = new ethers.Wallet(privateKey, provider);
            const tx = await wallet.sendTransaction({
                to: toAddress,
                value: ethers.utils.parseEther(amount),
            });
            const receipt = await tx.wait();
            return res.status(200).json({ success: true, receipt });
        } else if (chain === 'TRC20') {
            const tronWeb = new TronWeb({
                fullHost: 'https://api.trongrid.io',
                privateKey: privateKey,
            });

            let tx;
            if (contractAddress) {
                const contract = await tronWeb.contract().at(contractAddress);
                tx = await contract.transfer(toAddress, amount * 1e6).send();
            } else {
                tx = await tronWeb.trx.sendTransaction(toAddress, amount * 1e6); 
            }
            return res.status(200).json({ success: true, tx });
        } else {
            return res.status(400).json({ error: 'Chain is not valid' });
        }
    } catch (error) {
        next(error);
    }
};
