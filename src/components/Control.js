import React, { Component } from 'react'
import GeneralConsumer from '../context';

export default class Control extends Component {
  render() {
    return (
      <GeneralConsumer>
            {
                (value) => {
                    return(
                        <div className="br5 p0 bg2 mb10 ">
                            <div className="btn-group w100" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-warning">MOVE</button>
                                <button type="button" className="btn btn-warning">LEFT</button>
                                <button type="button" className="btn btn-warning">RIGHT</button>
                                <button type="button" className="btn btn-warning">REPORT</button>
                            </div>
                        </div>
                    )
                }
            }
      </GeneralConsumer>
    )
  }
}
