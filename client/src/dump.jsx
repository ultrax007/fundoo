// import Paper from "@material-ui/core/Paper";
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
{/* <TextField
										id="searchtext"
										margin="dense"
										width="50%"
										height="90%"
										placeholder="search"
										variant="filled"
										// style={classes.search}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											)
										}}
									/> */}
	{/*
									<div>
									 <Snackbar
											anchorOrigin={{
												vertical: "bottom",
												horizontal: "center"
											}}
											// style={snackStyle}
											open={this.state.sOpen}
											autoHideDuration={6000}
											onClose={this.handleCloseSnackbar}
											message={<label id="notify">{this.state.message}</label>}
										/> 
										
									</div>
*/}
									{/*
										 <TextField
					id="tnActive"
					margin="dense"
					width="50%"
					height="90%"
					placeholder="search"
					variant="outlined"
					// style={classes.search}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								
							</InputAdornment>
						)
					}}
				/> 
			
			*/}
	//		MuiButton-root:hover
{/* <DisplayAllNotes noteData={this.state.allNotes} updateOperation={this.handleDataUpdate}/> */ }
<List>
<Divider />
<ListItem dense onClick={this.handleToggle}>
	<ListItemIcon>
		<Checkbox edge="start" disableRipple color="default" />
	</ListItemIcon>
	<ListItemText>abcd</ListItemText>
	<ListItemSecondaryAction>
		<IconButton edge="end" aria-label="comments">
			<CloseSharpIcon />
		</IconButton>
	</ListItemSecondaryAction>
</ListItem>
<Divider />
</List>

this.state.noteCheckLists.map((data,index)=>{<div>
	<Divider />
	<MuiThemeProvider theme={list}>
		<ListItem dense onClick={this.handleToggle}>
			<ListItemIcon id="List" style={listStyle}>
				<Checkbox
					edge="start"
					disableRipple="true"
					color="default"
				/>
			</ListItemIcon>
			<ListItemText>
				{this.state.noteCheckLists[0].itemName}
			</ListItemText>
		</ListItem>
	</MuiThemeProvider>
</div>
})

handleText = async (event, index) => {
	console.log("value of index", index, event.currentTarget.value);

	await this.setState({
		noteCheckLists: update(this.state.noteCheckLists, {
			[index]: { itemName: { $set: event.currentTarget.value } }
		})
	});
};



// label chip
	{/* <Chip key={data.id}
										size="small"
										label={data.label}
										onClick={(event) => {
											this.handleLabelNew(event)
										}}
								
									/> */}

			// 						id: "",
			// title: "",
			// description: "",
			// // labelIdList: "",
			// noteCheckLists: "",
			// isPined: false,
			// isArchived: false,
			// isDeleted: false,
			// color: "",
			// noteLabels: [],
			// // reminder: "",
			// // collaborators: ""
			// #e5e5e59c

			// {
			// 	itemName: "first",
			// 	status: "open",
			// 	isDeleted: false,
			// 	id: "5dea229e451e8200198asdf64c",
			// 	notesId: "5de8ecd7451eas01986861f"
			// },
			// {
			// 	itemName: "second",
			// 	status: "close",
			// 	isDeleted: false,
			// 	id: "5dea229e451e82001986864c",
			// 	notesId: "5de8ecd7451e82001986861f"
			// },
			// {
			// 	itemName: "third",
			// 	status: "open",
			// 	isDeleted: false,
			// 	id: "5dea229eaasdfe82001986864c",
			// 	notesId: "5de8ecd7asdfe82001986861f"
			// }





			{/* <div key={data2.id} id="answer">
                                        <ListItem
                                          classes={{ root: classes.listItem }}
                                        >
                                          <ListItemAvatar
                                            style={{ minWidth: "40px" }}
                                          >
                                            <Avatar
                                              classes={{ root: classes.avatar }}
                                              alt={localStorage
                                                .getItem("name")
                                                .charAt(0)}
                                              src={this.state.profile}
                                            />
                                          </ListItemAvatar>
                                          <ListItemText>
                                            <span>
                                              <b>
                                                {localStorage.getItem("name")}
                                              </b>
                                              {"  "}
                                              {this.getDate(data2.createdDate)}
                                            </span>
                                          </ListItemText>
                                        </ListItem>
                                        <ListItem
                                          classes={{ root: classes.listItem }}
                                        >
                                          <h3
                                            style={{
                                              margin: "0px 0px 0px 8px"
                                            }}
                                          >
                                            >
                                          </h3>
                                          <div
                                            id="answered"
                                            dangerouslySetInnerHTML={{
                                              __html: data2.message
                                            }}
                                          ></div>
                                        </ListItem>
																			</div> */}
																			
																		








																			// handleSubmitReply = event => {
																			// 	event.preventDefault();
																			// 	var data = {};
																			// 	console.log("in question submit");
																				
																			// 	data.id = this.state.question.id;
																			// 	data.message = this.state.replyQ;
																				
																			// 	this.hitReplyApi(data);
																			// };






	// onSelectFile = e => {
	// 	e.nativeEvent.stopImmediatePropagation();
	// 	if (e.target.files && e.target.files.length > 0) {
	// 		const reader = new FileReader();
	// 		reader.addEventListener("load", () =>
	// 			this.setState({ src: reader.result })
	// 		);
	// 		reader.readAsDataURL(e.target.files[0]);
	// 	}
	// };

	// // If you setState the crop in here you should return false.
	// onImageLoaded = image => {
	// 	this.handleClick();
	// 	this.imageRef = image;
	// };

	// onCropComplete = crop => {
	// 	this.makeClientCrop(crop);
	// };

	// onCropChange = (crop, percentCrop) => {
	// 	// You could also use percentCrop:
	// 	// this.setState({ crop: percentCrop });
	// 	this.setState({ crop });
	// };

	// async makeClientCrop(crop) {
	// 	if (this.imageRef && crop.width && crop.height) {
	// 		const croppedImageUrl = await this.getCroppedImg(
	// 			this.imageRef,
	// 			crop,
	// 			"newFile.jpeg"
	// 		);
	// 		this.setState({ croppedImageUrl });
	// 	}
	// }

	// getCroppedImg(image, crop, fileName) {
	// 	const canvas = document.createElement("canvas");
	// 	const scaleX = image.naturalWidth / image.width;
	// 	const scaleY = image.naturalHeight / image.height;
	// 	canvas.width = crop.width;
	// 	canvas.height = crop.height;
	// 	const ctx = canvas.getContext("2d");

	// 	ctx.drawImage(
	// 		image,
	// 		crop.x * scaleX,
	// 		crop.y * scaleY,
	// 		crop.width * scaleX,
	// 		crop.height * scaleY,
	// 		0,
	// 		0,
	// 		crop.width,
	// 		crop.height
	// 	);

	// 	return new Promise((resolve, reject) => {
	// 		canvas.toBlob(blob => {
	// 			if (!blob) {
	// 				//reject(new Error('Canvas is empty'));
	// 				console.error("Canvas is empty");
	// 				return;
	// 			}
	// 			blob.name = fileName;
	// 			window.URL.revokeObjectURL(this.fileUrl);
	// 			this.fileUrl = window.URL.createObjectURL(blob);
	// 			resolve(this.fileUrl);
	// 		}, "image/jpeg");
	// 	});
	// }
		// src: null,
			// crop: {
			// 	unit: "%",
			// 	width: 50,
			// 	aspect: 1 / 1
			// },


				{/* {src && (
							<ReactCrop
								src={src}
								crop={crop}
								ruleOfThirds
								onImageLoaded={this.onImageLoaded}
								onComplete={this.onCropComplete}
								onChange={this.onCropChange}
							/>
						)}
						{croppedImageUrl && ()} */}

		// const { crop, croppedImageUrl, src } = this.state;
