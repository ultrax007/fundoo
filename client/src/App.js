import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Login}></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
