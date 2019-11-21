import React from "react";
import userServices from "../services/userServices";
import "../sass/styles.sass";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
let path = "/";

const theme = createMuiTheme({
	overrides: {
		MuiPaper: {
			root: {
				height: "500px"
			}
		}
	}
});

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}

	handleSubmit = () => {
		let loginData = {};
		loginData.email = this.state.email;
		loginData.password = this.state.password;

		userServices.loginUser(loginData)
			.then(response => {
				console.log("data in req", response.data);
				console.log("login successful", response.data.token);
				window.localStorage.setItem("token", response.data.token);
				window.localStorage.setItem("loggedUser", response.data.result);
				window.localStorage.setItem("senderId", response.data.senderId);
				if (response.data.status) {
					this.props.history.push(path);
				} else {
					path = "/";
					this.props.history.push(path);
				}
			})
			.catch(err => {
				console.log("unsuccessful", err);
			});
	};

	handleForgot = () => {
		const path = "/forgotPassword";
		this.props.history.push(path);
	};
	handleRegister = () => {
		const path = "/register";
		this.props.history.push(path);
	};

	handleEmail = event => {
		console.log("value of email in login", event.currentTarget.value);
		this.setState({ email: event.currentTarget.value });
	};
	handlePassword = event => {
		console.log("value of password", event.currentTarget.value);
		this.setState({ password: event.currentTarget.value });
	};

	render() {
		const classes = {
			button: {
				marginLeft: "8%",
				color: "#1a73e8",
				textTransform: "none"
			},
			buttonS: {
				marginRight: "10%",
				padding: "0% 7%",
				backgroundColor: "#1a73e8",
				color: "#ffffff",
				textTransform: "none"
			},
			container: {
				alignItems: "center",
				border: "1px solid #ccc",
				borderRadius: "10px",
				display: "flex",
				flexFlow: "column wrap",
				width: "100%"
			},
			textField: {
				alignSelf: "center",
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
				width: "80%",
				textAlign: "center"
			},
			textFieldetc: {
				fontSize: "14px",
				color: "#7d76a5",
				alignSelf: "center",
				marginLeft: "2%",
				marginRight: theme.spacing(1),
				width: "80%",
				textAlign: "left"
			},
			emailField: {
				alignSelf: "center",
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
				width: "80%",
				textAlign: "center"
			}
		};
		return (
			<div className="MainApp">
				<div className="LoginCard">
					<MuiThemeProvider theme={theme}>
						<Paper style={classes.container}>
							<div className="Paper">
								<div className="LoginFieldLogo">
									<Typography
										variant="h5"
										component="h5"
										style={classes.textField}
									>
										<label style={{ color: "#4285F4" }}>F</label>
										<label style={{ color: "#ea4335" }}>u</label>
										<label style={{ color: "#fbbc05" }}>n</label>
										<label style={{ color: "#4285F4" }}>d</label>
										<label style={{ color: "#34a853" }}>o</label>
										<label style={{ color: "#ea4335" }}>o</label>
									</Typography>
								</div>
								<div className="LoginFieldText">
									<Typography
										variant="h5"
										component="h5"
										style={classes.textField}
									>
										Sign In
									</Typography>
								</div>
								<div className="LoginFieldText">
									<Typography component="p" style={classes.textField}>
										Use your Fundoo Account
									</Typography>
								</div>
								<div className="LoginFieldInput">
									<TextField
										id="outlined-basic"
										type="email"
										label="Email"
										margin="normal"
										variant="outlined"
										style={classes.emailField}
										value={this.state.email}
										onChange={event => this.handleEmail(event)}
									/>
								</div>
								<div className="LoginFieldInput">
									<TextField
										id="outlined-password-input"
										label="Password"
										style={classes.emailField}
										type="password"
										autoComplete="current-password"
										margin="normal"
										variant="outlined"
										value={this.state.password}
										onChange={event => this.handlePassword(event)}
									/>
								</div>
								<div className="LoginFieldForgot">
									<Button style={classes.button} onClick={this.handleForgot}>Forgot Password</Button>
								</div>
								<div className="LoginFieldLast">
									<Button style={classes.button}>Register</Button>
									<Button variant="contained" style={classes.buttonS} onClick={this.handleSubmit}>
										Login
									</Button>
								</div>
							</div>
						</Paper>
					</MuiThemeProvider>
				</div>
			</div>
		);
	}
}
