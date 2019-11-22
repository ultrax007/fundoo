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
				height: "fit-content"
			}
		}
	}
});

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			service: ""
		};
	}

	handleSubmit = () => {
		let userData = {};
		userData.email = this.state.email;
		userData.password = this.state.password;

		userServices
			.registerUser(userData)
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
	handleLogin = () => {
		const path = "/";
		this.props.history.push(path);
	};

	handleFirstName = event => {
		console.log("value of firstname is ", event.currentTarget.value);
		this.setState({ firstName: event.currentTarget.value });
	};
	handleLastName = event => {
		console.log("value of lastName is ", event.currentTarget.value);
		this.setState({ lastName: event.currentTarget.value });
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
			container: {
				alignItems: "center",
				border: "1px solid #ccc",
				borderRadius: "10px",
				display: "flex",
				justifyContent: "space-around",
				width: "100%"
			},
			tittleField: {
				alignSelf: "left",
				marginLeft: theme.spacing(3),
				marginRight: theme.spacing(1),
				width: "10%",
				textAlign: "center"
			},
			textField: {
				alignSelf: "center",
				fontFamily: "'Open Sans', sans-serif",
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
				width: "80%",
				textAlign: "left"
			},
			textFieldetc: {
				fontSize: "12px",
				marginLeft: "3%",
				color: "#000",
				alignSelf: "center",
				width: "100%",
				textAlign: "left"
			},
			emailField: {
				alignSelf: "left",
				marginLeft: theme.spacing(3),
				marginRight: theme.spacing(1),
				width: "100%",
				textAlign: "center"
			},
			nameField: {
				alignSelf: "center",
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
				width: "90%",
				textAlign: "center"
			},
			button: {
				marginLeft: "4%",
				// marginRight: "4%",
				color: "#1a73e8",
				textTransform: "none"
			},
			buttonS: {
				// marginLeft: "17%",
				marginRight: "2%",
				padding: "0% 7%",
				backgroundColor: "#1a73e8",
				color: "#ffffff",
				textTransform: "none"
			},
			buttonsale: {
				marginLeft: "5%",
				// marginRight: "4%",
				color: "#1a73e8",
				textTransform: "none"
			}
		};
		return (
			<div className="MainApp">
				<div className="regContainer">
					<MuiThemeProvider theme={theme}>
						<Paper style={classes.container}>
							<div className="regPaper">
								<div className="regFieldLogo">
									<Typography
										variant="h5"
										component="h5"
										style={classes.titleField}
									>
										<label style={{ color: "#4285F4" }}>F</label>
										<label style={{ color: "#ea4335" }}>u</label>
										<label style={{ color: "#fbbc05" }}>n</label>
										<label style={{ color: "#4285F4" }}>d</label>
										<label style={{ color: "#34a853" }}>o</label>
										<label style={{ color: "#ea4335" }}>o</label>
									</Typography>
								</div>
								<div className="regFieldText">
									<Typography
										variant="h5"
										component="h5"
										style={classes.textField}
									>
										Create your Fundoo Account
									</Typography>
								</div>
								<div className="regFieldInputfn">
									<div className="fncl">
										<TextField
											id="textF"
											type="text"
											label="First name"
											margin="dense"
											variant="outlined"
											style={classes.nameField}
											value={this.state.firstName}
											onChange={event => this.handleFirstName(event)}
										/>
									</div>
									<div className="fnc">
										<TextField
											id="textF"
											type="text"
											label="Last name"
											margin="dense"
											variant="outlined"
											style={classes.nameField}
											value={this.state.lastName}
											onChange={event => this.handleLastName(event)}
										/>
									</div>
								</div>
								<div className="regFieldInputfn">
									<TextField
										helperText="You can use letter, numbers and periods"
										id="textF"
										type="email"
										label="Username"
										margin="dense"
										variant="outlined"
										style={classes.emailField}
										value={this.state.email}
										onChange={event => this.handleEmail(event)}
									/>
								</div>
								<div className="regFieldInputfn">
									<div className="fncl">
										<TextField
											id="textF"
											label="Password"
											style={classes.nameField}
											type="password"
											autoComplete="current-password"
											margin="dense"
											variant="outlined"
											value={this.state.password}
											onChange={event => this.handlePassword(event)}
										/>
									</div>
									<div className="fnc">
										<TextField
											id="textF"
											label="Confirm"
											style={classes.nameField}
											type="password"
											autoComplete="current-password"
											margin="dense"
											variant="outlined"
											value={this.state.password}
											onChange={event => this.handlePassword(event)}
										/>
									</div>
								</div>
								<div className="regFieldText">
									<Typography component="p" style={classes.textFieldetc}>
										Use 8 or more characters with a mix of letters, numbers &
										symbols
									</Typography>
								</div>
								<div className="regFieldInputfn">
									<Button
										variant="contained"
										style={classes.buttonsale}
										onClick={this.handleSubmit}
									>
										Advance
									</Button>
									<Button
										variant="contained"
										style={classes.buttonsale}
										onClick={this.handleSubmit}
									>
										Basic
									</Button>
								</div>
								<div className="regFieldLast">
									<Button style={classes.button} onClick={this.handleLogin}>Sign in instead</Button>
									<Button
										variant="contained"
										style={classes.buttonS}
										onClick={this.handleSubmit}
									>
										Next
									</Button>
								</div>
							</div>
							<div className="logo">
								<img
									src={require("../assets/account.svg")}
									width="244"
									height="244"
									alt="flowers are blue too"
								></img>
								<div className="regFieldText">
									<Typography component="h7" variant="h7" style={{color:"#424242",textAlign:"center"}}>
										One account. All of Bridgelabz working for you.
									</Typography>
								</div>
							</div>
						</Paper>
					</MuiThemeProvider>
				</div>
			</div>
		);
	}
}
