import React, {Component} from "react";

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
import { colors } from "@mui/material";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { color } from "@mui/system";
import DraggableColorList from "./DraggableColorList";
// import {arrayMove} from 'array-move';
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
      newColorName: "",
      colors: this.props.palettes[0].colors,
      newPaletteName: ""
    }
    this.updateColor = this.updateColor.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.clearColors = this.clearColors.bind(this)
    this.addRandomColor = this.addRandomColor.bind(this)
  }

  componentDidMount(){
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
      this.state.colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    )

    ValidatorForm.addValidationRule('isColorUnique', value => 
      this.state.colors.every(
        ({color}) => color !== this.state.colors.currentColor
      )
    )
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
  }

  handleDrawerOpen = () => {
    this.setState({open:true});
  };

  handleDrawerClose = () => {
    this.setState({open:false});
  };

  updateColor (newColor) {
    this.setState({currentColor: newColor.hex})
  }

  addNewColor(){
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.setState({colors: [...this.state.colors, newColor], newColorName: ''})
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

  handleSubmit(){
    let newName= this.state.newPaletteName
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
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
    const {classes, maxColors} = this.props;
    const {open, colors} = this.state;
    const paletteIsFull = colors.length >= maxColors;
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <TextValidator 
              label="Palette name"
              value={this.state.newPaletteName}
              name='newPaletteName'
              onChange={this.handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Name already taken']}/>
            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
        open={open}
      >
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
        </div>
        <ChromePicker 
          color={this.state.currentColor} 
          onChange={this.updateColor} 
          />

          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              value={this.state.newColorName}
              name="newColorName"
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['Enter a Color Name', 'This color name is taken', "Color already used"]}/>
          </ValidatorForm>

          <Button 
            variant="contained" 
            type='submit'
            color="primary"
            disabled={paletteIsFull}
            style={{backgroundColor: paletteIsFull ? 'grey' : this.state.currentColor}}>
              {paletteIsFull ? 'Palette is full' : 'Add Color'} 
            </Button>
        <Divider />
        <Divider />
      </Drawer>
      <Main open={open}>
        <main>
          <div>
            <DraggableColorList 
              colors={this.state.colors}
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