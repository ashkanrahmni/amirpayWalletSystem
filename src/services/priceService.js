const axios = require('axios');

const getTetherPrice = async () => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=USDTUSDT');
    return parseFloat(response.data.price);
  } catch (error) {
    console.error('Error fetching Tether price:', error);
    throw new Error('Unable to fetch Tether price.');
  }
};

module.exports = { getTetherPrice };
