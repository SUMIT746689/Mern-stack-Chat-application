//External library
const express = require('express');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

require('dotenv').config()

//confige express and socket io
const app = express();
const http = require('http');
const login = require('./route/login');
const inbox = require('./route/inbox');
const users = require('./route/users');
const { defaultRouter, defaultErrorRouter } = require('./middleware/defaultErrorHandler');
const server = http.createServer(app);
const io = new Server(server);

//connected with database
mongoose.connect('mongodb://localhost:27017/mehedi_chat_application')
  .then(()=>{
    console.log('Database connection successful...')
  })
  .catch((err)=>{
    console.log(err);
  })

//set received data type
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//set static datatype
app.use(express.static('public'));

//set a ejs tamplate
app.set('view engine','ejs');

//set cookie parser
app.use(cookieParser(String(process.env.signedCookieSecret)))


//application routes
app.use('/',login);
app.use('/users',users);
app.use('/inbox',inbox);

//chats control using socketIO

global.io = io ;

//default error handler
app.use(defaultRouter);
app.use(defaultErrorRouter);

//set Listener at port 
server.listen(process.env.PORT,()=>{
    console.log(`Listening at ${process.env.PORT}`)
})

