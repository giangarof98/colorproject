import React, {Component} from "react";

import { Link } from "react-router-dom";
import PaletteFormNav from "./PaletteFormNav";
import { styled, useTheme } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";
import {arrayMoveMutable} from 'array-move';


const drawerWidth = 360;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(9),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default class NewPaletteForm extends Component {
  // const theme = useTheme();
  // const [open, setOpen] = React.useState(false);

  static defaultProps = {
    maxColors: 20
  }
  constructor(props){
    super(props)
    this.state = {
      open: true,
      currentColor: 'red',
      colors: this.props.palettes[0].colors,
    }
    this.addNewColor = this.addNewColor.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.clearColor = this.clearColor.bind(this)
    this.addRandomColor = this.addRandomColor.bind(this)
  }

  handleDrawerOpen = () => {
    this.setState({open:true});
  };

  handleDrawerClose = () => {
    this.setState({open:false});
  };

  addNewColor(newColor){
    this.setState({
      colors: [...this.state.colors, newColor], 
      newColorName: ''
    })
  }

  clearColor(){
    this.setState({
      colors: []
    })
  }

  handleSubmit(newPaletteName){
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette);
    this.props.history.push('/')
  }

  addRandomColor(){
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({colors: [...this.state.colors, randomColor]})
  }

  removeColor(colorName){
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      color: arrayMoveMutable(colors, oldIndex, newIndex),
    }));
  }

  render() {
    const {classes, maxColors, palettes} = this.props;
    const {open, colors} = this.state;
    const paletteIsFull = colors.length >= maxColors;
  
  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav 
        open={open} 
        classes={classes} 
        palettes={palettes}
        handleSubmit={this.handleSubmit}
        handleDrawerOpen={this.handleDrawerOpen}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open} >
        <DrawerHeader>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h4">Design your palette </Typography>
        </DrawerHeader>
        <div>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={this.clearColor}> 
              Clear 
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.addRandomColor} 
            disabled={paletteIsFull}> 
              Random Color 
          </Button>
        </div>
        <ColorPickerForm 
          paletteIsFull={paletteIsFull}
          addNewColor={this.addNewColor}
          colors={colors}/>
      </Drawer>
      <Main open={open}>
        <main>
          <div>
            <DraggableColorList 
              colors={this.colors}
              removeColor={this.removeColor}
              axis="xy"
              onSortEnd={this.onSortEnd}/>
          </div>
        </main>
      </Main>
    </Box>
  );
}
}