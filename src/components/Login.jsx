import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

    const [email, setEmail] = useState("")
    const [passwd, setPasswd] = useState("")      

    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)

    const ipAddress = "http://localhost:8080"

    const navigate = useNavigate()

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setSubmitted(false)
    }

    const handlePasswd = (e) => {
        setPasswd(e.target.value)
        setSubmitted(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(email == "" && passwd == ""){
            setError(true)
        } else {
            setSubmitted(true)
            setError(false)
            postLogin()
        }
    }

    const postLogin = async () => {
        var isLogged = false;
        await axios.post(ipAddress + "/api/auth/authenticate", {
            email: email,
            password: passwd
        })
        .then(function (res) {
            console.log(res)
            localStorage.setItem('jwtToken', res.data.token);
            isLogged = true;
        })
        .catch(function (error) {
            console.log(error)
        })

        if (isLogged){
            navigate("/main");
        }
    }

    const alert = () => {
        return (
            <div class="alert alert-warning alert-dismissible fade show" role="alert" style={{ display: error ? "" : "none", }} >
                <strong>Login lub hasło niepoprawne</strong>
            </div>
        )
    }

    return (
        <div class="containter mt-5">
            <div class="row justify-content-center align-items-center">
                <div class="col-sm-12 col-md-12 col-lg-4">
                    <h1 class="mb-3">Login</h1>
                    <div className="message">
                        {alert()}
                    </div>
                    <form method="post">
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
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" />
                            <label class="form-check-label">Zapamiętaj mnie</label>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Zaloguj</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login