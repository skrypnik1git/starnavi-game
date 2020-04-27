import Loader from 'react-loader-spinner'
import React, { Component } from 'react';

export default class GameLoader extends Component {
    state = {
        timer: 5
    }
    
    componentDidMount() {
        this.countUpTo3()
    }

    countUpTo3 = () => {
        let timerId
        let timer = this.state.timer
        const changeNumber = () => {
            this.setState({timer: timer - 1})
            if (timer === 1) {
                clearInterval(timerId);
            }
            timer--
        }

        timerId = setInterval(changeNumber, 1000);
      }
   
    render() {
    return(
     <div className='cover-div'>
         <div className='loader w-100 d-flex flex-column justify-content-center align-items-center'>
             <div className='loading-number'>
                Game starts in {this.state.timer}
             </div>
            <Loader
                type="Rings"
                color="#00BFFF"
                height={100}
                width={100}
            />
         </div>
     </div>
    );
   }
}