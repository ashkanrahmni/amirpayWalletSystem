const {TronWeb} = require('tronweb');

const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io/',
  headers: { 'TRON-PRO-API-KEY': '75b32ce0-a172-42d9-9f79-180f4f44f714' },
  privateKey:'A80B2726F5051D291A903854230DFE1D62BFE46ECAF92C31A7D5B72400B55FB5'
});

const createWallet = async () => {
  try {
    const wallet = await tronWeb.createAccount();
    return wallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw new Error('Failed to create wallet');
  }
};


const getBalance = async (address) => {
  try {
    const balanceInSun = await tronWeb.trx.getBalance(address);
    const balanceInTrx = balanceInSun / 1000000; // تبدیل SUN به TRX
    
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd');
    const data = await response.json();
    const trxPrice = data.tron.usd;
    
    const balanceInUsdt = balanceInTrx * trxPrice;
    return {
      sun: balanceInSun,
      trx: balanceInTrx,
      usdt: balanceInUsdt.toFixed(2)
    };
   
  } catch (error) {
    console.error('Error getting balance:', error);
    throw new Error('Failed to get balance');
  }
};

const USDT_CONTRACT = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";

const getUsdtBalance = async (address) => {
  try {
    // بررسی اتصال به tronWeb
    if (!tronWeb || !tronWeb.ready) {
      throw new Error('TronWeb is not ready');
    }

    // ایجاد نمونه از قرارداد USDT
    const contract = await tronWeb.contract().at(USDT_CONTRACT);
    
    if (!contract) {
      throw new Error('Contract initialization failed');
    }

    // فراخوانی تابع balanceOf از قرارداد
    const balance = await contract.balanceOf(address).call();
    
    if (!balance) {
      return {
        raw: "0",
        usdt: "0.00"
      };
    }

    // تبدیل به عدد و تقسیم بر 10^6 (چون USDT 6 رقم اعشار دارد)
    const usdtBalance = parseFloat(balance.toString()) / 1000000;
    
    return {
      raw: balance.toString(),
      usdt: usdtBalance.toFixed(2)
    };
   
  } catch (error) {
    console.error('Error getting USDT balance:', error);
    throw new Error('Failed to get USDT balance');
  }
};
const getBalancebyToken = async(address)=> {
  // TronWeb.
  const getmyassets = await tronWeb.trx.getAccount(address)
  const getmyBalance = getmyassets
  console.log( getmyBalance )
  return getmyBalance
}

const TransActionsUsdt = async (address) => {
  try {
    const response = await fetch(`https://nileapi.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=20&start=0&address=${address}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    const data = await response.json();
    return {
      transactions: data.data,
      total: data.total
    };
    
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

module.exports = { 
  createWallet, 
  getBalance,
  getUsdtBalance,
  getBalancebyToken,
  TransActionsUsdt
};
