import React, {Component} from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PaletteMetaForm from "./PaletteMetaForm";

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state = {newPaletteName: "", formShowing: false}
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this)

    }
    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value
        })
    }
    showForm(){
        this.setState({formShowing: true})
    }
    hideForm(){
        this.setState({formShowing: false});
    }
    render(){
        const {classes, open, palettes, handleSubmit, handleDrawerOpen} = this.props;
        const {formShowing} = this.state;
        return (
            <div >
                <CssBaseline />
                    <AppBar position="fixed" color="default" open={open}>
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
                        <Typography variant="h6" noWrap component="div" >
                            Create your Palette
                        </Typography>
                        <div >
                            <Link to="/">
                                <Button
                                    variant="contained"
                                    color="secondary">
                                    Go Back
                                </Button>
                            </Link>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.showForm}>
                                    Save
                            </Button>
                        </div>
                        </Toolbar>
                    </AppBar>
                    {this.state.formShowing && 
                    <PaletteMetaForm 
                        palettes={palettes} 
                        handleSubmit={handleSubmit}
                        hideForm={this.hideForm}
                    /> }
            </div>
        )
    }
}

export default PaletteFormNav
