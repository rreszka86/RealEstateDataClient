import axios from "axios";

export default class userService{
    static ipAddress = import.meta.env.VITE_API_SERVER_ADDRESS;

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

    static postLogin = async (email, passwd) => {
        try{
            const res = await axios
			.post(
				this.ipAddress + "/api/auth/authenticate",
				{
					email: email,
					password: passwd,
				}
			);
            console.log(res);
            return res.data;
        } catch (error){
            console.log(error)
            throw error;
        }
	};

    static postRegister = async (email, passwd) => {
        try{
            const res = await axios
			.post(this.ipAddress + "/api/auth/register", {
				email: email,
				password: passwd,
			});
            console.log(res);
            return res.data;
        } catch(error){
            console.log(error);
            throw error;
        }
	};

    static validateToken = async (token) => {
        try {
          const res = await axios.get(
            this.ipAddress + "/api/auth/validate",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Token verification status: " + res.data);
          return res.data;
        } catch (err) {
          console.log(err); 
          throw err;
        }
      };
}