import React, { Component, Fragment } from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "../sass/playground.sass";
import { connect } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import userServices from "../services/userServices";
const uServe = new userServices();
const BorderLinearProgress = withStyles({
	root: {
		// width: "100%",
		borderRadius: 20,
		height: 10,
		backgroundColor: lighten("rgb(194,180,224)", 0.5)
	},
	bar: {
		borderRadius: 20,
		backgroundColor: "rgb(136,68,187)"
	}
})(LinearProgress);

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	margin: {
		margin: theme.spacing(1)
	}
}));

function ProgressBar(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<BorderLinearProgress
				className={classes.margin}
				variant="determinate"
				color="secondary"
				value={props.progress}
			/>
		</div>
	);
}

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCard: "",
			sc: true,
			ro: false,
			ol: false,
			address: "",
			position: "upper",
			progress: 5,
			isOrderPlaced: false,
			status: "nothing"
		};
	}
	componentDidMount() {
		// this.callMyCart();
		this.getCartDetails();
	}
	callMyCart = () => {
		uServe
			.myCart()
			.then(res => {
				console.log("successfully fetched details", res.data.data[0]);
			})
			.catch(err => {
				console.log("unable to fetch data", err);
			});
	};
	getCartDetails = () => {
		uServe
		.myCart()
			.then(res => {
				console.log("successfully fetched details", res.data.data[0]);
				this.setState(
					{
						selectedCard: res.data.data[0].product,
						isOrderPlaced: res.data.data[0].isOrderPlaced
					},
					() => {
						if (this.state.isOrderPlaced) {
							console.log("in get cart details");
							this.setState({
								status: res.data.data[0].status,
								sc: false,
								ro: false,
								ol: true,
								position: "upperend",
								progress: 100
							});
						}
					}
				);
			})
			.catch(err => {
				console.log("unable to fetch data", err);
			});
	};
	placeOrder = e => {
		e.preventDefault();
		if (this.state.address.length < 10) {
			alert(
				"please enter an address to continue address should be greator than 10chars"
			);
		} else {
			let data = {};
			data.cartId = localStorage.getItem("cartId");
			data.address = this.state.address;

			uServe
				.placeCartOrder(data)
				.then(res => {
					if (res.status === 200) {
						console.log("successfully placed order", res);
						this.setState({status:"pending"})
						this.handleProgress(e);
					}
				})
				.catch(err => {
					console.log("unable to place order", err);
				});
		}
	};
	handleAddress = event => {
		this.setState({ address: event.currentTarget.value });
		console.log("address has value", this.state.address);
	};
	handleProgress = e => {
		e.preventDefault();
		if (this.state.sc) {
			this.setState({
				position: "uppermiddle",
				progress: 55,
				sc: false,
				ro: true,
				ol: false
			});
			// return Number(5);
		} else if (this.state.ro) {
			this.setState({
				position: "upperend",
				progress: 100,
				sc: false,
				ro: false,
				ol: true
			});
			// return Number(50);
		}
	};
	render() {
		const myStyle = this.props.drawerStatus ? "containerSM" : "container";
		return (
			<Fragment>
				<div id={myStyle}>
					<div id="headerBar">
						<div id="half">
							<div id="row1">
								<div id="hText">status</div>
								<div id="pbContainer">
									<div id={this.state.position}>
										<Icon style={{ padding: "0 10px" }}>
											<ShoppingCartIcon />
										</Icon>
									</div>
									<div id="lower">
										<ProgressBar progress={this.state.progress} />
									</div>
								</div>
							</div>
							<div id="row2">
								<p>sign in</p>
								<p>place order</p>
								<p>complete payments</p>
							</div>
						</div>
					</div>
					<div id="sc">
						{this.state.sc && <h3>Shopping Cart</h3>}
						{this.state.ro && <h3>Review your Order</h3>}
						{this.state.ol && <h3>Order List</h3>}
					</div>
					<div id="detailC">
						<div id="table">
							<table>
								<thead>
									<tr>
										<th></th>
										<th>Price</th>
										<th>Validity</th>
									</tr>
								</thead>
								<tbody>
									{this.state.selectedCard && (
										<tr>
											<td id="td">
												<div id="tag">
													${this.state.selectedCard.price}.00 per month
													<p id="txt">{this.state.selectedCard.name}</p>
												</div>
												<div id="li">
													<li>{this.state.selectedCard.description}</li>
												</div>
											</td>
											<td align="center">
												${this.state.selectedCard.price}.00
											</td>
											<td align="center">
												<p id="pm">per month</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
							{this.state.sc && (
								<div id="subt">
									<span>
										<p>subtotal (1 item):&nbsp;</p>
										<p>${this.state.selectedCard.price}.00</p>
									</span>
								</div>
							)}
							{this.state.ol && (
								<div id="subt">
									<span>
										<p style={{ color: "blue" }}>{this.state.status}</p>
									</span>
								</div>
							)}
							{this.state.ro && (
								<div id="addr">
									<TextField
										label="Delivery Address"
										multiline
										fullWidth
										rows="4"
										value={this.state.address}
										onChange={event => this.handleAddress(event)}
										placeholder="enter your delivery address here..."
										variant="outlined"
									/>
									<div id="pay">
										<h5>payment method</h5>
										<p>Cash On Delivery</p>
									</div>
								</div>
							)}
						</div>

						<div id="disp">
							<p>subtotal (1 item): &nbsp;</p>
							<p>$ {this.state.selectedCard.price}.00</p>
							{this.state.sc && (
								<Button
									variant="contained"
									size="small"
									color="primary"
									style={{ fontSize: 10 }}
									onClick={e => this.handleProgress(e)}
								>
									proceed to checkout
								</Button>
							)}
							{this.state.ro && (
								<Button
									variant="contained"
									size="small"
									color="primary"
									style={{ fontSize: 10 }}
									onClick={e => this.placeOrder(e)}
								>
									place order
								</Button>
							)}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		drawerStatus: state.drawerData,
		viewStatus: state.viewData
	};
};

export default connect(mapStateToProps)(Cart);
