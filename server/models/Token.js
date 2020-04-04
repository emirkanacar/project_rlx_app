const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
require('mongoose-type-email');

const TokensSchema = new mongoose.Schema({
   token: {
       type: String,
       required: true
   },
    tokenUser: {
       type: String,
       required: true
    }
}, { minimize: true });

TokensSchema.plugin(timestamps);
TokensSchema.plugin(mongooseStringQuery);
const Token = mongoose.model('Token', TokensSchema);
module.exports = Token;