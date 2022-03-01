__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/house.html')
})
router.get('/game', (req, res) => {
    res.sendFile(__path + '/views/listgame.html')
})
router.get('/docs', (req, res) => {
    res.sendFile(__path + '/views/hehe.html')
})
router.get('/home', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})
router.get('/api', (req, res) => {
    res.sendFile(__path + '/views/loding.html')
})
router.get('/sosial', (req, res) => {
    res.sendFile(__path + '/views/sosial.html')
})
router.get('/game/reverse', (req, res) => {
    res.sendFile(__path + '/views/reverse.html')
})
router.get('/game/suit', (req, res) => {
    res.sendFile(__path + '/views/suit.html')
})
router.get('/racing', (req, res) => {
    res.sendFile(__path + '/views/racing.html')
})
router.get('/other', (req, res) => {
    res.sendFile(__path + '/views/other.html')
})
router.get('/tools', (req, res) => {
    res.sendFile(__path + '/views/tools.html')
})
router.get('/textpro', (req, res) => {
    res.sendFile(__path + '/views/textpro.html')
})
router.get('/downloader', (req, res) => {
    res.sendFile(__path + '/views/downloader.html')
})
router.get('/anime', (req, res) => {
    res.sendFile(__path + '/views/anime.html')
})
router.get('/asupan', (req, res) => {
    res.sendFile(__path + '/views/asupan.html')
})
router.get('/canvas', (req, res) => {
    res.sendFile(__path + '/views/canvas.html')
})
router.get('/gacha', (req, res) => {
    res.sendFile(__path + '/views/cecan.html')
})
router.get('/fun', (req, res) => {
    res.sendFile(__path + '/views/fun.html')
})
router.get('/random', (req, res) => {
    res.sendFile(__path + '/views/random.html')
})
router.get('/textpro', (req, res) => {
    res.sendFile(__path + '/views/textpro.html')
})
router.get('/photooxy', (req, res) => {
    res.sendFile(__path + '/views/photooxy.html')
})
router.get('/maker', (req, res) => {
    res.sendFile(__path + '/views/maker.html')
})
router.get('/editor', (req, res) => {
    res.sendFile(__path + '/views/editor.html')
})
router.get('/asupan', (req, res) => {
    res.sendFile(__path + '/views/asupan.html')
})
router.get('/nsfw', (req, res) => {
    res.sendFile(__path + '/views/nsfw.html')
})
router.get('/islam', (req, res) => {
    res.sendFile(__path + '/views/islamic.html')
})
router.get('/music', (req, res) => {
    res.sendFile(__path + '/views/music.html')
})
router.get('/order', (req, res) => {
    res.sendFile(__path + '/views/buy.html')
})
router.get('/price', (req, res) => {
    res.sendFile(__path + '/views/price.html')
})
router.get('/short', (req, res) => {
    res.sendFile(__path + '/views/shortlink.html')
})
router.get('/game', (req, res) => {
    res.sendFile(__path + '/views/listgame.html')
})
router.get('/game/shoot', (req, res) => {
    res.sendFile(__path + '/views/shoot.html')
})
router.get('/game/dadu', (req, res) => {
    res.sendFile(__path + '/views/dadu.html')
})
router.get('/game/chest', (req, res) => {
    res.sendFile(__path + '/views/chest.html')
})
router.get('/game/math', (req, res) => {
    res.sendFile(__path + '/views/math.html')
})
router.get('/game/ship', (req, res) => {
    res.sendFile(__path + '/views/ship.html')
})
router.get('/dino', (req, res) => {
    res.sendFile(__path + '/views/dino.html')
})
router.get('/ph', (req, res) => {
    res.sendFile(__path + '/views/ph.html')
})
router.get('/game/ttt', (req, res) => {
    res.sendFile(__path + '/views/ttt.html')
})
router.get('/about', (req, res) => {
    res.sendFile(__path + '/views/about.html')
})
router.get('/game/pingpong', (req, res) => {
    res.sendFile(__path + '/views/game.html')
})
router.get('/game/snake', (req, res) => {
    res.sendFile(__path + '/views/snack.html')
})
router.get('/game/2048', (req, res) => {
    res.sendFile(__path + '/views/2048.html')
})
router.get('/game/maze', (req, res) => {
    res.sendFile(__path + '/views/maze.html')
})
router.get('/game/whack', (req, res) => {
    res.sendFile(__path + '/views/tikus.html')
})
router.get('/game/tetris', (req, res) => {
    res.sendFile(__path + '/views/tetris.html')
})
router.get('/game/calculator', (req, res) => {
    res.sendFile(__path + '/views/calc.html')
})
router.get('/game/smash', (req, res) => {
    res.sendFile(__path + '/views/smash.html')
})
router.get('/game/tebak-angka', (req, res) => {
    res.sendFile(__path + '/views/angka.html')
})

module.exports = router
