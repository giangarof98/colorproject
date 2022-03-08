import sizes from "./sizes"

export default {
    Navbar: {
      display: "flex",
      alignItems: "center",
      justifycontent: "flex-start",
      height: "6vh",
  },
  
  logo:{
      marginright: "15px",
      padding: "0 13px",
      fontSize: "22px",
      backgroundColor: "#ececec",
      height: "100%",
      display: "flex",
      alignItems: "center",
      "& a": {
        textDecoration: "none",
        color: "#000",
      },
      [sizes.down('xs')]:{
        display: 'none'
      }
  },
  
  slider:{
      width: "340px",
      margin: "0 10px",
      display: "inline-block",
      "& rc-slider-track":{
        background: "transparent"
    },
      "& rc-slider-rail":{
        height: "8px"
      },
      "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus" :{
        backgroundColor: "green",
        border: "2px solid green",
        outline: "none",
        boxShadow: "none",
        width: "13px",
        height: "13px",
        marginLeft: "-7px",
        marginTop: "-3px",
      },
      [sizes.down('md')]:{
        width:'150px'
      }
    },
    selectContainer:{
      marginLeft: "auto",
      marginRight: "1rem",
  }
  }