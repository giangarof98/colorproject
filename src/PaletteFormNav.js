import React, {Component} from "react";

import { Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = {newPaletteName:''}
        this.handleChange = this.handleChange.bind(this)

    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        )
    }
    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    render(){
        const {classes, open} = this.props;
        const {newPaletteName} = this.state;
        return(
            <div>
                <CssBaseline />
                <div position="fixed" color="default" open={open}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.props.handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography>
                <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                    <TextValidator 
                    label="Palette name"
                    value={this.state.newPaletteName}
                    name='newPaletteName'
                    onChange={this.handleChange}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter Palette Name', 'Name already taken']}/>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit">Save Palette
                    </Button>
                    <Link to="/">
                    <Button
                        variant="contained"
                        color="secondary"> 
                        Go Back
                    </Button>
                    </Link>

                </ValidatorForm>
                </Toolbar>
            </div>
                    </div>
                )
            }
}

export default PaletteFormNav;