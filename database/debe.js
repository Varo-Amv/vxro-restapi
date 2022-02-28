const { limitCount, limitPremium, TotalReq } = require('../lib/settings');
const { User } = require('./model');

    async function addUser(username, password, apikey) {
        let obj = { username, password, apikey, defaultKey: apikey, premium: null, limit: limitCount, totalreq: TotalReq };
        User.create(obj);
    }

    async function checkUsername(username) {
        let users = await User.findOne({username: username});
        if(users !== null) {
            return users.username;
        } else {
            return false;
        }
    }

    async function getApikey(id) {
        let users = await User.findOne({_id: id});
        return {apikey: users.apikey, username: users.username};
    }

    async function cekKey(apikey) {
        let db = await User.findOne({apikey: apikey});
        if(db === null) {
            return false;
        } else {
            return db.apikey;
        }
    }

    async function limitAdd(apikey) {
        let key = await User.findOne({apikey: apikey});
        let min = key.limit - 1;
        User.updateOne({apikey: apikey}, {limit: min}, function (err, res) {
            if (err) throw err;
        })
    }

    async function checkLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        return key.limit;
    }

    async function isLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        if (key.limit <= 0){
            return true;
        } else {
            return false;
        }
    }

    async function resetAllLimit() {
        let users = await User.find({});
        users.forEach(async(data) => {
            let { premium, username } = data
            if (premium !== null) {
                return User.updateOne({username: username}, {limit: limitPremium}, function (err, res) {
                    if (err) throw err;
                })   
            } else {
                return User.updateOne({username: username}, {limit: limitCount}, function (err, res) {
                    if (err) throw err;
                })
            }
        })
    }
    module.exports.addUser = addUser;
    module.exports.checkUsername = checkUsername;
    module.exports.cekKey = cekKey;
    module.exports.getApikey = getApikey;
    module.exports.limitAdd = limitAdd;
    module.exports.checkLimit = checkLimit;
    module.exports.isLimit = isLimit;
    module.exports.resetAllLimit = resetAllLimit
