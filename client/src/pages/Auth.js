import { useCallback, useContext, useRef, } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const AuthPage = () => {
	const history = useHistory()
	const { login } = useContext(AuthContext)
	const usernameRef = useRef();
	const passwordRef = useRef();

	const onLogin = useCallback(async (e) => {
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		await login(username, password);
		history.push("/");
	}, [history, login])

	return (
		<div className="my-auto">
			<form onSubmit={onLogin} className="flex flex-col gap-3 bg-gray-100 shadow rounded-lg p-5 mx-auto max-w-md">
				<div className="text-2xl font-bold text-gray-700"> Login </div>
				<input type="text" name="username" placeholder="username" required ref={usernameRef} />
				<input type="password" name="password" placeholder="password" required ref={passwordRef} />
				<button className="btn-primary" type="submit">Login</button>
			</form>
		</div>

	);
}

export default AuthPage;