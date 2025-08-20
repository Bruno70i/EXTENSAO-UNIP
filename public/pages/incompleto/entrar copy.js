const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


const port = 3000;
var  path = require('path');
const app = express();

var login ="admin";
var password = "123456"

app.use(session({secret:hhhhhhhhh}));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname,'public')));


app.post('/',(req,res)=>{
    if(req.body.password == password && req.bidy.login){
        req.session.login = login;
        res.redirect('/');
    }else{
        res.render('logado')
    }
    res.render('index')
})

app.get('/',(req,res)=>{
    if(req.session){
        res.render('logado');
        console.log('O meu usuario logado é:' + req.session.login);
    }else{
        res.render('index');
    }
})

app.listen(port,()=>{
    console.log('servidor rodando');
})


