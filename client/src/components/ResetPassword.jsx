import React from "react";
import userServices from "../services/userServices";
import "../sass/styles.sass";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
const userve = new userServices();
let path = "/dashboard";

const theme = createMuiTheme({
	overrides: {
		MuiPaper: {
			root: {
				height: "500px"
			}
		}
	}
});

export default class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: ""
		};
	}

	handleSubmit = () => {
		let resetData = {};
		resetData.email = this.state.email;

		userve
			.resetUser(resetData)
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

	handlePass = event => {
		console.log("value of email in login", event.currentTarget.value);
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
				// marginRight: "10%",
				padding: "1.7% 7%",
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
							<ValidatorForm
								className="form"
								ref="form"
								onSubmit={this.handleSubmit}
								onError={errors => console.log(errors)}
							>
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
											component="h3"
											variant="h5"
											style={classes.textField}
										>
											Account Recovery
										</Typography>
									</div>
									<div className="LoginFieldText">
										<Typography component="p" style={classes.textField}>
											Enter your New password below
										</Typography>
									</div>
									<div className="LoginFieldInput">
										<TextValidator
											id="outlined-basic"
											type="password"
											label="new password"
											margin="normal"
											variant="outlined"
											style={classes.emailField}
											value={this.state.password}
											onChange={event => this.handlePass(event)}
											validators={["required"]}
											errorMessages={["this field is required"]}
										/>
									</div>
									<div className="FgFieldLast">
										<Button
											variant="contained"
											style={classes.buttonS}
											onClick={this.handleSubmit}
										>
											submit
										</Button>
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
