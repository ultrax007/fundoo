import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/forgotPassword" component={ForgotPassword}></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
