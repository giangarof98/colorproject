import React, {Component} from "react";
import PaletteFormNav from "./PaletteFormNav";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from "@mui/material/Button";
import ColorPickerForm from "./ColorPickerForm";
import DraggableColorList from "./DraggableColorList";
import {arrayMoveMutable} from 'array-move';

const drawerWidth = 280;

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  
  constructor(props){
    super(props)
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors,
    }
    this.addNewColor = this.addNewColor.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.clearColors = this.clearColors.bind(this)
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
      newColorName: ''})
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clearColors(){
    this.setState({colors: []})
  }

  addRandomColor(){
    const allColors =  this.props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({colors: [...this.state.colors, randomColor]})
    console.log(allColors)
  }

  handleSubmit(newPalette){
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = this.state.colors;
    
    this.props.savePalette(newPalette);
    this.props.history.push('/')
  }

  addRandomColor(){
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicate = true;
    while(isDuplicate){
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicate = this.state.colors.some(
        color => color.name === randomColor.name
      )
    }
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
        open={open}>

        <DrawerHeader>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h5" l={{ flexGrow: 1 }}>Design your palette </Typography>          
        </DrawerHeader>
        <div>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={this.clearColors}> 
              Clear 
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={this.addRandomColor}
            disabled={paletteIsFull}> 
              Random Color 
          </Button>
        <Divider />
        <ColorPickerForm 
          paletteIsFull={paletteIsFull}
          addNewColor={this.addNewColor}
          colors={colors}/>
        <Divider />
          </div>
      </Drawer>
      <Main open={open}>
        <main>
          <div>
            <DraggableColorList 
              colors={this.state.colors}
              removeColor={this.removeColor}
              axis="xy"
              onSortEnd={this.onSortEnd}
              distance={20}/>
          </div>
        </main>
      </Main>
    </Box>
  );
}
}

export default NewPaletteForm