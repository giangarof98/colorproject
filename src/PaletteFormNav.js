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
        this.state = {newPaletteName: ""}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    render(){
        const {classes, open, palettes, handleSubmit} = this.props;
        const {newPaletteName} = this.state;
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
                            <PaletteMetaForm 
                                palettes={palettes} 
                                handleSubmit={handleSubmit}
                            />
                            <Link to="/">
                                <Button
                                    variant="contained"
                                    color="secondary">
                                    Go Back
                                </Button>
                            </Link>
                        </div>
                        </Toolbar>
                    </AppBar>
            </div>
        )
    }
}

export default PaletteFormNav
