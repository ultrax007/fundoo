import React from "react";
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Notes";
import Archived from "./components/Archived";
import Trash from "./components/Trash";
import EditLable from "./components/Labels";
import Search from "./components/Search";
import Labels from "./components/Labels";
import Reminders from "./components/Reminders";
import AskedQuestion from "./components/AskedQuestion";
import ChooseService from "./components/ChooseService";
import Cart from "./components/Cart";
import "./App.css";
function App() {
	return (
		<div>
			<BrowserRouter>
					<Route path="/" exact component={ChooseService}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/forgotPassword" component={ForgotPassword}></Route>
					<Route path="/resetPassword" component={ResetPassword}></Route>
					<Route path="/dashboard" component={Dashboard}></Route>
					<Route path="/dashboard/notes" component={Notes}></Route>
					<Route path="/dashboard/reminders" component={Reminders}></Route>
					<Route path="/dashboard/archived" component={Archived}></Route>
					<Route path="/dashboard/trash" component={Trash}></Route>
					<Route path="/dashboard/editLable" component={EditLable}></Route>
					<Route path="/dashboard/search" component={Search}></Route>
					<Route path="/dashboard/label/:username" component={Labels}></Route>
					<Route path="/dashboard/AskQuestion/:id" component={AskedQuestion}></Route>
					<Route path="/dashboard/cart" component={Cart}></Route>
					{/* <Route path="/dashboard/" component={}></Route> */}
			</BrowserRouter>
		</div>
	);
}

export default App;
