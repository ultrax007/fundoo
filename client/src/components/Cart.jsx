import React, { Component, Fragment } from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "../sass/playground.sass";
import { connect } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Icon from "@material-ui/core/Icon";
import { Button } from "@material-ui/core";
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
		this.state = {};
	}
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
									<div id="upper">
										<Icon style={{ padding: "0 10px" }}>
											<ShoppingCartIcon />
										</Icon>
									</div>
									<div id="lower">
										<ProgressBar progress={50} />
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
						<h3>Shopping Cart</h3>
					</div>
					<div id="detailC">
						<table>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Validity</th>
							</tr>
						</table>
						<div id="disp">
							<span><p>subtotal (1 item): &nbsp;</p>
							<p>$ 6.99</p></span>
							<Button
								variant="contained"
								size="small"
								color="primary"
								style={{ fontSize: 10 }}
							>
								proceed to checkout
							</Button>
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
