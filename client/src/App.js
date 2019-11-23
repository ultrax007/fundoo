import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/forgotPassword" component={ForgotPassword}></Route>
					<Route path="/resetPassword" component={ResetPassword}></Route>

				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
