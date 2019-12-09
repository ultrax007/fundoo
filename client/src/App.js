import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Notes";
import Archived from "./components/Archived";
import Trash from "./components/Trash";
// import Admin from "./components/Admin";
function App() {
	return (
		<div>
			<BrowserRouter>
					<Route path="/" exact component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/forgotPassword" component={ForgotPassword}></Route>
					<Route path="/resetPassword" component={ResetPassword}></Route>
					<Route path="/dashboard" component={Dashboard}></Route>
					<Route path="/dashboard/notes" component={Notes}></Route>
					<Route path="/dashboard/archived" component={Archived}></Route>
					<Route path="/dashboard/trash" component={Trash}></Route>
					{/* <Route path="/dashboard/" component={}></Route> */}
			</BrowserRouter>
		</div>
	);
}

export default App;
