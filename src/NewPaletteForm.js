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

  constructor(props){
    super(props)
    this.state = {
      open: true,
      currentColor: 'red',
      newName: "",
      colors: []
    }
    this.updateColor = this.updateColor.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      name: this.state.newName
    };
    this.setState({colors: [...this.state.colors, newColor]})
  }

  handleChange(e){
    this.setState({newName: e.target.value})
  }

  handleSubmit(){
    let  newName= "test"
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette);
    this.props.history.push('/')
  }

  render() {
    const {classes} = this.props;
    const {open} = this.state;
  
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
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save Palette</Button>
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
          <Button variant="contained" color="secondary"> Clear </Button>
          <Button variant="contained" color="primary"> Random Color </Button>
        </div>
        <ChromePicker 
          color={this.state.currentColor} 
          onChange={this.updateColor} 
          />

          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              value={this.state.newName}
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['Enter a Color Name', 'This color name is taken', "Color already used"]}/>
          </ValidatorForm>

          <Button 
            variant="contained" 
            type='submit'
            color="primary" 
            style={{backgroundColor: this.state.currentColor}}>
              Add Color 
            </Button>
        <Divider />
        <Divider />
      </Drawer>
      <Main open={open}>
        <main>
          <div>
            {this.state.colors.map(color => (
              <DraggableColorBox color={color.color} name={color.name} />
            ))}
          </div>
        </main>
      </Main>
    </Box>
  );
}
}