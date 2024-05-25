import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [passwd, setPasswd] = useState("");

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

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
		if (email == "" && passwd == "") {
			setError(true);
		} else {
			setSubmitted(true);
			setError(false);
			postLogin();
		}
	};

	const postLogin = async () => {
		var isLogged = false;
		await axios
			.post(
				import.meta.env.VITE_API_SERVER_ADDRESS + "/api/auth/authenticate",
				{
					email: email,
					password: passwd,
				}
			)
			.then(function (res) {
				console.log(res);
				localStorage.setItem("jwtToken", res.data.token);
				isLogged = true;
			})
			.catch(function (error) {
				console.log(error);
			});

		if (isLogged) {
			navigate("/main");
		}
	};

	const alert = () => {
		return (
			<div
				className="alert alert-warning alert-dismissible fade show"
				role="alert"
				style={{ display: error ? "" : "none" }}
			>
				<strong>Login lub hasło niepoprawne</strong>
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
