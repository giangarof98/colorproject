import React from "react";
import {withStyles} from "@mui/styles";
import styles from './styles/MiniPaletteStyle';
import DeleteIcon from '@mui/icons-material/Delete';

function MiniPalette(props){
    const {classes, paletteName, emoji, colors} = props;
    const miniColorBoxes = colors.map(color => (
        <div 
        className={classes.miniColor}
        style={{backgroundColor: color.color}}
        key={color.name}>

        </div>
    ))
    return(
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.delete}>
               <DeleteIcon className={classes.deleteIcon} style={{transition: 'all 0.3s ease-in-out'}}/> 
            </div>
            <div className={classes.root}>
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        </div>
    )
}

export default withStyles(styles)(MiniPalette)