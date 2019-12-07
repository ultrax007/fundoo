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