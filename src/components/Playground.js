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
                                    var boxName = (box.x+box.y)%2==1?'box1':'box2';
                                    if(box.robot===false && box.wall===false){
                                        return(<div className={boxName}>{box.x}-{box.y}</div>)
                                    }else{
                                        if(box.wall==true){
                                            return(<div className='wallbox'></div>)
                                        }else{
                                            return(<div className={boxName}><img height="100" src={box.facing}/></div>)
                                        }
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
