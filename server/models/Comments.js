const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const CommentsSchema = new mongoose.Schema({
    commentSenderID: {
        type: String,
        required: true
    },
    commentTargetPostID: {
        type: String,
        required: true
    },
    commentContent: {
        type: String,
        max: 255,
        min: 5,
        required: true
    },
    commentLikeCount: {
        type: Number,
        default: 0
    },
}, { minimize: true });

CommentsSchema.plugin(timestamps);
CommentsSchema.plugin(mongooseStringQuery);
const Comments = mongoose.model('Comments', CommentsSchema);
module.exports = Comments;