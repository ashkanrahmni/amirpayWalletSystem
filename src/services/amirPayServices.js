const axios = require("axios");

// 



const getIPGUri = async (amount,desc) => {
    try {
        const response = await fetch('https://panel.amirpay.top/api/ipg/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                merchant: 'cm5nvs4q8000gwzed8x5zes5h',
                amount: Number(amount),
                desc: desc,
                callbackUrl: 'http://localhost:2000/exchange/ipg/callback'
            })
        });
        
        const data = await response.json();
        return data.data
        
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

const ipgCallback = async (orderId) => {
    try {
        const response = await axios.post(`https://panel.amirpay.top/api/ipg/verify`, {
              merchant:'cm5nvs4q8000gwzed8x5zes5h',
              orderId:orderId,
          })        
          return response.data
      } catch (error) {
          console.log(error)
      }
}




module.exports = {
    getIPGUri,
    ipgCallback
}