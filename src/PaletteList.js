import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import styles from './styles/PaletteListStyle'

class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }
    render(){
        const {palettes, classes, deletePalette} =this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                            <MiniPalette 
                            {...palette} 
                            handleClick={() => this.goToPalette(palette.id)}
                            handleDelete={this.props.deletePalette}
                            key={palette.id}
                            id={palette.id}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);