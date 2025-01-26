const axios = require('axios');

class NobitexService {
    constructor() {
        this.baseURL = 'https://api.nobitex.ir';
    }

    async getMarketStats(srcCurrency = 'usdt', dstCurrency = 'rls') {
        try {
            const response = await axios.post(`${this.baseURL}/market/stats`, {
                srcCurrency,
                dstCurrency
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.stats[`${srcCurrency}-${dstCurrency}`];
        } catch (error) {
            console.error('خطا در دریافت آمار بازار:', error.message);
            throw error;
        }
    }

    async getOrderBook() {
        try {
            const response = await axios.get(`${this.baseURL}/v2/orderbook/USDTIRT`);
            const { asks, bids, lastTradePrice } = response.data;
            
            return {
                bestSellPrice: asks[0][0],
                bestSellVolume: asks[0][1],
                bestBuyPrice: bids[0][0],
                bestBuyVolume: bids[0][1],
                lastTradePrice,
                allAsks: asks.map(ask => ({
                    price: ask[0],
                    volume: ask[1],
                    total: ask[0] * ask[1]
                })),
                allBids: bids.map(bid => ({
                    price: bid[0],
                    volume: bid[1],
                    total: bid[0] * bid[1]
                }))
            };
        } catch (error) {
            console.error('خطا در دریافت اطلاعات orderbook:', error.message);
            throw error;
        }
    }

    // تابع برای اجرای درخواست هر 10 ثانیه
    startPolling(callback) {
        const interval = 10000; // 10 ثانیه
        
        const poll = async () => {
            try {
                const [marketStats, orderBook] = await Promise.all([
                    this.getMarketStats(),
                    this.getOrderBook()
                ]);
                callback({ marketStats, orderBook });
            } catch (error) {
                console.error('خطا در polling:', error);
            }
        };

        // اجرای اولیه
        poll();
        
        // شروع polling
        return setInterval(poll, interval);
    }
}

module.exports = NobitexService;