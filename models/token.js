const mongoose = require('mogoose')
const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Data,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});
const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;