export default{
    Palette: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    colors:{
      height: "90%",
    },
    goBack: {
        width: "20%",
        height: "50%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        opacity: 1,
        backgroundColor: "#000",
        "& a":{
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255,255,255, 0.5)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            textDecoration: "none",
        }

    }
}