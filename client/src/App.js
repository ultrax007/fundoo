import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/forgotPassword" component={ForgotPassword}></Route>
					<Route path="/resetPassword" component={ResetPassword}></Route>
					<Route path="/dashboard" component={Dashboard}></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
