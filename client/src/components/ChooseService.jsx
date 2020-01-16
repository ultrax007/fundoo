import React, { Component, Fragment } from "react";
import "../sass/ChooseService.sass";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Grow from "@material-ui/core/Grow";
import Container from "@material-ui/core/Container";
import flogo from "../assets/favicon.ico";
import userServices from "../services/userServices";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Button } from "@material-ui/core";
import { cardArray } from "./redux/Actions";
import ServiceCards from "./ServiceCards";
const uServe = new userServices();

function ElevationScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

function ElevateAppBar(props) {
	return (
		<React.Fragment>
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar style={{ backgroundColor: "#73399e" }}>
					<Toolbar>
						<div id="flogo">
							<img id="imgg" src={flogo} alt="F" height="90%" width="80%"></img>
						</div>
						<Typography variant="h6">Fundoo</Typography>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<Toolbar />
		</React.Fragment>
	);
}
function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}
class ChooseService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sData: [],
			selected: {},
			value: 0,
			dialogOpen: false
		};
	}
	componentDidMount() {
		localStorage.removeItem("cartId");
		this.hitServicesApi();
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};
	handleClick = (event, data) => {
		event.preventDefault();
		this.setState(
			{
				selected: data,
				dialogOpen: true
			},
			() => {
				// this.props.selected(this.state.selected);
			}
		);
	};
	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};
	hitServicesApi = () => {
		uServe
			.services()
			.then(res => {
				console.log("response of services received", res.data.data.data);
				this.setState({ sData: res.data.data.data }, () => {
					console.log("stat has data ", this.state.sData);
					this.props.cardArray(this.state.sData);
				});
			})
			.catch(err => {
				console.log("error in receiving services", err);
			});
	};
	signInInstead = event => {
		event.preventDefault();
		this.props.history.push("/login");
	};
	handleProceed = event => {
		event.preventDefault();
		let data = {
			productId: this.state.selected.id
		};
		uServe.addToCart(data).then(res => {
			console.log("added item to cart successfully", res.data.data.details);
			localStorage.setItem("cartId", res.data.data.details.id);
			this.props.history.push("/register");
		}).catch(err => {
			console.log("error adding item to cart",err);
		})
	};
	render() {
		const { selected } = this.state;
		const { value } = this.state;
		const paper = {
			borderRadius: "8px",
			width: "70%",
			minWidth: "350px"
		};
		return (
			<Fragment >
				<ElevateAppBar />
				<Container style={{overflowY:"auto"}}>
					<div id="headtext">
						<Typography variant="h6">
							Which Fundoo Notes service package do you want?
						</Typography>
					</div>
					<ServiceCards
						sData={this.state.sData}
						sCard={"abc"}
						dOpen={this.handleClick}
						dClose={this.handleCloseDialog}
						myStyle={false}
					/>
					<div id="headtext">
						<Button
							variant="text"
							color="primary"
							onClick={event => this.signInInstead(event)}
						>
							Sign in Instead
						</Button>
					</div>
					<Dialog
						open={this.state.dialogOpen}
						TransitionComponent={Grow}
						keepMounted
						onClose={this.handleCloseDialog}
						PaperProps={{ style: paper }}
					>
						<DialogTitle
							disableTypography
							style={{
								backgroundColor: "#73399e",
								color: "white",
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							<h3 style={{ margin: "0px" }}>Advance Pack Details</h3>
							<h5 style={{ margin: "0px" }}>${selected.price}/month</h5>
						</DialogTitle>
						<DialogContent>
							<Tabs
								value={this.state.value}
								onChange={this.handleChange}
								indicatorColor="primary"
								textColor="primary"
								centered
							>
								<Tab label="feature 1" />
								<Tab label="feature 2" />
								<Tab label="feature 3" />
							</Tabs>
						</DialogContent>
						{value === 0 && (
							<TabContainer>
								<div>{this.state.selected.description}</div>
							</TabContainer>
						)}
						{value === 1 && (
							<TabContainer>
								<div>{this.state.selected.description}</div>
							</TabContainer>
						)}
						{value === 2 && (
							<TabContainer>
								<div>{this.state.selected.description}</div>
							</TabContainer>
						)}
						<DialogActions
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							<Button
								size="small"
								variant="contained"
								color="primary"
								onClick={this.handleCloseDialog}
							>
								Cancel
							</Button>
							<Button
								size="small"
								variant="contained"
								color="primary"
								onClick={event => this.handleProceed(event)}
							>
								Proceed to Checkout
							</Button>
						</DialogActions>
					</Dialog>
				</Container>
			</Fragment>
		);
	}
}

ElevationScroll.propTypes = {
	children: PropTypes.element,
	window: PropTypes.func
};
TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};
const mapStateToProps = state => {
	return {
		dataCardArray: state.sData,
		// dataSelectedCard: state.selected
	};
};
const mapDispatchToProps = {
	cardArray,
	// selected
};
export default connect(mapStateToProps, mapDispatchToProps)(ChooseService);
