import React from "react";
import {withStyles} from "@mui/styles";
import style from './styles/PaletteFooterStyle'

function PaletteFooter(props){
    const {paletteName, emoji, classes} = props;
    return(
        <footer className={classes.PaletteFooter}>
          {paletteName}
          <span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

export default withStyles(style)(PaletteFooter)