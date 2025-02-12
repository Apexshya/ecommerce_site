const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Add bcryptjs for hashing

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  

  try {
    const salt = await bcrypt.genSalt(10);  
    this.password = await bcrypt.hash(this.password, salt);  
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);  // Compare hashed password with input
};

module.exports = mongoose.model('User', UserSchema);
