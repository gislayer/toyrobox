import React,{Component} from "react";
import {Game} from "./GL";

const GeneralContext = React.createContext();

export class GeneralProvider extends Component {
    state = {
        command:'',
        oldCommans:[],
        messages:[],
        game:new Game(5,5)
      };

  render() {
    return (
        <GeneralContext.Provider value={this.state}>
            {this.props.children}
        </GeneralContext.Provider>
    )
  }
}

const GeneralConsumer = GeneralContext.Consumer;

export default GeneralConsumer;