_ = require('lodash')
__path = process.cwd();
const request = require("request");
const { spawn } = require('child_process');
const path = require('path');
const fs = require("fs");
const cheerio = require('cheerio')
const formData = require('form-data')
const fetch = require('node-fetch')

function nulis(nama, kelas, teks){
return new Promise((resolve, reject) => {
		const bahan = __path + '/lib/kertas/bahan_nulis.jpg'
		const fontnya = __path + '/lib/kertas/font_nulis.ttf'
                const panjangKalimat9 = teks.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama3 = nama.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas3 = kelas.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris9 = panjangKalimat9.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama3 = panjangNama3.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas3 = panjangKelas3.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktu6 = (day + ' ' + months[month] + ' ' + year)
                const hari6 = (thisDay)
                spawn('convert', [
                    bahan,
                    '-font',
                    fontnya,
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    hari6,
                    '-font',
                    fontnya,
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktu6,
                    '-font',
                    fontnya,
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama3,
                    '-font',
                    fontnya,
                    '-fill',
                    '#8c1a00',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas3, 
                    '-font',
                    fontnya,
                    '-fill',
                    '#000000',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+146',
                    panjangBaris9,
                    './hasil_nulis.jpg'
                ])
                .on('error', (err) => { console.log(err); reject(err)})
                .on('exit', () => {
                    resolve(fs.readFileSync("./hasil_nulis.jpg"))
                    fs.unlinkSync("./hasil_nulis.jpg")
                })
})
}
