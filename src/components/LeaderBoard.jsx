import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../helpers'
import { LEADERBOARD } from '../actions'





class LeaderBoard extends Component {
    componentDidMount() {
        this.props.getLeaderBoard()
    }
    
    render() {
        const { leaderBoard } = this.props
        return (
            <div>
                <div className='font-italic ml-1 h3'>
                    Leader Board
                </div>
                {leaderBoard.map( (game, idx) => {
                    return (
                        <div key={idx} className='d-flex justify-content-between align-center border-bottom border-primary p-3 bg-secondary mt-2 text-light'>
                            <div>
                                {game.winner}
                            </div>
                            <div>
                                {game.date}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}


const mapActionsToProps = {
    getLeaderBoard: actionCreator(LEADERBOARD.DATA_REQUEST)
}

function mapStateToProps(state) {
    return {
        leaderBoard: state.leaderBoard.leaderBoard
    }
}

export default connect(mapStateToProps, mapActionsToProps)(LeaderBoard)