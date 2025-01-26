const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    otp: { type: String , default: "" },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true , default: 'user'},
    wallet: { type: Number, default: 0 }, 
    status: { type: String, enum: ['online', 'offline'], required: true , default: 'offline'},
    tetherWallet: {
      addressHEX: { type: String }, 
      addressBase58: { type: String },
      privateKey: { type: String }, 
    },
    balance: {
        type: Number,
        default: 0
    },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
