__path = process.cwd();
var favicon = require('serve-favicon');
var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
var app = express()
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const schedule = require('node-schedule');
const MemoryStore = require('memorystore')(session);
const rateLimit = require("express-rate-limit");
var logger = require('morgan');

var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api'), 
    userRouters = require('./routes/users')
    premRouters = require('./routes/premium')
    storRouters = require('./routes/storage')
var path = require('path');
const { isAuthenticated } = require('./lib/auth');
const { connectMongoDb } = require('./database/connect');
const { getApikey, resetLimit } = require('./database/debe');
const { port } = require('./lib/settings');
var { color } = require('./lib/color.js')
const { ignoreFavicon } = require('./lib/function');
const { ExpiredTime, getTotalReq, getTodayReq, getVisitor, getTotalUser, addRequest, addVisitor } = require('./database/premium');
const PORT = process.env.PORT || port;

connectMongoDb();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5000, 
  message: 'Oops too many requests'
});
app.use(limiter);

app.enable('trust proxy');
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(logger('dev'));
app.use(cors())
app.use(secure)
app.use(favicon(__path +'/views/favicon.ico'))
app.use(ignoreFavicon)
app.use(express.static(path.join(__dirname, 'hasil')));
app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use(function(req, res, next) {
  getTotalUser()
  addRequest();
  next();
})
app.get('/', (req, res) => {
    res.sendFile(__path + '/views/house.html')
})
app.get('/game', (req, res) => {
    res.sendFile(__path + '/views/listgame.html')
})
app.get('/game/reverse', (req, res) => {
    res.sendFile(__path + '/views/reverse.html')
})
app.get('/game/suit', (req, res) => {
    res.sendFile(__path + '/views/suit.html')
})
app.get('/game/shoot', (req, res) => {
    res.sendFile(__path + '/views/shoot.html')
})
app.get('/game/dadu', (req, res) => {
    res.sendFile(__path + '/views/dadu.html')
})
app.get('/game/chest', (req, res) => {
    res.sendFile(__path + '/views/chest.html')
})
app.get('/game/math', (req, res) => {
    res.sendFile(__path + '/views/math.html')
})
app.get('/game/ship', (req, res) => {
    res.sendFile(__path + '/views/ship.html')
})
app.get('/dino', (req, res) => {
    res.sendFile(__path + '/views/dino.html')
})
app.get('/ph', (req, res) => {
    res.sendFile(__path + '/views/ph.html')
})
app.get('/game/ttt', (req, res) => {
    res.sendFile(__path + '/views/ttt.html')
})
app.get('/about', (req, res) => {
    res.sendFile(__path + '/views/about.html')
})
app.get('/game/pingpong', (req, res) => {
    res.sendFile(__path + '/views/game.html')
})
app.get('/game/snake', (req, res) => {
    res.sendFile(__path + '/views/snack.html')
})
app.get('/game/2048', (req, res) => {
    res.sendFile(__path + '/views/2048.html')
})
app.get('/game/maze', (req, res) => {
    res.sendFile(__path + '/views/maze.html')
})
app.get('/game/whack', (req, res) => {
    res.sendFile(__path + '/views/tikus.html')
})
app.get('/game/tetris', (req, res) => {
    res.sendFile(__path + '/views/tetris.html')
})
app.get('/game/calculator', (req, res) => {
    res.sendFile(__path + '/views/calc.html')
})
app.get('/game/smash', (req, res) => {
    res.sendFile(__path + '/views/smash.html')
})
app.get('/game/tebak-angka', (req, res) => {
    res.sendFile(__path + '/views/angka.html')
})
app.get('/docs', isAuthenticated, async (req, res) => { 
  addVisitor()
  let { apikey, username, limit, totalreq } = req.user
  let total = await getTotalReq()
  let today = await getTodayReq()
  let visitor = await getVisitor()
  let userTotal = await getTotalUser()
  res.render('docs', {
    limit: limit,
    total: total,
    today,
    visitor,
    userTotal,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});

app.get('/anime', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('anime', {
    limit: limit,
    username: username,
    apikey: `${apikey}`,
    layout: 'layouts/main'
  });
});

app.get('/cecan', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('cecan', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});

app.get('/changelog', isAuthenticated, async (req, res) => { 
  let { apikey, username } = req.user
  res.render('changelog', {
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});

app.get('/asupan', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('asupan', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/canvas', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('canvas', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/cecan', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('cecan', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/downloader', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('downloader', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/editor', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('editor', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/fun', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('fun', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/image', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('image', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/islam', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('islamic', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/maker', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('maker', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/music', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('music', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/nsfw', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('nsfw', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/other', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('other', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/photooxy', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('photooxy', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/random', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('random', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/textpro', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('textpro', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/tools', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('tools', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/wallpaper', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('wallpaper', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.use('/', mainrouter);
app.use('/api', apirouter);
app.use('/users', userRouters);
app.use('/premium', premRouters);
app.use('/storage', storRouters);

app.set('json spaces', 4);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  schedule.scheduleJob('* * * * *', () => { 
    ExpiredTime()
  });
});

module.exports = app
