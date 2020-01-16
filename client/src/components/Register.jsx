import React from "react";
import userServices from "../services/userServices";
import "../sass/styles.sass";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ServiceCards from "./ServiceCards";
const uServe = new userServices();
let path = "/login";

const theme = createMuiTheme({
	overrides: {
		MuiPaper: {
			root: {
				height: "fit-content"
			}
		}
	}
});

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			repeatPassword: "",
			message: "",
			selectedCard:""
		};
	}
	getCartDetails = () => {
		uServe.getCartDetails(localStorage.getItem("cartId")).then(res => {
			console.log("successfully fetched details", res.data.data.product);
			this.setState({
				selectedCard:res.data.data.product
			})
		}).catch(err => {
			console.log("unable to fetch data",err);
		})
	}
	componentDidMount() {
		this.getCartDetails();
		// custom rule will have name 'isPasswordMatch'
		ValidatorForm.addValidationRule("isPasswordMatch", value => {
			if (value !== this.state.password) {
				console.log("passwords not matched");

				return false;
			}
			console.log("passwords matched");

			return true;
		});
	}

	componentWillUnmount() {
		// remove rule when it is not needed
		ValidatorForm.removeValidationRule("isPasswordMatch");
	}

	handleSubmit = () => {
		let userData = {};
		userData.firstName = this.state.firstName;
		userData.lastName = this.state.lastName;
		userData.service = this.state.selectedCard.name;
		userData.email = this.state.email;
		userData.password = this.state.password;
		userData.cartId = localStorage.getItem("cartId");
		console.log("value in data object", userData);
		uServe
			.register(userData)
			.then(response => {
				console.log("data in req", response);
				console.log("registered successfully", response.status);

				if (response.status) {
					alert("registration successful");
					this.props.history.push(path);
				} else {
					alert("pls try again");
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
		const path = "/login";
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
	handleRPassword = event => {
		console.log("value of password", event.currentTarget.value);
		this.setState({ repeatPassword: event.currentTarget.value });
	};
	handleGoToCart = e => {
		e.preventDefault();
		this.props.history.goBack();
	}
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
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
				width: "100%",
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
				marginLeft: "2%",
				color: "#000",
				alignSelf: "center",
				width: "100%",
				textAlign: "left"
			},
			emailField: {
				alignSelf: "left",
				marginLeft:"2.5%",
				width: "92%",
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
					<div id="goback">
						<Button size="small" variant="contained" color="default" style={{fontSize:"12px"}} onClick={(e)=>this.handleGoToCart(e)}>Go to Cart</Button>
					</div>
					<MuiThemeProvider theme={theme}>
						<Paper style={classes.container}>
							<ValidatorForm
								className="form"
								ref="form"
								onSubmit={this.handleSubmit}
								onError={errors => console.log(errors)}
							>
								<div id="row1">
									<div className="regPaper">
										<div className="regFieldLogo">
											<Typography
												variant="h5"
												component="h5"
												style={classes.titleField}
											>
												<label id="bl">F</label>
												<label id="rd">u</label>
												<label id="yl">n</label>
												<label id="bl">d</label>
												<label id="gn">o</label>
												<label id="rd">o</label>
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
												<TextValidator
													id="texsdftF"
													type="text"
													label="First name"
													margin="dense"
													variant="outlined"
													style={classes.nameField}
													value={this.state.firstName}
													onChange={event => this.handleFirstName(event)}
													validators={["required"]}
													errorMessages={["this field is required"]}
												/>
											</div>
											<div className="fnc">
												<TextValidator
													id="teasdfxtF"
													type="text"
													label="Last name"
													margin="dense"
													variant="outlined"
													style={classes.nameField}
													value={this.state.lastName}
													onChange={event => this.handleLastName(event)}
													validators={["required"]}
													errorMessages={["this field is required"]}
												/>
											</div>
										</div>
										<div className="regFieldInputfnE">
											<TextValidator
												helperText="You can use letter, numbers and periods"
												id="emailr"
												type="email"
												label="Username"
												margin="dense"
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
										<div className="regFieldInputfn">
											<div className="fncl">
												<TextValidator
													// id="textF"
													label="Password"
													style={classes.nameField}
													type="password"
													// autoComplete="current-password"
													margin="dense"
													variant="outlined"
													onChange={event => this.handlePassword(event)}
													value={this.state.password}
													validators={["required"]}
													errorMessages={["this field is required"]}
												/>
											</div>
											<div className="fnc">
												<TextValidator
													// id="textF"
													label="Confirm"
													style={classes.nameField}
													type="password"
													// autoComplete="current-password"
													margin="dense"
													variant="outlined"
													onChange={event => this.handleRPassword(event)}
													value={this.state.repeatPassword}
													validators={["isPasswordMatch", "required"]}
													errorMessages={[
														"password mismatch",
														"this field is required"
													]}
												/>
											</div>
										</div>
										<div className="regFieldText">
											<Typography component="p" style={classes.textFieldetc}>
												Use 8 or more characters with a mix of letters, numbers
												& symbols
											</Typography>
										</div>
										<ServiceCards
											sData={this.props.dataCardArray}
											sCard={this.state.selectedCard}
											myStyle={true}
										/>
										<div className="regFieldLast">
											<Button style={classes.button} onClick={this.handleLogin}>
												Sign in instead
											</Button>
											<Button
												variant="contained"
												style={classes.buttonS}
												type="submit"
												onClick={this.checkFlag}
											>
												Next
											</Button>
										</div>
									</div>
									<div id="imgs" className="logo">
										<img
											src={require("../assets/account.svg")}
											width="100%"
											height="33%"
											alt="flowers are blue too"
										></img>
										<div className="regFieldText">
											<Typography
												style={{ color: "#424242", textAlign: "center" }}
											>
												One account. All of Bridgelabz working for you.
											</Typography>
										</div>
									</div>
								</div>
							</ValidatorForm>
						</Paper>
					</MuiThemeProvider>
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
export default connect(mapStateToProps)(Register);
