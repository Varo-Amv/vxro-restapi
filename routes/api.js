__path = process.cwd()
var favicon = require('serve-favicon');
var express = require('express');
  
var creator = "Alvaro"
var secure = require('ssl-express-www');
var cors = require('cors');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var zrapi = require("zrapi");
var knights = require('knights-canvas');
var dotenv = require("dotenv").config()
var fs = require('fs');
var Ra = require('ra-api');
var TikTokScraper = require('tiktok-scraper');
var { EmojiAPI } = require("emoji-api");
var emoji = new EmojiAPI();
var router  = express.Router();
const { cekKey, limitAdd, isLimit } = require(__path + '/database/debe');
var { color, bgcolor } = require(__path + '/lib/color.js');
var { fetchJson } = require(__path + '/lib/fetcher.js');
var options = require(__path + '/lib/options.js');
var {
	Searchnabi,
	Gempa
} = require('./../lib');

var {
  customGfx,
  customGfx2
} = require("./../lib/utils/canvas");

var {
  nulis
} = require('./../lib/utils/nulis');

var {
  pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pGlitch,
  pDoubleHeart,
  pCoffeCup,
  pLoveText,
  pButterfly
} = require("./../lib/utils/photooxy");

var {
  igStalk,
  igDownload
} = require("./../lib/utils/ig");

var {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./../lib/utils/yt");

var { 
  Joox, 
  FB, 
  Tiktok
} = require("./../lib/utils/downloader");

var {
  Cuaca, 
  Lirik
} = require('./../lib/utils/information');

var {
  Base, 
  WPUser
} = require('./../lib/utils/tools');

var {
  xnxxsearch, 
  xnxxdl
} = require('./../lib/utils/xnxx');

var tebakGambar = require('./../lib/utils/tebakGambar');
var { mediafireDl } = require('./../lib/utils/mediafire');
var { pinterest } = require('./../lib/utils/pinterest');
var { recognize } = require('./../lib/utils/ocr');

var cookie = process.env.COOCKIE
/*
* @Pesan Error
*/
loghandler = {
    notparam: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter apikey'
    },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter url'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter query'
        },
    notkata: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter kata'
    },
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
    notnabi: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter nabi'
    },
    nottext3: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text3'
    },
    nottheme: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter theme'
    },
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter username'
    },
    notvalue: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter value'
    },
    invalidKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'apikey invalid'
    },
    invalidlink: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin link anda tidak valid.'
    },
    invalidkata: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin kata tidak ada dalam api.'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: '404 ERROR'
    }
}

/*
Akhir Pesan Error
*/

router.use(favicon(__path + "/views/favicon.ico"));

const listkey = ["vxro2k21"];

router.get('/nulis/v1', async (req, res, next) => {
	   mim = req.query.nulis
	const apikey = req.query.apikey
       if (apikey === undefined) return res.status(404).send({
          status: 404,
          message: `Input parameter apikey`
          });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'your limit 0, reset every morning'});
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
          status: 403,
          message: `apikey ${apikey} not found, please register first`
      });
      limitAdd(apikey);
	 if(!mim.text) return res.json(loghandler.nottext)
         if(!mim.nama) return res.json({ status: 404, msg: 'Masukan Oaram Nama'})
         if(!mim.kelas) return res.json({ status: 404, msg: 'Masukan Oaram Kelas'})
  res.type("png")
  res.send(await nulis(mim.nama, mim.kelas, mim.text))
})
router.get('/customgfx', customGfx)

router.get('/customgfx2', customGfx2)

router.get('/mediafire', mediafireDl) 

router.post("/addapikey", async (req, res, next) => {
  const key = req.query.key;
  if(listkey.includes(key)) {
    res.json({
      message: 'apikey sudah terdaftar'
    });
  } else {
    listkey.push(key);
    res.json({
      message: `berhasil mendaftarkan ${key} Kedatabase apikey`
    });
  }
});

router.get('/nsfw/hololiveero', async (req, res, next) => {
        const apikey = req.query.apikey

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/IniIbnu/txt/main/hololive/hololive_ero.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/welkom3', async (req, res, next) => {
        var apikey = req.query.apikey,
            nama = req.query.nama,
            pp = req.query.pp

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    
    try {
var image = await new knights.Welcome3()
    .setUsername(`${nama}`)
    .setAvatar(`${pp}`)
    .toAttachment();
  

  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/sewelcome3.png', data)
  res.sendFile(__path +'/tmp/sewelcome3.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/goodbye3', async (req, res, next) => {
        var apikey = req.query.apikey,
            nama = req.query.nama,
            pp = req.query.pp

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    
    try {
var image = await new knights.Goodbye3()
    .setUsername(`${nama}`)
    .setAvatar(`${pp}`)
    .toAttachment();
  

  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/segoodbye3.png', data)
  res.sendFile(__path +'/tmp/segoodbye3.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/kuis/tebakGambar', async (req, res, next) => {
  const apikey = req.query.apikey;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
  let result = await tebakGambar()
  if (result) {
    const hasil = {
      status: true,
      code: 200,
      creator: `${creator}`,
      image: result.img,
      jawaban: result.jawaban,
      clue: result.petunjuk
    }
    res.json(hasil)
  } 
    } catch {
    res.json(error)
  }
})

router.get('/simi', async (req, res, next) => {
        var apikey = req.query.apikey,
            text = req.query.text
            
	  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

    try {

       fetch(encodeURI(`https://api.simsimi.net/v2/?text=${text}&lc=id`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
            })
         })
         } catch {
         	res.sendFile(error)
}
})


router.get('/darkjokes', async (req, res, next) => {
        var apikey = req.query.apikey
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
   try {
       fetch(encodeURI(`https://raw.githubusercontent.com/FarZ/database-api/main/meme/darkjokes.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = result[Math.floor(Math.random() * data.length)]; 
             res.json({
             	author: 'Alvaro',
                 result
            })
         })
         } catch {
         	res.sendFile(error)
}
})


router.get('/pinterest', async (req, res, next) => {
        var apikey = req.query.apikey,
            text = req.query.text

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
     try {
       pinterest(`${text}`)
        .then(data => {
        var result = data.result;
        var result = result[Math.floor(Math.random() * result.length)]
             res.json({
             	author: 'Alvaro',
                 result
            })
         })
         } catch {
         	res.sendFile(error)
}
})

// delete apikey

router.delete("/apikey", async(req, res, next) => {
	const key = req.query.delete;
	if(listkey.includes(key)) {
		res.json({
			message: 'apikey tidak ada sebelumnya'
			})
			} else {
	listkey.splice(key, 1)
	res.json({
		message: 'apikey berhasil dihapus' 
});
 }
});

router.get('/music/joox', async(req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!query) return res.json(loghandler.notquery)
  try {
  Joox(query)
  .then((result) => {
  res.json(result)
    res.json(result)
  });
  } catch {
    res.json(loghandler.invalidKey)
  }
});

router.get('/bot/rank', async (req, res, next) => {
        const apikey = req.query.apikey,
            pp = req.query.pp,
            nama = req.query.nama,
            bg = req.query.bg,
            needxp = req.query.needxp,
            currxp = req.query.currxp,
            level = req.query.level
            if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
    if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
    if (!needxp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter needxp"})
    if (!currxp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter currxp"})
    if (!level) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter level"})
    
    try {
var image = await new knights.Rank()
    .setAvatar(`${pp}`) 
    .setUsername(`${nama}`) 
    .setBg(`${bg}`)
    .setNeedxp(`${needxp}`) 
    .setCurrxp(`${currxp}`) 
    .setLevel(`${level}`) 
    .setRank("https://i.ibb.co/Wn9cvnv/FABLED.png") 
    .toAttachment();
  
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/srank.png', data)
  res.sendFile(__path +'/tmp/srank.png')
  } catch { 
         	res.json(loghandler.error)
}
})

router.get('/bot/bag', async (req, res, next) => {
        const apikey = req.query.apikey,
            bg = req.query.bg,
            stone = req.query.stone,
            coal = req.query.coal,
            wood = req.query.wood,
            core = req.query.core,
            iore = req.query.iore,
            gore = req.query.gore,
            cingot = req.query.cingot,
            iingot = req.query.iingot,
            gingot = req.query.gingot,
            diamond = req.query.diamond,
            ruby = req.query.ruby,
            uranium = req.query.uranium,
            jadite = req.query.jadite,
            leather = req.query.leather,
            meat = req.query.meat,
            fish = req.query.fish
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
    try {
var image = await new knights.Bag()
    .setBackground(`${bg}`)
	.setStone(`${stone}`)
	.setCoal(`${coal}`)
	.setWood(`${wood}`)
	.setCore(`${core}`)
	.setIore(`${iore}`)
	.setGore(`${gore}`)
	.setCingot(`${cingot}`)
	.setIingot(`${iingot}`)
	.setGingot(`${gingot}`)
	.setDiamond(`${diamond}`)
	.setRuby(`${ruby}`)
	.setUranium(`${uranium}`)
	.setJadite(`${jadite}`)
	.setLeather(`${leather}`)
	.setMeat(`${meat}`)
	.setFish(`${fish}`)
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/bag.png', data)
  res.sendFile(__path +'/tmp/bag.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/welkom', async (req, res, next) => {
        const apikey = req.query.apikey,
            nama = req.query.nama,
            gc = req.query.gc,
            ppgc = req.query.ppgc,
            member = req.query.member,
            pp = req.query.pp,
            bg = req.query.bg            

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
    if (!gc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter gc"})
    if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
    if (!ppgc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ppgc"})
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
    
    try {
var image = await new knights.Welcome()
    .setUsername(`${nama}`)
    .setGuildName(`${gc}`)
    .setGuildIcon(`${ppgc}`)
    .setMemberCount(`${member}`)
    .setAvatar(`${pp}`)
    .setBackground(`${bg}`)
    .toAttachment();
  

  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/sewelcome.png', data)
  res.sendFile(__path +'/tmp/sewelcome.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/goodbye', async (req, res, next) => {
        const apikey = req.query.apikey,
            nama = req.query.nama,
            gc = req.query.gc,
            ppgc = req.query.ppgc,
            member = req.query.member,
            pp = req.query.pp,
            bg = req.query.bg            


	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
    if (!gc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter gc"})
    if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
    if (!ppgc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ppgc"})
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
    
    try {
var image = await new knights.Goodbye()
    .setUsername(`${nama}`)
    .setGuildName(`${gc}`)
    .setGuildIcon(`${ppgc}`)
    .setMemberCount(`${member}`)
    .setAvatar(`${pp}`)
    .setBackground(`${bg}`)
    .toAttachment();
  

  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/segoodbye.png', data)
  res.sendFile(__path +'/tmp/segoodbye.png')
  } catch {
         	res.json(loghandler.error)
}
})


router.get('/bot/levelup', async (req, res, next) => {
        const apikey = req.query.apikey,
            pp = req.query.pp
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})      
try { 
var image = await new knights.Up()
    .setAvatar(`${pp}`)
    .toAttachment();
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/sup.png', data)
  res.sendFile(__path +'/tmp/sup.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/sponbob', async (req, res, next) => {
        const apikey = req.query.apikey,
            pp = req.query.pp
         
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    
    try {
var image = await new knights.Burn()
    .setAvatar(`${pp}`)
    .toAttachment();
  
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/spongebob.png', data)
  res.sendFile(__path +'/tmp/spongebob.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/petrik', async (req, res, next) => {
        const apikey = req.query.apikey,
            pp = req.query.pp
         
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    
    try {
var image = await new kbeta.Patrick()
    .setAvatar(`${pp}`)
    .toAttachment();
  
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/patrick.png', data)
  res.sendFile(__path +'/tmp/patrick.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/welkom2', async (req, res, next) => {
        const apikey = req.query.apikey,
            nama = req.query.nama,
            gc = req.query.gc,
            member = req.query.member,
            pp = req.query.pp,
            bg = req.query.bg            

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
    if (!gc) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter gc"})
    if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
       
       try {
var image = await new knights.Welcome2()
    .setAvatar(`${pp}`)
    .setUsername(`${nama}`) 
    .setBg(`${bg}`) 
    .setGroupname(`${gc}`) 
    .setMember(`${member}`) 
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/sewelkom2.png', data)
  res.sendFile(__path +'/tmp/sewelkom2.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/gfx1', async (req, res, next) => {
        const apikey = req.query.apikey,
            nama = req.query.nama

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
   
   try {
var image = await new knights.Gfx1()
    .setName(`${nama}`) 
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/gfx1.png', data)
  res.sendFile(__path +'/tmp/gfx1.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/gfx2', async (req, res, next) => {
        const apikey = req.query.apikey,
            nama = req.query.nama

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
   
   try {
var image = await new knights.Gfx2()
    .setName(`${nama}`) 
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/gfx2.png', data)
  res.sendFile(__path +'/tmp/gfx2.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/gfx3', async (req, res, next) => {
        const apikey = req.query.apikey,
            text1 = req.query.text1,
            text2 = req.query.text2

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!text1) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text1"})
    if (!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text2"})
   
   try {
var image = await new knights.Gfx3()
    .setText1(`${text1}`) 
    .setText2(`${text2}`)
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/gfx3.png', data)
  res.sendFile(__path +'/tmp/gfx3.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/gfx4', async (req, res, next) => {
        const apikey = req.query.apikey,
            text1 = req.query.text1,
            text2 = req.query.text2

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!text1) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text1"})
    if (!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text2"})
   
   try {
var image = await new knights.Gfx4()
    .setText1(`${text1}`) 
    .setText2(`${text2}`)
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/gfx4.png', data)
  res.sendFile(__path +'/tmp/gfx4.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/gfx5', async (req, res, next) => {
        const apikey = req.query.apikey,
            text = req.query.text

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
   
   try {
var image = await new knights.Gfx5()
    .setText1(`${text}`) 
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/gfx5.png', data)
  res.sendFile(__path +'/tmp/gfx5.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/gura', async (req, res, next) => {
        const apikey = req.query.apikey,
            nama = req.query.nama

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
   
   try {
var image = await new knights.Gura()
    .setName(`${nama}`) 
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/Gura.png', data)
  res.sendFile(__path +'/tmp/Gura.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/bot/goodbye2', async (req, res, next) => {
        const apikey = req.query.apikey,
            nama = req.query.nama,
            member = req.query.member,
            pp = req.query.pp,
            bg = req.query.bg            

  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
    if (!member) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter member"})
    if (!pp) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter pp"})
    if (!bg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter bg"})
       
       try {
var image = await new knights.Goodbye2()
    .setAvatar(`${pp}`)
    .setUsername(`${nama}`) 
    .setBg(`${bg}`) 
    .setMember(`${member}`) 
    .toAttachment();
    
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/tmp/segoodbye2.png', data)
  res.sendFile(__path +'/tmp/segoodbye2.png')
  } catch {
         	res.json(loghandler.error)
}
})

router.get('/wolverine', async (req, res, next) => {
        const apikey = req.query.apikey,
            image = req.query.image
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!image) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter image"})

try {
       let hasil = `https://vacefron.nl/api/wolverine?user=${image}`
      data = await fetch(hasil).then(v => v.buffer())
        await fs.writeFileSync(__path +'/tmp/wolverine.png', data)
  res.sendFile(__path+'/tmp/wolverine.png')
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/tools/map', async (req, res, next) => {

        const apikey = req.query.apikey,
            kota = req.query.kota
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

try {
       fetch(encodeURI(`https://caliph71.xyz/map?apikey=beta&kota=${kota}`)) 
       .then(response => response.json())
        .then(data => {
        var result = data;
          res.json({
          author : 'Raku', 
          result
         })
       });
} catch {
res.json(loghandler.invalidKey)
}
});

router.get('/mediafire', async (req, res, next) => {

        const apikey = req.query.apikey,
            url = req.query.url
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

try {
       fetch(encodeURI(`https://api.zeks.xyz/api/mediafire?apikey=apivinz&url=${url}`)) 
       .then(response => response.json())
        .then(data => {
        var result = data;
          res.json({
          author : 'Raku', 
          result
         })
       });
} catch {
res.json(loghandler.invalidKey)
}
});

router.get('/genshin', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})
	try {
       fetch(encodeURI(`https://rawcdn.githack.com/L-M0z/Api-raw-v/0bfb230d51759cd3df1db9a107c8493eb4d1cf9c/Genshinimpact/${search}.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/stiker', async (req, res, next) => {
        const apikey = req.query.apikey,
            query = req.query.query
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

try {
       Ra.stickerSearch(query)
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result,
                 message : `Jangan Lupa Subscribe ZEROBOT`
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/comik', async (req, res, next) => {
        const apikey = req.query.apikey,
            search = req.query.search
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!search) return res.json({ status : false, creator : `${creator}`, message : "Masukan parameter username"})

try {
       fetch(encodeURI(`https://api.zeks.xyz/api/bacakomik?apikey=apivinz&q=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
            })
         })
         } catch {
         	res.sendFile(error)
}
})

router.get('/playstore', async (req, res, next) => {
        const apikey = req.query.apikey,
            namaapk = req.query.namaapk
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!namaapk) return res.json({ status : false, creator : `${creator}`, message : "Masukan parameter nama apk"})

try {
       fetch(encodeURI(`https://api.zeks.xyz/api/sgplay?apikey=apivinz&q=${namaapk}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.sendFile(error)
}
})

router.get('/happymod', async (req, res, next) => {
        const apikey = req.query.apikey,
            namaapk = req.query.namaapk
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!namaapk) return res.json({ status : false, creator : `${creator}`, message : "Masukan parameter nama apk"})

try {
       fetch(encodeURI(`https://api.zeks.xyz/api/happymod?apikey=apivinz&q=${namaapk}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.sendFile(error)
}
})

router.get('/nsfw/ntr', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://linz-api.herokuapp.com/api/anime-pic?genre=netorare`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/maid', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://linz-api.herokuapp.com/api/anime-pic?genre=maid`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/uglybastard', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://linz-api.herokuapp.com/api/anime-pic?genre=uglybastard`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/foxgirl', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://linz-api.herokuapp.com/api/anime-pic?genre=foxgirl`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/ass', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/ass.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/ahegao', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/ahegao.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/bdsm', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/bdsm.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/blowjob', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/blowjob.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/cuckold', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/cuckold.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/cum', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/cum.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/ero', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/ero.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/femdom', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/femdom.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/foot', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/foot.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/gangbang', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/gangbang.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/glasses', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/glasses.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/hentai', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/hentai.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/hentaigif', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/hnt_gifs.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/jahy', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/jahy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/masturbation', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/masturbation.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/nsfwNeko', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/nsfwNeko.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/orgy', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/orgy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/panties', async (req, res, next) => {
        const  apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/panties.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/pussy', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/pussy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/thighs', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/thighs.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/nsfw/yuri', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/yuri.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/cewe/japan', async (req, res, next) => {
       const apikey = req.query.apikey
       
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	
	try {
       fetch(encodeURI(`https://raw.githubusercontent.com/RIFKIBOTXofc/Asupan/main/cecan/japan.json`))
          .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/cewe/vietnam', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	
	try {
       fetch(encodeURI(`https://raw.githubusercontent.com/lofc/Asupan/main/cecan/vietnam.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/cewe/thailand', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/Asupan/main/cecan/thailand.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/cewe/china', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/Asupan/main/cecan/china.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/cewe/indonesia', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/Asupan/main/cecan/indonesia.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/cewe/korea', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/Asupan/main/cecan/korea.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/cewe/malaysia', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/Asupan/main/cecan/malaysia.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/music/spotify', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!query) return res.json(loghandler.notquery)
  
  try {
  fetch(encodeURI(`https://alpin-api-2021.herokuapp.com/api/spotify?apikey=alpin1&q=${query}`))
  .then(response => response.json())
        .then(hasil => {

        var result = hasil.data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/download/ytmp3', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  ytDonlodMp3(url)
    .then((result) => {
      res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
      })
    })
    } catch {
      console.log(error)
      res.json(error)
    }
});

router.get('/download/ytmp4', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  ytDonlodMp4(url)
    .then((result) => {
      res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
      })
    })
    } catch {
      res.json(error)
    }
});

router.get("/yt/playmp3", async(req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if(!query) return res.json(loghandler.notquery)
    
    try {
    ytPlayMp3(query)
        .then((result) => {
            res.json(result);
        })
        } catch {
            res.json(error);
        }
});

router.get("/yt/playmp4", async(req, res, next) => {

    const query = req.query.query;

    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if(!query) return res.json(loghandler.notquery)
    
    try {
    ytPlayMp4(query)
        .then((result) => {
            res.json(result);
        })
        } catch {
            res.json(error);
        }
});


router.get('/yt/search', async(req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if(!query) return res.json(loghandler.notquery)
    
    try {
    ytSearch(query)
        .then((result) => {
            res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result
            })
        })
        } catch {
            res.json(error);
        }
});

router.get('/download/tiktok', async (req, res, next) => {
    const apikey = req.query.apikey,
        url = req.query.url

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
     if (!url) return res.json(loghandler.noturl)
     
     try {
     Tiktok(url)
     .then((data) => {
       res.json(data)
     })
    } catch {
res.json(error)
}
})

router.get('/download/ig', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  try {
  igDownload(url)
    .then((data) => {
      result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        id: data.id,
        shortCode: data.shortCode,
        caption: data.caption,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(err);
    }
});

router.get('/download/fb', async (req, res, next) => {

        const apikey = req.query.apikey,
            url = req.query.url
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

try {
       fetch(encodeURI(`https://fb-api-zhirrr.vercel.app/?url=${url}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
          res.json({
          result
         })
       });
} catch {
res.json(loghandler.error)
}
});

router.get('/stalk/tiktok', async (req, res, next) => {
    const apikey = req.query.apikey,
        username = req.query.username

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!username) return res.json(loghandler.notusername)

try {
    TikTokScraper.getUserProfileInfo(username)
        .then(user => {
            res.json({
                status : true,
                creator : `${creator}`,
                result : user
            })
        })
        } catch {
             res.json({
                 status : false,
                 creator : `${creator}`,
                 message : "error, mungkin username anda tidak valid"
             })
         }
})

router.get('/stalk/ig', async(req, res, next) => {
  const username = req.query.username;
  const apikey = req.query.apikey;
if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if (!username) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter username"})
  
  try {
       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/stalk?username=${username}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
      });
    })
    } catch {
      res.json(err);
    }
});


router.get('/stalk/npm', async (req, res, next) => {
        const apikey = req.query.apikey,
            query = req.query.query
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

try {
       fetch(encodeURI(`https://registry.npmjs.org/${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/random/wallpaper', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://api-indonesia-devolopers.herokuapp.com/random/wallpaper`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/random/quotes', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/randomquotes`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/random/quotes/kanye', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://api-indonesia-devolopers.herokuapp.com/quotes/kanye`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 creator : `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/jadwal-bioskop', async(req, res, next) => {
const apikey = req.query.apikey

if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
const { default: Axios } = require('axios')
const cheerio = require('cheerio')

Axios.get('https://jadwalnonton.com/now-playing')
.then(({ data }) => {
     const $ = cheerio.load(data)
     let title = []
     let url = []
     let img = []
 	$('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a').get().map((rest) => {
         url.push($(rest).attr('href'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	title.push($(rest).attr('alt'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	img.push($(rest).attr('src'))
         })
     let result = []
     for (let i = 0; i < url.length; i++) {
          result.push({
               	url: url[i],
               	title: title[i],
               	img: img[i]
          })
     }
     res.json({
     creator:  `${creator}`,
     status: true,
     result: result
     })
})
} catch {
res.json(loghandler.error)
}
})

router.get('/short/bitly', async (req, res, next) => {

        const apikey = req.query.apikey,
            url = req.query.url
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!url) return res.json(loghandler.noturl)
    
    try {
       fetch(encodeURI(`https://api.xteam.xyz/shorturl/bitly?url=${url}&APIKEY=HIRO`))
.then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.link
      })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/short/tinyurl', async (req, res, next) => {
    const apikey = req.query.apikey,
        url = req.query.url

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
     if (!url) return res.json(loghandler.noturl)
     request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
         try {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result : `${body}`
             })
         } catch (e) {
             console.log('Error :', color(e,'red'))
             res.json(loghandler.invalidlink)
         }
     })
})

router.get('/tools/wpuser', async(req, res, next) => {
  const link = req.query.url;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!link) return res.json(loghandler.noturl)
  
  try {
    WPUser(link)
    .then((data) => {
      res.json(data)
    })
} catch {
  res.json(loghandler.error)
};
});

router.get('/info/cuaca', async(req, res, next) => {
  const apikey = req.query.apikey;
  const kota = req.query.kota;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!kota) return res.json({status: false, code: 406, message: 'masukkan parameter kota'})
  
  try {
    Cuaca(kota)
    .then((data) => {
      res.json(data)
    })
  } catch {
    res.json(loghandler.error)
  }
})
router.get('/info/gempa', async (req, res, next) => {
	       const apikey = req.query.apikey

		if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
		Gempa()
		.then(result => {
			res.json({
				creator: creator,
				result
			})
		})
		} catch {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		}
})


router.get('/muslim/kisahnabi', async (req, res, next) => {
	var nabi = req.query.nabi,
		apikey = req.query.apikey;

		if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
		Searchnabi(nabi)
		.then(result => {
			res.json({
				creator: creator,
				result
			})
		})
		} catch {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		}
})


router.get('/muslim/hadits', async (req, res, next) => {
        const apikey = req.query.apikey,
            kitab = req.query.kitab,
            nomor = req.query.nomor
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!kitab) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kitab"})
    if (!nomor) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nomor"})

try {
       fetch(encodeURI(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`))
        .then(response => response.json())
        .then(data => {
             res.json(
             data
             )
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/quran', async (req, res, next) => {
        const apikey = req.query.apikey,
            surah = req.query.surah,
            ayat = req.query.ayat
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    if (!surah) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter surah"})
    if (!ayat) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ayat"})

try {
       fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/muslim/tahlil', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataTahlil.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/wirid', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataWirid.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
          } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/ayatkursi', async (req, res, next) => {
       const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataAyatKursi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/doaharian', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataDoaHarian.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/bacaanshalat', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataBacaanShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/niatshalat', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataNiatShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/kisahnabi', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataKisahNabi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/asmaulhusna', async (req, res, next) => {
        const apikey = req.query.apikey

	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
	asmaul = JSON.parse(fs.readFileSync(__path +'/data/AsmaulHusna.json'));
	res.json(asmaul)
} catch {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatshubuh', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatShubuh.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/niatdzuhur', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatDzuhur.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/niatmaghrib', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatMaghrib.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/niatisya', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatIsya.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/muslim/niatashar', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatAshar.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/muslim/jadwalshalat', async (req, res, next) => {
        const apikey = req.query.apikey,
            kota = req.query.kota
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/Zhirrr-Database/main/adzan/${kota}/2021/03.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/search/image', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!query) return res.json(loghandler.notquery)
    try {
        var options = {
            url: `https://api-indonesia-devolopers.herokuapp.com/googleimg/?q=${query}`,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function(error, response, responseBody) {
            if (error) return

            $ = cheerio.load(responseBody)
            var links = $(".image a.link")
            var cari = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
            if (!cari.length) return
            var hasil = cari[Math.floor(Math.random() * cari.length)]
        res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result: hasil
            })
        })
    } catch {
    	res.json(loghandler.error)
  } 
})
router.get('/cyber', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    const cyber = JSON.parse(fs.readFileSync(__path +'/data/cyber.json'));
    const Cyber = cyber[Math.floor(Math.random() * cyber.length)];
    let hasil = Cyber.cyber;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/cyber.jpg', data)
    res.sendFile(__path +'/tmp/cyber.jpg')
  } catch {
    res.json(loghandler.error)
  }
});

router.get('/techno', async (req, res, next) => {
  apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    const techno = JSON.parse(fs.readFileSync(__path +'/data/techno.json'));
    const Techno = techno[Math.floor(Math.random() * techno.length)];
    let hasil = Techno.techno;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/techno.jpg', data)
    res.sendFile(__path +'/tmp/techno.jpg')
  } catch {
    res.json(loghandler.invalidKey)
  }
});

router.get('/muslim', async (req, res, next) => {
  apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    const muslim = JSON.parse(fs.readFileSync(__path +'/data/muslim.json'));
    const Muslim = muslim[Math.floor(Math.random() * muslim.length)];
    let hasil = Muslim.muslim;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/muslim.jpg', data)
    res.sendFile(__path +'/tmp/muslim.jpg')
  } catch {
    res.json(loghandler.invalidKey)
  }
});

router.get('/progam', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    const progam = JSON.parse(fs.readFileSync(__path +'/data/progam.json'));
    const Progam = progam[Math.floor(Math.random() * progam.length)];
    let hasil = Progam.progam;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/progam.jpg', data)
    res.sendFile(__path +'/tmp/progam.jpg')
  } catch {
    res.json(loghandler.invalidKey)
  }
});

router.get('/gunung', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    const gunung = JSON.parse(fs.readFileSync(__path +'/data/gunung.json'));
    const Gunung = gunung[Math.floor(Math.random() * gunung.length)];
    let hasil = Gunung.gunung;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/gunung.jpg', data)
    res.sendFile(__path +'/tmp/gunung.jpg')
  } catch {
    res.json(loghandler.error)
  }
});


router.get('/random/quotes/muslim', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=agamis`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/random/asmaulhusna', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/random/asmaulhusna`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/info/wikipedia', async (req, res, next) => {
        const apikey = req.query.apikey,
            search = req.query.search
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

try {
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/wiki?keyword=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/info/drakorasia', async (req, res, next) => {
        const apikey = req.query.apikey,
            search = req.query.search
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

try {
       fetch(encodeURI(`http://docs-api-zahirrr.herokuapp.com/api/drakorasia?search=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/fakedata', async (req, res, next) => {
        const apikey = req.query.apikey,
            country = req.query.country
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!country) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter country"})

try {
       fetch(encodeURI(`https://fakename-api-zhirrr.vercel.app/api/fakename?country=${country}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/hilih', async (req, res, next) => {
        const apikey = req.query.apikey,
            kata = req.query.kata
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

try {
       fetch(encodeURI(`https://hilih-api-zhirrr.vercel.app/api/hilih?kata=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/music/liriklagu', async (req, res, next) => {
        const apikey = req.query.apikey,
            lagu = req.query.query;
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!lagu) return res.json(loghandler.notquery)
        
        try {
        Lirik(lagu)
        .then((lirik) => {
          res.json({
            status: true,
            code: 200,
            creator: `${creator}`,
            result: lirik.data
          })
        });
} catch {
res.json(loghandler.error)
}
})


router.get('/music/chordlagu', async (req, res, next) => {
        const apikey = req.query.apikey,
            lagu = req.query.lagu
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!lagu) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

try {
       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/chord?q=${lagu}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/info/kbbi', async (req, res, next) => {
        const apikey = req.query.apikey,
            kata = req.query.kata
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
        if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

try {
       fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/info/covidindo', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/covid-indonesia`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/info/covidworld', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/world`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/random/meme', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/meme`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/info/kodepos', async (req, res, next) => {
        const apikey = req.query.apikey,
	    kota = req.query.kota
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

try {
       fetch(encodeURI(`https://kodepos-api-zhirrr.vercel.app/?q=${kota}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/translate', async (req, res, next) => {
        const apikey = req.query.apikey,
	    kata = req.query.kata
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})
	
	try {
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/translate?text=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/anime/kusonime', async (req, res, next) => {
        const apikey = req.query.apikey,
	    search = req.query.search
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})
	
	try {
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/kusonime?search=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/anime/manga', async (req, res, next) => {
       const apikey = req.query.apikey,
	    search = req.query.search
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})
	
	try {
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/manga?keyword=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})


router.get('/kuis/caklontong', async (req, res, next) => {
        const apikey = req.query.apikey
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=caklontong`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})




/**
* @Maker
**/



router.get("/photooxy/shadow", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pShadow(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/romantic", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pRomantic(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

// @PHOTOOXY

router.get("/photooxy/smoke", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pSmoke(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/burn-papper", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pBurnPapper(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/naruto", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pNaruto(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/love-message", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pLoveMsg(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/message-under-grass", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pMsgGrass(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});
router.get("/photooxy/glitch", async(req, res, next) => {
  const text1 = req.query.text1;
  const text2 = req.query.text2;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  if(!text2) return res.json(loghandler.nottext2)
  
  try {
  pGlitch(text1, text2)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/double-heart", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pDoubleHeart(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/coffe-cup", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pCoffeCup(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/love-text", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pLoveText(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/neon", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pNeon(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(error)
    }
});

router.get("/photooxy/butterfly", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text1) return res.json(loghandler.nottext1)
  
  try {
  pButterfly(text1)
  .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    } catch {
      res.json(loghandler.error)
    }
});

/*
@ AKHIR PHOTOOXY
*/
/*
@ TEXTPROME
*/
router.get('/textpro/logo-wolf', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  const text2 = req.query.text2;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  try {
    zrapi 
  .textpro("https://textpro.me/create-wolf-logo-black-white-937.html", [
    text, text2
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
             res.json(error)
  } 
});

router.get('/textpro/natural-leaves', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
    zrapi 
  .textpro("https://textpro.me/natural-leaves-text-effect-931.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
  	   res.json(error)
  }
});

router.get('/textpro/logo-wolf2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  try {
    zrapi 
  .textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [
    text, text2
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
  	res.json(error)
  }
});

router.get('/textpro/logo-wolf', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  try {
    zrapi 
  .textpro("https://textpro.me/matrix-style-text-effect-online-884.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
  	res.json(error)
  }
});

router.get('/textpro/logo-wolf', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  try {
    zrapi 
  .textpro("https://textpro.me/firework-sparkle-text-effect-930.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
  	res.json(error)
  }
});

router.get('/textpro/thunder', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  try {
    zrapi 
  .textpro("https://textpro.me/thunder-text-effect-online-881.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
  	res.json(error)
  }
});

router.get('/textpro/black-pink', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
    zrapi 
  .textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
  	res.json(error)
  }
});

router.get('/textpro/drop-water', async(req, res, next) => {



  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
    zrapi 
  .textpro("https://textpro.me/dropwater-text-effect-872.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
  	res.json(loghandler.error)
  }
});

router.get('/textpro/christmas', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
    zrapi 
  .textpro("https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
    res.json(loghandler.error)
  }
});

router.get('/textpro/3d-gradient', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
try {
    zrapi 
  .textpro("https://textpro.me/3d-gradient-text-effect-online-free-1002.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
    res.json(loghandler.error)
  }
});

router.get('/textpro/porn-hub', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text1;
  const text2 = req.query.text2;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext1)
  if(!text2) return res.json(loghandler.nottext2)
  
  try {
    zrapi 
  .textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [
    text, text2
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  } catch {
    res.json(loghandler.error)
  }
});

/*
@AKHIR TEXTPRO ME
*/

router.get('/maker/dadu', async (req, res, next) => {
  const apikey = req.query.apikey;

  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
      random = Math.floor(Math.random() * 6) + 1
      hasil = 'https://www.random.org/dice/dice' + random + '.png'
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/dadu.png', data)
        res.sendFile(__path+'/tmp/dadu.png')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/asupan/tiktok', async (req, res, next) => {
  const apikey = req.query.apikey;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/Asupan/main/video/tiktok.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/asupan/ukhty', async (req, res, next) => {
  const apikey = req.query.apikey;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/warga62/master/ukhty.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/asupan/hijab', async (req, res, next) => {
  const apikey = req.query.apikey;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/warga62/master/hijaber.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get('/asupan/cecan', async (req, res, next) => {
  const apikey = req.query.apikey;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofc/warga62/master/cecan.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/asupan', async (req, res, next) => {
  const apikey = req.query.apikey;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/asupan.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.asupan;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
    res.sendFile(__path +'/tmp/asupan.mp4')
  } catch {
    res.json(loghandler.error)
  }
});

router.get('/asupan/santuy', async (req, res, next) => {
        const apikey = req.query.apikey
            
	if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});

try {
       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/santuy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})

router.get("/maker/nulis", async (req, res, next) => {
  
  apikey = req.query.apikey;
  text = req.query.text;
  
  if(!text) return res.json(loghandler.nottext)
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
       var d = new Date
           var tgl = d.toLocaleDateString('id-Id')
           var hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
	   var fontPath = __path + '/lib/font/Zahraaa.ttf'
           var inputPath = __path + '/lib/kertas/nulis2.jpg'
           var outputPath = __path + '/tmp/hasil2.jpg'
      spawn('convert', [
    inputPath,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '20',
    '-interline-spacing',
    '1',
    '-annotate',
    '+806+78',
    hari,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '18',
    '-interline-spacing',
    '1',
    '-annotate',
    '+806+102',
    tgl,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '20',
    '-interline-spacing',
    '-7.5',
    '-annotate',
    '+344+142',
    text,
    outputPath
  ])
  .on('error', () => console.log('Error Nulis2'))
  .on('exit', () => {
	          res.sendFile(outputPath)
	})
  } catch {
    res.json(loghandler.error)
  }
})
router.get('/maker/harta-tahta', async(req, res, next) => {
  const text = req.query.text;
  const apikey = req.query.apikey;
  
  if(!text) return res.json(loghandler.nottext)
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
  let hasil = 'https://api.zeks.xyz/api/hartatahta?text='+ text +'&apikey=apivinz' 
  data = await fetch(hasil).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/tahta.jpg', data)
  res.sendFile(__path +'/tmp/tahta.jpg')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/maker/skatch', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://lindow-api.herokuapp.com/api/sketcheffect?img=${url}&apikey=LindowApi`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/skatch.jpeg', data)
        res.sendFile(__path+'/tmp/skatch.jpeg')
  } catch {
    res.json(loghandler.error)
  }
});

///FITUR TAMBAHAN

router.get('/trigger', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://some-random-api.ml/canvas/triggered?avatar=${url}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/trigger.gif', data)
        res.sendFile(__path+'/tmp/trigger.gif')
  } catch {
    res.json(loghandler.invalidKey)
  }
});
router.get('/maker/ttp', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
  let hasil = `https://api.xteam.xyz/ttp?file&text=${text}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/ttp.jpeg', data)
        res.sendFile(__path+'/tmp/ttp.jpeg')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/maker/attp', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
  let hasil = `https://api.xteam.xyz/attp?file&text=${text}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/attp.gif', data)
        res.sendFile(__path+'/tmp/attp.gif')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/wasted', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://some-random-api.ml/canvas/wasted?avatar=${url}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/wasted.jpeg', data)
        res.sendFile(__path+'/tmp/wasted.jpeg')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/passed', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://some-random-api.ml/canvas/passed?avatar=${url}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/passed.jpeg', data)
        res.sendFile(__path+'/tmp/passed.jpeg')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/meme', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text= req.query.text;
  const text2 = req.query.text2;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://api.memegen.link/images/custom/${text}/${text2}.png?background=${url}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/meme.jpeg', data)
        res.sendFile(__path+'/tmp/meme.jpeg')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/bokep', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    const bokep = JSON.parse(fs.readFileSync(__path +'/data/bokep.json'));
    const Bokep = bokep[Math.floor(Math.random() * bokep.length)];
    let hasil = Bokep.bokep;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/bokep.mp4', data)
    res.sendFile(__path +'/tmp/bokep.mp4')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/cersex', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/cersex`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/cerpen', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/cerpen`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/tebakbendera', async(req, res, next) => {
  const apikey = req.query.apikey;
if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/tebak-bendera`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.invalidKey)
}
})
router.get('/fisheye', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://docs-jojo.herokuapp.com/api/fisheye-image?image_url=${url}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/fisheye.jpeg', data)
        res.sendFile(__path+'/tmp/fisheye.jpeg')
  } catch {
    res.json(loghandler.invalidKey)
  }
});
router.get('/scary', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://docs-jojo.herokuapp.com/api/scary-gif?image_url=${url}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/fisheye.gif', data)
        res.sendFile(__path+'/tmp/fisheye.gif')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/petir', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
  let hasil = `https://docs-jojo.herokuapp.com/api/lightning?image_url=${url}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/petir.gif', data)
        res.sendFile(__path+'/tmp/petir.gif')
  } catch {
    res.json(loghandler.invalidKey)
  }
});
router.get('/quotesimage', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
  let hasil = `https://docs-jojo.herokuapp.com/api/quotes-image`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/quotes.jpeg', data)
        res.sendFile(__path+'/tmp/quotes.jpeg')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/random/pantun', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/random_pantun`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/artimimpi', async(req, res, next) => {
  const apikey = req.query.apikey;
  query = req.query.search
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})
  
  try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/artimimpi?q=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/artinama', async(req, res, next) => {
  const apikey = req.query.apikey;
  query = req.query.search
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
  
  try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/artinama?nama=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/neonime', async(req, res, next) => {
  const apikey = req.query.apikey;
  query = req.query.search
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
  
  try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/neonime_search?q=boruto${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/maker/barcode', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
  let hasil = `https://docs-jojo.herokuapp.com/api/barcode_maker?text=${text}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/barcode.jpeg', data)
        res.sendFile(__path+'/tmp/barcode.jpeg')
  } catch {
    res.json(loghandler.error)
  }
});
router.get('/maker/qrcode', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!text) return res.json(loghandler.nottext)
  
  try {
  let hasil = `https://docs-jojo.herokuapp.com/api/qrcode?text=${text}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/qrcode.jpeg', data)
        res.sendFile(__path+'/tmp/qrcode.jpeg')
  } catch {
    res.json(loghandler.invalidKey)
  }
});
router.get('/anime/loli', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
  let hasil = `https://docs-jojo.herokuapp.com/api/randomloli`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/loli.jpeg', data)
        res.sendFile(__path+'/tmp/loli.jpeg')
  } catch {
    res.json(loghandler.invalidKey)
  }
});
router.get('/bucin', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/katacinta`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/jadwaltv', async(req, res, next) => {
  const apikey = req.query.apikey;
  query = req.query.search
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter channel"})
  
  try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/jadwaltv?ch=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/jadwaltvnow', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/jadwaltvnow`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})























router.get('/maker/transformer', async(req, res, next) => {
  const apikey = req.query.apikey;
  text = req.query.text;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://textmaker-api-zahirr.herokuapp.com/api/special/transformer?text=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/serti/sertiepep', async(req, res, next) => {
  const apikey = req.query.apikey;
  text = req.query.text;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    
    try {
    fetch(encodeURI(`https://textmaker-api-zahirr.herokuapp.com/api/special/sertifikatepep?text=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	author: 'Alvaro',
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
})
router.get('/maker/emoji2png', async(req, res, next) => {
  const apikey = req.query.apikey;
  const Emoji = req.query.text;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!Emoji) return res.json(loghandler.nottext)
  
  try {

    emoji.get(Emoji)
    .then(img_emoji => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: img_emoji.images[0].url
      }
      res.json(result)
    })
  
    } catch {
      res.json(loghandler.error)
    }
});

router.get('/web2plain-text', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });
  limitAdd(apikey);
  let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
  if(!url) return res.json(loghandler.noturl)
  
  try {
    fetch(encodeURI(`https://websitetextextraction.apifex.com/api/v1/extract?url=${url}`))
    .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
               status: true,
               code: 200,
               creator: `${creator}`,
                 result
             })
         })
         } catch {
         	res.json(loghandler.error)
}
});


router.get('/cekapikey', async(req, res, next) => {
  const apikey = req.query.apikey;
  if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first!`
  });

try {
    res.json({
      status: 'active',
      creator: `${creator}`,
      apikey: `${apikey}`,
      message: 'APIKEY ACTIVE'
    })
  } catch {
    res.json(loghandler.error)
  }
})

router.use(function (req, res) {

    res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

module.exports = router
