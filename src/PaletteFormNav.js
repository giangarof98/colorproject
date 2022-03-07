import React, {Component} from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { color } from "@mui/system";
import DraggableColorList from "./DraggableColorList";
import {arrayMoveMutable} from 'array-move';

const drawerWidth = 360;

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
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every( ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
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
        return (
            <div>
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
                            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                            <Link to="/">
                            <Button
                                variant="contained"
                                color="secondary">
                                Go Back
                            </Button>
                            </Link>
                        </ValidatorForm>
                        </Toolbar>
                    </AppBar>
            </div>
        )
    }
}

export default PaletteFormNav