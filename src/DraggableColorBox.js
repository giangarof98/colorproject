import { propsToClassKey } from "@mui/styles";
import React from "react";
import { withStyles } from "@mui/styles";

const styles = {
    root: {
        width: "20%",
        height: "25%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
    }
}

function DraggableColorBox(props) {
    return (
        <div className={props.classes.root} style={{backgroundColor: props.color}}>
            {props.name}
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox)