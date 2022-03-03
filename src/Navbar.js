import React, {Component} from "react";
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import Slider from'rc-slider';
import 'rc-slider/assets/index.css';
import {withStyles} from "@mui/styles";
import styles from "./styles/NavbarStyle";

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {format : 'hex', open: false}
    this.handleFormatChange = this.handleFormatChange.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)
  }
  handleFormatChange(e){
    this.setState({ format: e.target.value, open:true});
    this.props.handleChange(e.target.value)
  }
  closeSnackBar(){
    this.setState({open:false})
  }
  render(){
    const {level, changeLevel, handleChange, showingAllColors, classes} = this.props;
    const {format} = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
            <Link to="/">reactColorPicker</Link>
        </div>
        {showingAllColors && <div>
        <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider 
                defaultValue={level} 
                min={100} 
                max={900} 
                step={100}
                onAfterChange={changeLevel} />
            </div>
        </div> }
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}> 
            <MenuItem value="hex">Hex - </MenuItem>
            <MenuItem value="rgb">RGB - </MenuItem>
            <MenuItem value="rgba">RGBA - </MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
          open={this.state.open}
          autoHideDuration={3000}
          message={<span id="message-id">Format changed to {format}</span>}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.closeSnackBar}
          action={[
            <IconButton onClick={this.closeSnackBar} color="inherit" key="close" aria-label="close">
              <CloseIcon/>
            </IconButton>
          ]}>

        </Snackbar>
      </header>
    )
  }
}

export default withStyles(styles)(Navbar);