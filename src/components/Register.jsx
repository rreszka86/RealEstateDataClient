import { useState } from "react";
import userService from "../services/userService";

function Register() {
	const [email, setEmail] = useState("");
	const [passwd, setPasswd] = useState("");
	const [repeatPasswd, setRepeatPasswd] = useState("");
	const [message, setMessage] = useState();
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const [validateErrors, setValidateErrors] = useState([]);

	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	const handlePasswd = (e) => {
		setPasswd(e.target.value);
		setSubmitted(false);
	};

	const handleRepeatPasswd = (e) => {
		setRepeatPasswd(e.target.value);
		setSubmitted(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(false);

		const validationResult = userService.validateRegisterData(email, passwd, repeatPasswd);

		if (!validationResult.length == 0) {
			setMessage("Formularz został niepoprawnie wypełniony:")
			setValidateErrors(validationResult);
			setError(true);
		} else {
			setValidateErrors([]);
			setSubmitted(true);
			setError(false);
			userService.postRegister(email, passwd).then((res) => {
				console.log("User registered");
			}).catch((err) => {
				const status = err.toJSON().status;
				console.log(err);
				if (status == 409) {
					setError(true);
					setSubmitted(false);
					setMessage("Taki użytkownik już istnieje!");
				}
			})
			setValidateErrors([])
		}
	};

	const successMessage = () => {
		return (
			<div
				className="success alert alert-success alert-dismissible fade show"
				role="alert"
				style={{
					display: submitted ? "" : "none",
				}}
			>
				<strong>
					Użytkownik {email} został zarejestrowany, możesz przejść do strony
					logowania.
				</strong>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div
				className="error alert alert-danger alert-dismissible fade show"
				role="alert"
				style={{
					display: error ? "" : "none",
				}}
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
		<div className="container mt-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-sm-12 col-md-12 col-lg-4">
					<h1 className="mb-3">Rejestracja</h1>
					<form method="post" onSubmit={(e) => {}}>
						<div className="messages">{errorMessage()}</div>
						<div className="messages">{successMessage()}</div>
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
						<div className="mb-3">
							<label className="form-label">Powtórz hasło</label>
							<input
								type="password"
								className="form-control"
								onChange={handleRepeatPasswd}
								value={repeatPasswd}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="mb-3">
							<button
								type="submit"
								className="btn btn-primary"
								onClick={handleSubmit}
							>
								Zarejestruj
							</button>
							<a className="btn btn-primary float-end" href="/login">
								Przejdź do logowania
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
