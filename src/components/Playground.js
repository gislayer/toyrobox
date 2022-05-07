import React, { Component } from 'react'
import GeneralConsumer from '../context';

export default class Playground extends Component {
  render() {
    return (
        <GeneralConsumer>
              {
                  (value) => {
                      debugger;
                      const {boxes} = value.game;
                      return(
                          <div className="cols">
                              {
                                  boxes.map((box)=>{
                                      if((box.x+box.y)%2===1){
                                        return(<div className='box1'>{box.x}-{box.y}</div>)
                                      }else{
                                        return(<div className='box2'>{box.x}-{box.y}</div>)
                                      }
                                    
                                  })
                              }
                          </div>
                      )
                  }
              }
        </GeneralConsumer>
      )
  }
}
