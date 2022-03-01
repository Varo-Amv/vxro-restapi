const mongoose = require('mongoose');

const Users = mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    apikey: { type: String },
    nomor_whatsapp: { type: Number },
    defaultKey: { type: String },
    premium: { type: String },
    limit: { type: Number },
    totalreq: { type : String },
}, { versionKey: false });
module.exports.User = mongoose.model('api2', Users);

const Utils = mongoose.Schema({
    total: { type: Number },
    today: { type: Number },
    visitor: { type: Number },
    util: { type: String }
}, { versionKey: false });
module.exports.Utils = mongoose.model('util', Utils);

