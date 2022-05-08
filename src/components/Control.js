import React, { Component } from 'react'
import GeneralConsumer from '../context';

export default class Control extends Component {
    runCommand(dispatch,type,e){
        debugger;
        switch(type){
            case 1:{
                dispatch({type:'RUN_COMMAND',payload:'MOVE'});
                break;
            }
            case 2:{
                dispatch({type:'RUN_COMMAND',payload:'LEFT'});
                break;
            }
            case 3:{
                dispatch({type:'RUN_COMMAND',payload:'RIGHT'});
                break;
            }
            case 4:{
                dispatch({type:'RUN_COMMAND',payload:'REPORT'});
                break;
            }
        }
        
    }
  render() {
    return (
      <GeneralConsumer>
            {
                (value) => {
                    const {dispatch} = value;
                    return(
                        <div className="br5 p0 bg2 mb10 ">
                            <div className="btn-group w100" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-warning" onClick={this.runCommand.bind(this,dispatch,1)}>MOVE</button>
                                <button type="button" className="btn btn-warning" onClick={this.runCommand.bind(this,dispatch,2)}>LEFT</button>
                                <button type="button" className="btn btn-warning" onClick={this.runCommand.bind(this,dispatch,3)}>RIGHT</button>
                                <button type="button" className="btn btn-warning" onClick={this.runCommand.bind(this,dispatch,4)}>REPORT</button>
                            </div>
                        </div>
                    )
                }
            }
      </GeneralConsumer>
    )
  }
}
