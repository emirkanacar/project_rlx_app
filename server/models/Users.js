const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
require('mongoose-type-email');

const UsersSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 5
    },
    username: {
        type: String,
        unique: true,
        required: true,
        min: 3,
    },
    password: {
      type: String,
      required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: true
    },
    userVerified: {
        type: Number,
        default: 0
    },
    userBiography: {
        type: String,
        default: null,
        max: 520
    },
    userGroup: {
        type: String,
        default: 'User'
    },
    userProfilePicture: {
      type: String,
      default: null
    },
    userSocialMedias: {
        facebook: {
            type: String,
            max: 255,
            default: null
        },
        instagram: {
            type: String,
            max: 255,
            default: null
        },
        twitter: {
            type: String,
            max: 255,
            default: null
        },
        linkedin: {
            type: String,
            max: 255,
            default: null
        }
    }
}, { minimize: true });

UsersSchema.plugin(timestamps);
UsersSchema.plugin(mongooseStringQuery);
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;