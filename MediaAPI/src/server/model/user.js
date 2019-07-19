const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../../../config/config.js');

const col = config.userCol;

const userSchema = new Schema({
  username: String,
  password: String,
}, 
{
  collection: `${col}`
})

const User = mongoose.model(col, userSchema);

module.exports = User;