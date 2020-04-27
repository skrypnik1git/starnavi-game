import React, { memo } from 'react';
import LeaderBoard from '../components/LeaderBoard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GAME } from '../actions';
import { actionCreator } from '../helpers'

const Result = props => {
    const playAgain = () => {
        props.deleteGameState()
        props.history.push('/')
    }


    const { LBError, computerCells, userCells, winner } = props
    return (
        <div className='d-flex flex-wrap'>
            <div className='col-12 col-md-7 d-flex flex-column justify-content-start align-items-center'>
                <div className='d-flex w-100 mt-3'>
                    <div className='btn btn-secondary' onClick={playAgain}>
                        Play Again
                    </div>
                </div>
                <div className='d-flex w-100 flex-column justify-content-center align-items-center mt-5 pt-4 pb-4 border border-secodary'>
                    <div className='text-center h2'>
                        {winner ? `${winner} is the Winner!` : 'Computer won :('}
                    </div>
                    <div className='d-flex w-100 justify-content-around mt-3'>
                        <div>
                            {`You had ${userCells.length} points`}
                        </div>
                        <div>
                            {`Computer had ${computerCells.length} points`}
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-5'>
                {LBError ? 
                    <div className="w-100 mt-4 p-2 border border-danger">
                        Something goes wrong with data for Leader Board. Please try again later.
                    </div> 
                    :
                    <LeaderBoard />
                }
            </div>
        </div>
        
    )
}

const mapActionsToProps = {
    deleteGameState: actionCreator(GAME.DELETE_STATE)
}

function mapStateToProps(state) {
    return {
    formError: state.form.formError,
    LBError: state.leaderBoard.leaderBoardError,
    computerCells: state.game.computerCells,
    userCells: state.game.userCells,
    winner: state.game.winner,
}
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(memo(Result)))