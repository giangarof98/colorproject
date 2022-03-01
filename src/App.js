import React, {Component} from "react";
import Palette from './Palette.js'
import seedColors from './seedColors.js'

class App extends Component{
  render(){
    return (
      <div>
        <Palette {...seedColors[1]} />
      </div>
    )
  }
}

export default App;