import React from "react";
import userServices from "../services/userServices";
import "../sass/styles.sass";
import { connect } from "react-redux";
import ServiceCards from "./ServiceCards";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

let path = "/dashboard/notes";
let snackStyle;

const uServe = new userServices();
const themeS = createMuiTheme({
	overrides: {
		MuiSnackbarContent: {
			root: {
				backgroundColor: "#ea4335",
				textAlign: "center"
			}
		},
		MuiTypography: {
			root: {
				flexDirection: "column",
				textAlign: "center"
			}
		}
	}
});
const themeE = createMuiTheme({
	overrides: {
		MuiSnackbarContent: {
			root: {
				backgroundColor: "#fbbc05",
				textAlign: "center"
			}
		},
		MuiTypography: {
			root: {
				alignItems: "center"
			}
		}
	}
});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			progress: false,
			sOpen: false,
			eOpen: false,
			message: "",
			selectedCard: ""
		};
	}
	componentDidMount() {
		if (localStorage.getItem("cartId")) {
			this.getCartDetails();
		}
	}
	getCartDetails = () => {
		uServe
			.getCartDetails(localStorage.getItem("cartId"))
			.then(res => {
				console.log("successfully fetched details", res.data.data.product);
				this.setState({
					selectedCard: res.data.data.product
				});
			})
			.catch(err => {
				console.log("unable to fetch data", err);
			});
	};
	changeProgress = () => {
		this.setState({ progress: false });
	};
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	handleSubmit = () => {
		let loginData = {};
		loginData.email = this.state.email;
		loginData.password = this.state.password;

		uServe
			.login(loginData)
			.then(response => {
				if (response.status === 200) {
					this.setState({ progress: true });
					this.timer = setTimeout((this.changeProgress, 700));
					console.log("data in req", response);
					console.log("login successful", response.data.id);
					localStorage.removeItem("token");
					localStorage.setItem("token", response.data.id);
					localStorage.setItem("userId", response.data.userId);
					let name =
						this.capitalizeFirstLetter(response.data.firstName) +
						" " +
						this.capitalizeFirstLetter(response.data.lastName);
					localStorage.setItem("name", name);
					localStorage.setItem("email", response.data.email);
					localStorage.setItem("imageUrl", response.data.imageUrl);
					console.log("name is", name);
					snackStyle = {
						color: "white",
						height: "fitContent",
						width: "fitContent",
						borderRadius: "15px"
					};
					this.setState({ sOpen: true, message: "successful login" });
					setTimeout(() => {
						this.props.history.push(path);
					}, 1000);
				}
			})
			.catch(err => {
				snackStyle = {
					color: "white",
					height: "fitContent",
					width: "fitContent",
					borderRadius: "15px"
				};
				this.setState({ eOpen: true, message: "unsuccessful login" });
				console.log("unsuccessful", err);
			});
	};

	handleForgot = () => {
		const path = "/forgotPassword";
		this.props.history.push(path);
	};
	handleRegister = () => {
		const path = "/";
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
	handleClose = () => {
		this.setState({ eOpen: false, sOpen: false });
	};

	render() {
		const classes = {
			MuiPaper: {
				root: {
					height: "500px"
				}
			},
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
				width: "100%",
				height: "500px"
			},
			textField: {
				alignSelf: "center",
				marginLeft: "2%",
				marginRight: "2%",
				width: "80%",
				textAlign: "center"
			},
			textFieldetc: {
				fontSize: "14px",
				color: "#7d76a5",
				alignSelf: "center",
				marginLeft: "2%",
				marginRight: "2%",
				width: "80%",
				textAlign: "left"
			},
			emailField: {
				alignSelf: "center",
				marginLeft: "2%",
				marginRight: "2%",
				width: "80%",
				textAlign: "center"
			}
		};
		return (
			<div className="MainApp">
				<div id="dContainer">
					<div className="LoginCard">
						<Paper style={classes.container}>
							<ValidatorForm
								className="form"
								ref="form"
								onSubmit={this.handleSubmit}
								onError={errors =>
									console.log("errors in form submission", errors)
								}
							>
								<div className="Paper">
									<div className="LoginFieldLogo">
										<Typography
											variant="h5"
											component="h5"
											style={classes.textField}
										>
											<label id="bl">F</label>
											<label id="rd">u</label>
											<label id="yl">n</label>
											<label id="bl">d</label>
											<label id="gn">o</label>
											<label id="rd">o</label>
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
										<TextValidator
											autoComplete="username"
											id="outlined-basic"
											type="email"
											label="Email"
											margin="normal"
											variant="outlined"
											style={classes.emailField}
											value={this.state.email}
											onChange={event => this.handleEmail(event)}
											validators={["required", "isEmail"]}
											errorMessages={[
												"this field is required",
												"email is not valid"
											]}
										/>
									</div>

									<div className="LoginFieldInput">
										<TextValidator
											id="outlined-password-input"
											label="Password"
											style={classes.emailField}
											type="password"
											autoComplete="current-password"
											margin="normal"
											variant="outlined"
											onChange={event => this.handlePassword(event)}
											validators={["required"]}
											errorMessages={["this field is required"]}
											value={this.state.password}
										/>
									</div>
									<div className="LoginFieldForgot">
										<Button style={classes.button} onClick={this.handleForgot}>
											Forgot Password
										</Button>
									</div>
									<div className="LoginFieldLast">
										<Button
											style={classes.button}
											onClick={this.handleRegister}
										>
											Register
										</Button>
										{this.state.progress ? (
											<CircularProgress id="loading" />
										) : null}
										<Button
											variant="contained"
											style={classes.buttonS}
											type="submit"
										>
											Login
										</Button>
									</div>
								</div>
							</ValidatorForm>
						</Paper>
						<div>
							<MuiThemeProvider theme={themeE}>
								<Snackbar
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "center"
									}}
									style={snackStyle}
									open={this.state.eOpen}
									onClose={this.handleClose}
									autoHideDuration={3000}
									message={<label id="notify">{this.state.message}</label>}
								/>
							</MuiThemeProvider>
							<MuiThemeProvider theme={themeS}>
								<Snackbar
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "center"
									}}
									style={snackStyle}
									open={this.state.eOpen}
									onClose={this.handleClose}
									autoHideDuration={3000}
									message={<label id="notify">{this.state.message}</label>}
								/>
							</MuiThemeProvider>
						</div>
					</div>
					{this.state.selectedCard?
						<div id="serCard">
							<ServiceCards
								sData={this.props.dataCardArray}
								sCard={this.state.selectedCard}
								myStyle={true}
							/>
						</div>:null}
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		dataCardArray: state.cardArrayData
	};
};
export default connect(mapStateToProps)(Login);
