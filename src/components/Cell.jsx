import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../helpers'
import { GAME } from '../actions'

class Cell extends Component {
    timer = null;

    componentDidMount (){
        this.startTimer()
    }

    componentDidUpdate() {
        this.startTimer()
    }

    startTimer = () => {
        const { id, pickedCell, addPointToComputer, delay } = this.props
        if (id === pickedCell) {
            this.timer = setTimeout(addPointToComputer, delay)
        } 
    }
    
    onClick = () => {
        const { id, pickedCell, addPointToUser } = this.props;
        if (id === pickedCell) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            addPointToUser();
        }
    }

    getBackground = (id, pickedCell, userCells, computerCells) => {
        switch(true) {
            case pickedCell === id:
                return 'bc-blue'
            case userCells.indexOf(id) >= 0:
                return 'bc-green'
            case computerCells.indexOf(id) >= 0:
                return 'bc-red'
            default:
                return ''
        }
    }
    
    render() {
        const {id, pickedCell, userCells, computerCells} = this.props
        const color = this.getBackground(id, pickedCell, userCells, computerCells)

        return (
            <div 
                className={`cell border border-light ${color}`}
                onClick={this.onClick}
            >

            </div>
        )
    }
}

const mapActionsToProps = {
    addPointToUser: actionCreator(GAME.ADDPOINT.USER.REQUEST),
    addPointToComputer: actionCreator(GAME.ADDPOINT.COMPUTER.REQUEST)
}

function mapStateToProps(state) {
    return {
        pickedCell: state.game.pickedCell,
        userCells: state.game.userCells,
        computerCells: state.game.computerCells,
        delay: state.game.delay
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Cell)