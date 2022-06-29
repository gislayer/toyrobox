import React, { Component } from 'react';
import GeneralConsumer from '../context';

class Command extends Component {

    state = {
        command:'',
    }

    runCommand(dispatch,e){
        dispatch({type:'RUN_COMMAND',payload:this.state.command});
        this.setState({command:''});
    }

    handleKeyPress(dispatch,e){
        if (e.key === 'Enter') {
            dispatch({type:'RUN_COMMAND',payload:this.state.command});
            this.setState({command:''});
        }
    }

    setName(val){
        this.setState({command:val});
    }

    render() {
        return (
        <GeneralConsumer>
            {
                (value) => {
                    const {dispatch} = value;
                    return(
                        <div className="input-group mb-3">
                        <input autoFocus type="text" value={this.state.command} onKeyDown={this.handleKeyPress.bind(this,dispatch)} onChange={(e) => {this.setName(e.target.value);}}className="form-control" placeholder="Write Game Command Text" aria-describedby="button-addon2"/>
                        <button data-testid="Run Button" onClick={this.runCommand.bind(this,dispatch)} className="btn btn-dark btn-outline-warning" type="button" id="button-addon2">Run</button>
                        </div>
                    );
                }  
            }
        </GeneralConsumer>
        )
    }
}

export default Command;
