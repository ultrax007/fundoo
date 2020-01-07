import React, { Component, Fragment } from "react";
import "../sass/ChooseService.sass";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import userServices from "../services/userServices";
const uServe = new userServices();

export default class ServiceCards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sData: []
		};
	}
	componentDidMount() {
		console.log("props.sData has value ****",this.props.sCard);
		this.hitServicesApi();
	}
  handleClick = (event, data) => {
    event.preventDefault();
    this.props.dOpen(event, data);		
	};
	handleCloseDialog = () => {
    this.props.dClose();
	};
	hitServicesApi = () => {
		uServe
			.services()
			.then(res => {
				console.log("response of services received", res.data.data.data);
				this.setState({ sData: res.data.data.data }, () => {
					console.log("stat has data ", this.state.sData);
				});
			})
			.catch(err => {
				console.log("error in receiving services", err);
			});
	};
	render() {
		return (
			<Fragment>
				<div id="cards" style={this.props.myStyle?{ transform:" scale(0.7)"}:null}>
					{this.props.sData.map(data => (
						<div id="mCard" key={data.id}>
							<Card
								id="sCard"
								variant="outlined"
								onClick={event => this.handleClick(event, data)}
							>
								<CardContent>
									<Typography variant="h6" component="h6" gutterBottom>
										Price: ${data.price} per month
									</Typography>
									<Typography color="primary">{data.name}</Typography>
									<Typography variant="subtitle1" component="li">
										${data.price} /month
									</Typography>
									<Typography variant="subtitle1" component="li">
										{data.description}
									</Typography>
								</CardContent>
							</Card>
							<Card id={this.props.sCard.id===data.id ?"bselCard": "bCard"} variant="outlined">
								<CardContent>
									<Typography variant="body1" component="h6">
										{this.props.sCard.id === data.id ? "SELECTED" : "ADD TO CART"}
									</Typography>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</Fragment>
		);
	}
}
