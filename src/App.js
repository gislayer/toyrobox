import React,{Component} from 'react';
import './App.css';
import Command from './components/Command';
import History from './components/History';
import Control from './components/Control';
import Playground from './components/Playground';

class App extends Component {
  render(){
    return (
      <div className='fix'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-8 p20'>
            <div className='row'>
              <div className='col-md-8 br5 bg1 p20'>
                <Playground />
              </div>
              <div className='col-md-4'>
                <div className='col-md-12'>
                  <Command/>
                </div>
                <div className='col-md-12'>
                  <Control/>
                </div>
                <div className='col-md-12 scrollbar style-3'>
                  <History/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
