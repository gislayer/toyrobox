import React, { Component } from 'react'
import GeneralConsumer from '../context';

 class History extends Component {
  render() {
      debugger;
   
    return (
       <GeneralConsumer>

           {
            
                (value) => {
                    debugger;
                    var height = (window.screen.availHeight-240)+'px';
                    return(<div style={{height:height}} className="br5 p10 bg2">{
                      value.messages.map((message,index)=>{
                        if(message.status===true){
                            return(
                                <div key={index} className="alert alert-success d-flex align-items-center" role="alert">
                                  <div>
                                      {message.text}
                                  </div>
                                </div>
                            );
                        }else{
                            return(
                                <div key={index} className="alert alert-warning d-flex align-items-center" role="alert">
                                  <div>
                                  {message.text}
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