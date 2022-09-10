import './assets/css/style.css';

import Login from './modules/Login';

const login = new Login('.formulario-login');
const cadastro = new Login('.formulario-cadastro');

login.init();
cadastro.init();



