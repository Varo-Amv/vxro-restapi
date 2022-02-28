var __path = process.cwd(),
      monk = require('monk'),
     { color } = require(__path + '/lib/color.js')
const { User } = require('./model');

// Connection URL
    async function checkUsername(username) {
        let users = await User.findOne({username: username});
        if(users !== null) {
            return users.username;
        } else {
            return false;
        }
    }
    module.exports.checkUsername = checkUsername;
var url = 'webraku.xyz';
try {
if(url == 'webraku.xyz') throw console.log(color('Cek konfigurasi database, var url belum diisi','red'));
} catch (e) {
	return;
	}
var db = monk(url);

db.then(() => {
  console.log(color('Connected correctly to server, ZhirrrGanss','green'))
})
.catch ((e) => {
	console.log(color('Error : '+ e +'\n\nGagal connect ke database, \ncek configurasi database apakah Connection URL sudah benar','red'))
	})


module.exports = db
