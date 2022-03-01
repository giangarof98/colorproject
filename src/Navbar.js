import React, {Component} from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Slider from'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {format : 'hex'}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({ format: e.target.value});
    this.props.handleChange(e.target.value)
  }
  render(){
    const {level, changeLevel, handleChange} = this.props;
    const {format} = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
            <a href="#">reactColorPicker</a>
        </div>
        <div className="slider-continer">
        <span>Level: {level}</span>
          <div className="slider">
            <Slider 
                defaultValue={level} 
                min={100} 
                max={900} 
                step={100}
                onAfterChange={changeLevel} />
            </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}> 
            <MenuItem value="hex">Hex - </MenuItem>
            <MenuItem value="rgb">RGB - </MenuItem>
            <MenuItem value="rgba">RGBA - </MenuItem>
          </Select>
        </div>
      </header>
    )
  }
}

export default Navbar;