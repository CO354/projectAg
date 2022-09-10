import validator from "validator";
export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
        this.events();
    }
    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e){
        const el = e.target;
        const emailinput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="passowrd"]');
        let error = false;

        if(!validator.isEmail(emailinput.value)){
            alert('E-mail Invalido');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50 ){
            alert('Senha Precisa ter entre 3 e 50 caracteres');
            error = true;
        }
        
        if(!error) el.submit();
    }
}