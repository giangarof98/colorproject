import React, {Component} from "react";
import Button from '@mui/material/Button';
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
            stage: "form",
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.showEmojiPicker = this.showEmojiPicker.bind(this)
        this.savePalette = this.savePalette.bind(this)

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

    showEmojiPicker(){
        this.setState({stage: 'emoji'})
    }

    savePalette(emoji){
        const newPalette = {
            paletteName: this.state.newPaletteName, 
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette);
        this.setState({stage: ''})
    }

    handleClickOpen = () => {
        this.setState({open:true});
    };

    handleClose = () => {
        this.setState({open:false});
    };

    render(){
        const {newPaletteName, stage} = this.state;
        const {hideForm} = this.props
        return (
        <div>
            <Dialog open={stage === 'emoji'} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Palette Name</DialogTitle>
                <Picker title='Pick an Emoji' onSelect={this.savePalette} />
            </Dialog>
            <Dialog
                open={stage === 'form'}
                aria-labelledby="form-dialog-title"
                onClose={hideForm}
            >
            <ValidatorForm onSubmit={this.showEmojiPicker}>
                <DialogContent>
                <DialogContentText>
                    Please enter a name
                </DialogContentText>

                <TextValidator 
                    label="Palette name"
                    value={this.state.newPaletteName}
                    name='newPaletteName'
                    onChange={this.handleChange}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter Palette Name', 'Name already taken']}
                    fullWidth
                    margin='normal'/>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit">
                        Save Palette
                    </Button>
                    </DialogActions>
            </ValidatorForm>
            </Dialog>
        </div>
        )
    }
}

export default PaletteMetaForm;