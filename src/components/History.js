import React, { Component } from 'react'
import GeneralConsumer from '../context';

 class History extends Component {
  render() {  
    return (
       <GeneralConsumer>
           {         
                (value) => {
                    var height = (window.screen.availHeight-240)+'px';
                    var messages = JSON.parse(JSON.stringify(value.game.messages));
                    return(<div data-testid="history" style={{height:height}} className="br5 p10 bg2">{
                      messages.reverse().map((message,index)=>{
                        if(message.status===true){
                            return(
                                <div key={index} className="alert alert-success d-flex align-items-center" role="alert">
                                  <div>
                                      {message.num}.{message.type}: {message.text}
                                  </div>
                                </div>
                            );
                        }else{
                            return(
                                <div key={index} className="alert alert-warning d-flex align-items-center" role="alert">
                                  <div>
                                  {message.num}.{message.type}: {message.text}
                                  </div>
                                </div>
                            );
                        }
                    })
                      }</div>);
                }  
            }
        </GeneralConsumer>
    )
  }
}

export default History;