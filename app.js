var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set("view options", {
	layout: false
});
app.use(favicon());
//app.use(express.json());
//app.use(morgan('combined'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'pages')));

//app.use('/', routes);
//app.use('/users', users);


mongoose.connect('mongodb://localhost:27017/rss');


var UserSchema = new mongoose.Schema({
	name: String,
	link: String
}),
	Feed = mongoose.model('Feed', UserSchema);


router.get('/', function (req, res) {
    res.render('pages/index.html');
	//res.send("devamghose");
});
router.get('/api/feed',function(req, res){
	Feed.find({},function(err, results){
		res.json(results);
	});
});
router.post('/api/feed', function(req, res){
	//console.log(req.body);
	var feed = new Feed(req.body);
	//feed.save();
	feed.save(function(err, result){
		res.json(result);
	});
})

/*router.delete('/api/feed', function(req, res){
	Feed.remove({req.params.name}, function(err){
		console.log("deleted");
	});
});*/

router.get('/about', function(req, res){
	res.send("rgfrg");
});
router.get('/about/wow', function(req, res){
	res.send("nested routing");
})
app.use('/', router);
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
app.listen(3000);	
console.log('listening.......'); 
