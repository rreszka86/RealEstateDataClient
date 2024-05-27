export default class userService{
    static validateRegisterData(email, passwd, repeatPasswd){
        let errors = [];
        
        if(!email){
            errors.push("Należy podać email!");
        }
        else if(!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)){
            errors.push("Należy podać prawidłowy email!");
        }

        if(!passwd){
            errors.push("Należy podać hasło!");
        }
        else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(passwd)){
            errors.push("Należy podać prawidłowe hasło! (min. 8 znaków, min. 1 duża litera, min. 1 cyfra)");
        }
        if(passwd != repeatPasswd){
            errors.push("Oba hasła muszą być takie same!");
        }

        return errors;
    }

    static validateLoginData(email, passwd){
        let errors = [];
        
        if(!email){
            errors.push("Należy podać email!")
        }

        if(!passwd){
            errors.push("Należy podać hasło!")
        }

        return errors;
    }
}