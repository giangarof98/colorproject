import sizes from "./sizes";
import bg from './bg.svg'

export default{
    root: {
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#293327',
        backgroundImage: `url(${bg})`,
    },
    container:{
        width: "60%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        "& a":{
            color: "#fff"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%",
        [sizes.down('md')]:{
            gridTemplateColumns: "repeat(2, 50%)",
            gap:'3%',

        },
        [sizes.down('sm')]:{
            gridTemplateColumns: "repeat(1, 100%)",
            gap:'1%',
        },
        [sizes.down('xs')]:{
            gridTemplateColumns: "repeat(1, 100%)",
            gap:'1%',

        }
    }
}