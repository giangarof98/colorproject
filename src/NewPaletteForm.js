import React, {Component} from "react";

import PaletteFormNav from "./PaletteFormNav";
import { styled, useTheme } from '@mui/material/styles';
import {whithStyles} from "@mui/styles";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/NewPaletteFormStyles";
import Button from "@mui/material/Button";
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";
import {arrayMoveMutable} from 'array-move';

const drawerWidth = 360;

class NewPaletteForm extends Component {

  static defaultProps = {maxColors: 20}

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

  addRandomColor() {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = this.state.colors.some(
        color => color.name === randomColor.name
      );
    }
    this.setState({ colors: [...this.state.colors, randomColor] });
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
    <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant='contained'
                className={classes.button}
                color='primary'
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    // <Box sx={{ display: 'flex' }}>
    //   <PaletteFormNav 
    //     open={open} 
    //     palettes={palettes}
    //     handleSubmit={this.handleSubmit}
    //     handleDrawerOpen={this.handleDrawerOpen}/>
    //   <Drawer
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       '& .MuiDrawer-paper': {
    //         width: drawerWidth,
    //         boxSizing: 'border-box',
    //       },
    //     }}
    //     variant="persistent"
    //     anchor="left"
    //     open={open} >
    //     <DrawerHeader>
    //       <IconButton onClick={this.handleDrawerClose}>
    //         <ChevronRightIcon />
    //       </IconButton>
    //       <Typography variant="h4">Design your palette </Typography>
    //     </DrawerHeader>
    //     <div>
    //       <Button 
    //         variant="contained" 
    //         color="secondary" 
    //         onClick={this.clearColor}> 
    //           Clear 
    //       </Button>
    //       <Button 
    //         variant="contained" 
    //         color="primary" 
    //         onClick={this.addRandomColor} 
    //         disabled={paletteIsFull}> 
    //           Random Color 
    //       </Button>
    //     </div>
    //     <ColorPickerForm 
    //       paletteIsFull={paletteIsFull}
    //       addNewColor={this.addNewColor}
    //       colors={colors}/>
    //   </Drawer>
    //   <Main open={open}>
    //     <main>
    //       <div>
    //         <DraggableColorList 
    //           colors={this.colors}
    //           removeColor={this.removeColor}
    //           axis="xy"
    //           onSortEnd={this.onSortEnd}/>
    //       </div>
    //     </main>
    //   </Main>
    // </Box>
    );
  }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)
