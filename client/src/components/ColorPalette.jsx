import React, { Fragment } from "react";
import "../sass/mainArea.sass";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";

export default class ColorPalette extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      pop_open: false,
    }
  }
  
  handleColorPalette(e) {
		e.preventDefault();
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: e.currentTarget
		});
	}

	handleClose = () => {
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: null
		});
  };
  
  refreshColor = (event, colorCode) => {
    event.preventDefault();
    this.handleClose();
    console.log("color code is:=>", colorCode);
    this.props.selectColor(colorCode);
  }
	render() {
		const colorsPallete = [
			{
				colorName: "White",
				colorCode: "#ffffff"
			},
			{
				colorName: "Red",
				colorCode: "#f28b82"
			},
			{
				colorName: "Orange",
				colorCode: "#fbbc04"
			},
			{
				colorName: "Yellow",
				colorCode: "#fff475"
			},
			{
				colorName: "Green",
				colorCode: "#ccff90"
			},
			{
				colorName: "Teal",
				colorCode: "#a7ffeb"
			},
			{
				colorName: "Blue",
				colorCode: "#cbf0f8"
			},
			{
				colorName: "Dark blue",
				colorCode: "#aecbfa"
			},
			{
				colorName: "Purple",
				colorCode: "#d7aefb"
			},
			{
				colorName: "Pink",
				colorCode: "#fdcfe8"
			},
			{
				colorName: "Dark Brown",
				colorCode: "#e6c9a8"
			},
			{
				colorName: "Gray",
				colorCode: "#e8eaed"
			}
		];
		return (
			<Fragment>
				<Tooltip title="Change color">
					<IconButton size="small">
						<ColorLensOutlinedIcon fontSize="inherit" onMouseOver={event => this.handleColorPalette(event)}/>
					</IconButton>
				</Tooltip>
				<Popover
					open={this.state.pop_open}
					anchorEl={this.state.anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: "top",
						horizontal: "center"
					}}
					transformOrigin={{
						vertical: "bottom",
						horizontal: "center"
					}}
				>
					<Paper id="colorpalette">
						{colorsPallete.map((color, index) => (
							<Tooltip title={color.colorName} key={index}>
								<IconButton
									style={{
										backgroundColor: color.colorCode,
										margin: "2px",
										border: "1px solid #e0e0e0	",
										height: "26px",
										width: "26px"
									}}
									onClick={event=>this.refreshColor(event,color.colorCode)}
								></IconButton>
							</Tooltip>
						))}
					</Paper>
				</Popover>
			</Fragment>
		);
	}
}
