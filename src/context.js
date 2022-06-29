import React,{Component} from "react";
import {Game} from "./GL";

const GeneralContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'RUN_COMMAND':{
            state.game.command(action.payload);
            return state;
            //break;
        }
        case 'SET_COMMAND_VALUE':{
            state.command = action.payload;
            break;
        }
        default:{
            return state;
        }
    }
}

export class GeneralProvider extends Component {
    state = {
        command:'MOVE',
        oldCommans:[],
        messages:[],
        game:new Game(5,5),
        dispatch:action =>{
            this.setState(state =>reducer(state,action));
        }
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