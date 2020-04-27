import React from 'react'
import { connect } from 'react-redux'
import Cell from './Cell'
import { withRouter } from 'react-router-dom'



const GameField = props => {
    const finishGame = () => {
        props.history.push('/result')
    }


    const generateGameMap = () => {
        const { fieldQnt } = props;

        const quantityOfCells = fieldQnt*fieldQnt;
        const cellArray = [];

        for (let i = 0; i < quantityOfCells; i++) {
            cellArray.push(<Cell id={i} key={i}/>)
        }

        return cellArray;
    }

    
    const { pickedMode, winner } = props

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className={`d-flex flex-wrap mt-5 ${pickedMode || ''}`}>
                {generateGameMap()}
            </div>
             {winner && <div className='btn btn-secondary mt-5' onClick={finishGame}>
                Finish
            </div>}
        </div>
        
    )

}


function mapStateToProps(state) {
    const { gameModes, pickedMode } = state.form
    const { winner } = state.game;
    return {
        fieldQnt: (gameModes[pickedMode] || {}).field || 0,
        pickedMode, 
        winner
    }
}
    

export default connect(mapStateToProps, {})(withRouter(GameField))