const Login = require('../models/loginModel');

exports.index = (req, res, next) => {
    res.render('login');
    next();
}

exports.register = async function (req, res) {

        const login = new Login(req.body);
        await login.register();
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }
        req.flash('success', 'Seu usuario foi criado com sucessso');
        req.session.save(function () {
            return res.redirect('/login/index');
        });

        return res.render('404');
}

exports.login = async function (req, res) {
    try{
    const login = new Login(req.body);
    await login.login();
    if (login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function () {
            return res.redirect('/login/index');
        });
        return;
    }
    req.flash('success', 'Login foi feito com sucesso.');
    req.session.user = login.user;
    req.session.save(function () {
        return res.redirect('/login/index');
    });
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.logout = (( req, res) => {
    req.session.destroy();
    res.redirect('/');
});