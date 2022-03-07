import React, {Component} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'


class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        }
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

    handleClickOpen = () => {
        this.setState({open:true});
    };

    handleClose = () => {
        this.setState({open:false});
    };

    render(){
        const {newPaletteName} = this.state;
        const {hideForm} = this.props
        return (
        <div>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                onClose={hideForm}
            >
            <DialogTitle id="form-dialog-title">Palette Name</DialogTitle>
            <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
            <DialogContent>
                <DialogContentText>
                    Please enter a name
                </DialogContentText>
                <Picker />
                <TextValidator 
                    label="Palette name"
                    value={this.state.newPaletteName}
                    name='newPaletteName'
                    onChange={this.handleChange}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter Palette Name', 'Name already taken']}
                    fullWidth
                    margin='normal'/>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit">
                        Save Palette
                    </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.hideForm} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
            </ValidatorForm>
            </Dialog>
        </div>
        )
    }
}

export default PaletteMetaForm;