import React, {Component} from "react";


import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';



class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            currentColor: 'red',
            newColorName: "",
        }
        this.updateColor = this.updateColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
          this.props.colors.every(
            ({name}) => name.toLowerCase() !== value.toLowerCase()
          )
        )
    
        ValidatorForm.addValidationRule('isColorUnique', value => 
          this.props.colors.every(
            ({color}) => color !== this.props.colors.currentColor
          )
        )
      }


    updateColor (newColor) {
        this.setState({currentColor: newColor.hex})
    }

    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    handleSubmit(){
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({newColorName: ''})

    }
    render(){
        const {paletteIsFull} = this.props;
        const {currentColor, newColorName} = this.state;
        return (
            <div>

            <ChromePicker 
                color={this.state.currentColor} 
                onChange={this.updateColor} />

                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                    value={this.state.newColorName}
                    name="newColorName"
                    onChange={this.handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a Color Name', 'This color name is taken', "Color already used"]}/>
                
                <Button 
                    variant="contained" 
                    type='submit'
                    color="primary"
                    disabled={paletteIsFull}
                    style={{backgroundColor: paletteIsFull ? 'grey' : this.state.currentColor}}>
                    {paletteIsFull ? 'Palette is full' : 'Add Color'} 
                </Button>

                </ValidatorForm>


            </div>
        )
    }
}

export default ColorPickerForm