import React, { Component } from 'react';
import GeneralConsumer from '../context';

class Command extends Component {
  render() {
    return (
      <GeneralConsumer>
          {
             (value) => {
                return(
                    <div className="input-group mb-3">
                    <input autoFocus type="text" className="form-control" placeholder="Write Game Command Text" aria-describedby="button-addon2"/>
                    <button className="btn btn-dark btn-outline-warning" type="button" id="button-addon2">Run</button>
                    </div>
                );
             }  
          }
      </GeneralConsumer>
    )
  }
}

export default Command;
