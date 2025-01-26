const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose
        .connect('mongodb://localhost:27017/MrtTether', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('✅ Connected to MongoDB'))
        .catch((err) => console.error('❌ MongoDB connection error:', err));
      
    } catch (error) {
        console.log(error);
    }
}

module.exports = db