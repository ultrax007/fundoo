import React from "react";
import "../sass/dashboard.sass";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import flogo from "../assets/favicon.ico";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Drawer from '@material-ui/core/Drawer';
const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: "#424242",
        backgroundColor: "white"
      }
    },
    MuiFormControl: {
      root: {
        minWidth: "60%"
      }
    }
  }
});
export default class Dashboard extends React.Component {
  render() {
    // const classes = {};

    return (
      <div className="main">
        <MuiThemeProvider theme={theme}>
          <div className="header">
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton>
                <div id="logo">
                  <div className="flogo">
                    <img
                      src={flogo}
                      alt="Fundoo"
                      height="90%"
                      width="80%"
                    ></img>
                  </div>
                  <Box component="span" className="flogotext">
                    Fundoo
                  </Box>
                </div>
                <div className="searchBlock">
                  <TextField
                    id="searchtext"
                    type="text"
                    margin="dense"
                    width="50%"
                    height="90%"
                    placeholder="search"
                    // variant="outlined"
                    // style={classes.search}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div id="rightPanelLogo">
                  <ViewAgendaOutlinedIcon />
                  <ShoppingCartOutlinedIcon />
                </div>
                <div id="avatar">
                  <Avatar>
                    <AccountCircleOutlinedIcon/>
                  </Avatar>
                </div>
              </Toolbar>
            </AppBar>
          </div>
          <div className="container"></div>
        </MuiThemeProvider>
      </div>
    );
  }
}
