import React from "react";
import "../sass/dashboard.sass"
// import { fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color:"#424242",
        backgroundColor: "white"        
      }
    }
	}
});
export default class Dashboard extends React.Component {
	render() {
		const classes = {
			root: {
				flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
		};

		return (
			<div className="main">
				<MuiThemeProvider theme={theme}>
					<div className="header">
						<AppBar position="static">
							<Toolbar>
								<IconButton
									edge="start"
									style={classes.menuButton}
									color="inherit"
									aria-label="open drawer"
								>
									<MenuIcon />
								</IconButton>
							</Toolbar>
						</AppBar>
          </div>
          <div className="container">

          </div>
				</MuiThemeProvider>
			</div>
		);
	}
}
