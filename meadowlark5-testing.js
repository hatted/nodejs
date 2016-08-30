var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
})

var fortunes = [
"line 1",
"sentence b",
"row c",
"d",]

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {
		fortune:randomFortune,
		pageTestScript: '/qa/tests-about.js'
	});
});


app.use(function (req, res){
	res.status(404);
	res.render('404');
});

 
app.use(function (req, res){
	console.error(err.stack);
	res.status(500);
	res.render('500');
}); 

app.listen(app.get('port'), function(){
	console.log('express started on http://localhost:' + app.get('port') + '');
});

