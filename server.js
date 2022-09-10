require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONFIGPASSWORD)
.then(() => {
    console.log('Conectado banco de dado');
    app.emit('Pronto')
})
.catch(e => console.log('Erro Verifique', e));
const session = require('express-session');
const MongoStore = require('connect-mongo')
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal,checkCsrfError, csrfMiddlewareToken} = require('./src/middlewares/middleware');


app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// arquivos estaticos nos permite acessar directamente, exp: assets, css, js
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(session({
    secret: 'JorgdsfArlando3434323432',
    store: MongoStore.create({mongoUrl: process.env.CONFIGPASSWORD}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 4315 * 7,
        httpOnly: true
    }
}));
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddlewareToken);

app.use(routes);

app.on('Pronto', () =>{
    app.listen(5555, () =>{
        console.log('Acessar http://localhost:5555');
        console.log('Servidor executando na porta 5000');
    });
});
