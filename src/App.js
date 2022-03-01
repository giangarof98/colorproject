import React, {Component} from "react";
import Palette from './Palette.js'
import seedColors from './seedColors.js'
import { generatePalette } from "./colorHelpers.js";

class App extends Component{
  render(){
    return (
      <div>
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    )
  }
}

export default App;