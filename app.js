'use strict';
var express = require('express'),
  app = express(),
  router   = require('express').Router(),
  bluemix = require('./config/bluemix'),
  watson = require('watson-developer-cloud'),
  extend = require('util')._extend,
  // fs = require('fs'),
  // q = require(q),
  path = require('path')
  // var promise = require('promise');
  // var logger = require('morgan');
// var dummy_text = fs.readFileSync('mobydick.txt');
var Twitter = require('twitter');
// Bootstrap application settings
require('./config/express')(app);


app.set('views', __dirname + '/views')
app.set('view engine', 'jade');
// app.use(express.logger('dev'))
// app.use(logger); 
// app.use(app.router);
app.use(express.static(__dirname + '/public'));

var nameisthis;

// app.configure(function() {
//     app.set('views', __dirname + '/views');
//     app.use(express.static(__dirname + '/public'));
   
// });

// if bluemix credentials exists, then override local
var credentials = extend({
    version: 'v2',
    url: 'https://gateway.watsonplatform.net/personality-insights/api',
    username: '83fcd80d-6d14-4a65-be49-9ef61a1be7c2',
    password: 'TzMpI6bQKGUu'
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES

// Create the service wrapper
var personalityInsights = watson.personality_insights(credentials);


app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});

app.get('/things_we_used', function (req, res) {
  res.render('things_we_used',
  { title : 'Home' }
  )
});


app.get('/future', function (req, res) {
  res.render('future',
  { title : 'Home' }
  )
});


app.get('/dataset', function (req, res) {
  res.render('dataset',
  { title : 'Home' }
  )
});

app.get('/cards', function (req, res) {
  res.render('cards',
  { title : 'Home' }
  )
});
app.get('/work_flow', function (req, res) {
  res.render('work_flow',
  { title : 'Home' }
  )
});


app.get('/about', function (req, res) {
  res.render('about',
  { title : 'Home' }
  )
});
app.get('/public/js/prism.js', function (req, res) {
  res.send('/public/js/prism.js');
});

var testmesenpai;
app.post('/', function(req, res
  ) {
  // var username = req.body.name;
  var username = req.body.username;
data = username;
  console.log("username from post " + username);
  testmesenpai = username;///IMPORTANT
 
  if (username && username.substr(0,1) !== '@') {
    username = '@' + username;
 //   console.log('username from post ' + username);
  }
  console.log("dhane");
  var testmealso = '/about*'
  res.redirect(username ? ''+testmealso + username : '/');
    // res.redirect('/about');
  console.log('working');
});



var data ;
app.get('/about*@:username', function (req, res) {
  var username = req.params.username;
  
  console.log(testmesenpai);

  var promise = getTweet(testmesenpai,req, res);
  // promise.then(console.log('came here afer'), console.error)  
    // data = getTweet(testmesenpai,req, res);
    
   // if(res){  
      // res.render('about' , { title : 'Home' });
      // res.render('about' , { title : 'Home' });
       // console.log('end ');
     //}else{
      // console.log("nothing");
     // }

});



app.get('/about*:username', function(req, res) {
  console.log('redirected');
  var testmedude = '/about*@'
  res.redirect(''+testmedude + req.params.username);

});



app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('index', { error: err });
});

// HTTP 404
app.use(function(req, res){
  res.status(404);
  if (req.accepts('html')) {
    res.render('index', { url: req.url });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});








var client = new Twitter({
    consumer_key: 'qPqtN3g4uDaP6qWYc2CrCUGan',
    consumer_secret: 'jHwHeNCZVwf7A8d1GQKhXhko8EJW55eLkj6tTpem5C1x7L6Wsw',
    access_token_key: '3333122590-oivDLDBXGI1Nxs5eRtKZzDv16e0wSQNecrCAkYA',
    access_token_secret: 'sVAD9VLH2utuHneo0qmeVMloNoWKvtDj7xkxF1po03K3t'
});

var getTweet = function(testmesenpai,req, res) {
  // var cRUN = 0;
  var dataTweets = '';
  console.log('inside get tweets');

  var params = {screen_name: testmesenpai, count :2000};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    
    if (!error) {
      console.log('got it');
     var twit;
      for (twit in tweets){
        dataTweets = dataTweets + tweets[twit].text;
      }
      personalityInsights.profile({text: dataTweets}, function(err, profile) {
        if (err) {
          if (err.message){
  
            err = { error: err.message };
            // res.render("index");
  
          }
          return res.status(err.code || 500).json(err || 'Error processing the request');
        }
        else{
            console.log('returned');
            // return ;
           // var data2 = res.json(profile);
           // console.log(data2.word_count);
           console.log(profile.tree.children[0].id);
          console.log(profile.tree.children[0].children[0].percentage);
          // for (var i = 0 ; i < 5 ; i++){
            var ope  = profile.tree.children[0].children[0].children[0].percentage;
            var con  = profile.tree.children[0].children[0].children[1].percentage;
            var ext  = profile.tree.children[0].children[0].children[2].percentage;
            var agr  = profile.tree.children[0].children[0].children[3].percentage;
            var neu  = profile.tree.children[0].children[0].children[4].percentage;
            console.log("con is "+con);
            // profile.tree.children[0].children[0].children[0].percentage
            // ope = ope.toString();
          // }
         // return app.get('/about');
          // res.render( 'about');
          res.render('about',  { nameis : data ,open : ope  , conn : con , extn : ext , agrn : agr , neun : neu  } );
            // res.render('workingpassvar',{locals : {
  // "array": [
    // 1,
    // 2,
    // 3
  // ]
  // }})
        }
      });


   }
    else {
      console.log(error);

   }
  });

  
}


















var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);