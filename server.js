const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT||3000;

var app = express();
hbs.registerPartials(__dirname + '/views/parials')
app.set('view engine', 'hbs');


app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = now + req.method + req.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  next();
})

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs'); // middleware works in order from top to bottom
// });

app.use(express.static(__dirname + '/public')); //registering middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    //currentYear: new Date().getFullYear()
  });
  //res.send('<h1>Hello Express<h1>');
  // res.send({
  //   name: 'Himanshu',
  //   Likes: [
  //     'Football',
  //     'Studying'
  //   ],
  //   Age: 25
  // });
});

app.get('/about',(req, res) =>{
  //res.send('About Page')
  res.render('about.hbs',{
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });
});
app.get('/projects',(req,res) =>{
  res.render('projects.hbs', {
    pageTitle: 'Portfolio'
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
})
app.listen(port, () => {
  console.log('Server is up on port ', port);
});
