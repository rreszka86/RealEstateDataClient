import { useState } from "react";
import userService from "../services/userService";

function Login() {
	const [email, setEmail] = useState("");
	const [passwd, setPasswd] = useState("");

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	const [message, setMessage] = useState("")
	const [validateErrors, setValidateErrors] = useState([])

	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	const handlePasswd = (e) => {
		setPasswd(e.target.value);
		setSubmitted(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false);
		const validationResult = userService.validateLoginData(email, passwd)
		if (!validationResult.length == 0) {
			setError(true);
			setMessage("Formularz został niepoprawnie wypełniony.");
			setValidateErrors(validationResult);
		} else {
			setSubmitted(true);
			setError(false);
			userService.postLogin(email, passwd).then((res) => {
				console.log("User logged")
				localStorage.setItem("jwtToken", res.token);
				window.location.reload();
			}).catch((err) => {
				console.log(err);
				if(err.toJSON().status == 403){
					setMessage("Nieprawidłowy email lub hasło!")
					setError(true);
				}
			});
			setValidateErrors([]);
		}
	};

	const alert = () => {
		return (
			<div
				className="alert alert-danger alert-dismissible fade show"
				role="alert"
				style={{ display: error ? "" : "none" }}
			>
				<strong>{message}</strong>
				<ul>
					{validateErrors.map((error) => (
                  <li>{error}</li>
                ))}
				</ul>
			</div>
		);
	};

	return (
		<div className="containter mt-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-sm-12 col-md-12 col-lg-4">
					<h1 className="mb-3">Login</h1>
					<div className="message">{alert()}</div>
					<form method="post">
						<div className="mb-3">
							<label className="form-label">Adres Email</label>
							<input
								type="text"
								className="form-control"
								onChange={handleEmail}
								value={email}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="mb-3">
							<label className="form-label">Hasło</label>
							<input
								type="password"
								className="form-control"
								onChange={handlePasswd}
								value={passwd}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="mb-3 form-check">
							<input type="checkbox" className="form-check-input" />
							<label className="form-check-label">Zapamiętaj mnie</label>
						</div>
						<div className="mb-3">
							<button
								type="submit"
								className="btn btn-primary"
								onClick={handleSubmit}
							>
								Zaloguj
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
