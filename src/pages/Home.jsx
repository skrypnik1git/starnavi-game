import React, { Component } from 'react';
import MainForm from '../components/MainForm';
import LeaderBoard from '../components/LeaderBoard';
import GameField from '../components/GameField';

class Home extends Component {
    render() {
        return (
            <div className='d-flex'>
                <div className='col-7'>
                    <MainForm />
                    <GameField />
                </div>
                <div className='col-5'>
                    <LeaderBoard />
                </div>
            </div>
            
        )
    }
}

export default Home