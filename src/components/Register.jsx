import { useState } from "react"
import axios from "axios"

function Register(){
    const [email, setEmail] = useState("")
    const [passwd, setPasswd] = useState("")    
    const [repeatPasswd, setRepeatPasswd] = useState("")    
    const [message, setMessage] = useState("Uzupełnij wszystkie pola") 

    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)

    const ipAddress = "http://localhost:8080"

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setSubmitted(false)
    }

    const handlePasswd = (e) => {
        setPasswd(e.target.value)
        setSubmitted(false)
    }

    const handleRepeatPasswd = (e) => {
        setRepeatPasswd(e.target.value)
        setSubmitted(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(email == "" && passwd == "" && repeatPasswd == "" || passwd != repeatPasswd){
            setError(true)
        } else {
            setSubmitted(true)
            setError(false)
            postRegister()
        }
    }

    const postRegister = async () => {
        axios.post(ipAddress + "/api/auth/register", {
            email: email,
            password: passwd
        })
        .then(function (res) {
            console.log(res)
        })
        .catch(function (error) {
            const status = error.toJSON().status
            console.log(error)
            if(status == 409){
                setError(true)
                setSubmitted(false)
                setMessage("Taki użytkownik już istnieje")
            }
        })
    }

    const successMessage = () => { 
        return ( 
            <div 
                className="success"
                class="alert alert-success alert-dismissible fade show"
                role="alert"
                style={{ 
                    display: submitted ? "" : "none", 
                }} 
            > 
                <strong>Użytkownik {email} został zarejestrowany</strong> 
            </div> 
        ); 
    }; 
  
    const errorMessage = () => { 
        return ( 
            <div 
                className="error"
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
                style={{ 
                    display: error ? "" : "none", 
                }} 
            > 
                <strong>{message}</strong>
            </div> 
        ); 
    }; 



    return (
        <div class="container mt-5">
            <div class="row justify-content-center align-items-center">
                <div class="col-sm-12 col-md-12 col-lg-4">
                    <h1 class="mb-3">Rejestracja</h1>
                    <form method="post" onSubmit={(e) => {

                    }}>
                        <div className="messages">
                            {errorMessage()}
                        </div>
                        <div className="messages">
                            {successMessage()}
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Adres Email</label>
                            <input 
                                type="text" 
                                class="form-control"
                                onChange={handleEmail}
                                value={email}
                            />
                            <span class="text-danger"></span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Hasło</label>
                            <input 
                                type="password"
                                class="form-control"
                                onChange={handlePasswd}
                                value={passwd}
                            />
                            <span class="text-danger"></span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Powtórz hasło</label>
                            <input
                                type="password"
                                class="form-control"
                                onChange={handleRepeatPasswd}
                                value={repeatPasswd}
                            />
                            <span class="text-danger"></span>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Zarejestruj</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register