const mongoose = require('mongoose');
const SettingSchema = new mongoose.Schema({
    MainWallet: { type: String, required: true },
    ContractAddress: { type: String, required: true },
    PrivateKey: { type: String, required: true },
    FullNode: { type: String, required: true },
});
module.exports = mongoose.model('Setting', SettingSchema);
