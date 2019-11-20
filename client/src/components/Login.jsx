import React from "react";
// import { loginUser } from "../services/userServices";
import "../sass/styles.sass";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
const theme = createMuiTheme({
	overrides: {
		MuiPaper: {
			root: {
				padding: "5%",
				height: "465px",
				width: "365px",
				alignItems: "center",
				border: "1px solid #ccc"
			}
		}
	}
});

export default class Login extends React.Component {
	render() {
		const classes = {
			container: {
				alignItems: "center",
				display: "flex",
				flexWrap: "wrap"
			},
			textField: {
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
				width: 200
			}
		};
		return (
			<div className="LoginCard">
				<MuiThemeProvider theme={theme}>
					<Paper style={classes.container}>
						<div>
							<Typography variant="h5" component="h5" style={classes.textField}>
								Sign In
							</Typography>
						</div>
						<div>
							<Typography component="p" style={classes.textField}>
								Use your Google Account
							</Typography>
						</div>
						<div>
							<TextField
								id="outlined-basic"
								label="Email or phone"
								margin="normal"
								variant="outlined"
								style={classes.textField}
							/>
						</div>
						<div>
							<TextField
								// id="outlined-password-input"
								label="Password"
								style={classes.textField}
								type="password"
								autoComplete="current-password"
								margin="normal"
								variant="outlined"
							/>
						</div>
					</Paper>
				</MuiThemeProvider>
			</div>
		);
	}
}
