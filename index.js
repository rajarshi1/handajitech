const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


// Configure Handlebars
const hbs = exphbs.create({
	extname: '.hbs'
});

// Register Handlebars as view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// database
const MongoClient = require('mongodb').MongoClient;
var db = null;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(error,client){
	if(error){
		throw error;
    }
    
	db = client.db('test_new');
	var collection = db.collection('startups');
	collection.find({}).toArray(function(err,res){
		// console.log(err);
		// console.log(res);
	})
		
});		



//routes
app.get('/',function(request,response){
	var collection = db.collection('startups');
	collection.find({}).toArray(function(err,res){
		if (err){
			console.log(err)
		}
		// console.log(res)
		response.render('startups',{
			data: res
		})
	})
    // response.sendFile( __dirname + '/test.html');
})
app.get('/create',function(req,res){
    res.sendFile( __dirname + '/test2.html');
})

app.post('/create', function(req,res){
	console.log('data to be created >>>', req.body);
	// res.send('thank you');
	var data = req.body;
	var collection = db.collection('startups');
	collection.insertOne(data,function(error,response){
		// console.log(error,response);
		if(error){
			return res.send('error');
		}
		return res.redirect("/");
	})
    // var collection = db.collection('startups')
})

app.listen(PORT,function(){
    console.log(`app on port ${PORT}`);
})
