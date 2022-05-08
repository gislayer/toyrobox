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
                      var screenWidth = window.screen.availWidth;
                      var boxHeight = 128;
                      var boxWidth = '100%';
                      if(screenWidth<=768){
                        boxWidth = parseInt((screenWidth-40)/value.game.board.width);
                        boxHeight = boxWidth;
                      }
                      
                      return(
                          <div className="cols">
                              {
                                  boxes.map((box)=>{
                                    var boxName = (box.x+box.y)%2===1?'box1':'box2';
                                    if(box.robot===false && box.wall===false){
                                        return(<div style={{width:boxWidth,height:boxHeight}} className={boxName}>{box.x}-{box.y}</div>)
                                    }else{
                                        if(box.wall===true){
                                            return(<div style={{width:boxWidth,height:boxHeight}} className='wallbox'></div>)
                                        }else{
                                            return(<div style={{width:boxWidth,height:boxHeight}} className={boxName}><img height="100" alt="robot" src={box.facing}/></div>)
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
