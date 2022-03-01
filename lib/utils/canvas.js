const __path = process.cwd()
const { cekKey } = require(__path + '/database/debe');
const knights = require('knights-canvas')
const fs = require('fs')
const tmp = __path+'/tmp/canvas_tmp'
const example_profile = 'https://i.ibb.co/G5mJZxs/rin.jpg'
const example_icon = 'https://i.ibb.co/G5mJZxs/rin.jpg'
const example_bg = 'https://i.ibb.co/4YBNyvP/images-76.jpg'
async function customGfx2(req, res) {
    const text = req.query.text;
    const text2 = req.query.text2;
    const bg = req.query.bg;
    const apikey = req.query.apikey;
    if (text1 === undefined || apikey === undefined || text2 === undefined || bg === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text1 & text2 & bg & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.customGfx2()
    .setText1(text1)
    .setText2(text2)
    .setBg(bg)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
async function customGfx(req, res) {
    const text = req.query.text;
    const bg = req.query.bg;
    const apikey = req.query.apikey;
    if (text === undefined || apikey === undefined || bg === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.customGfx()
    .setText(text)
    .setBg(bg)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
module.exports = {
    customGfx,
    customGfx2
}
