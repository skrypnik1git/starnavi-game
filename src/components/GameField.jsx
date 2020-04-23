import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cell from './Cell'

class GameField extends Component {
    render() {
        return (
            <div className='d-flex'>
                <Cell/>
                <Cell/>
                <Cell/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {gameModes, pickedMode } = state.form
    if (pickedMode) {
        console.log(gameModes[pickedMode].field)
        return {
            fieldQnt: gameModes[pickedMode].field,
            delay: gameModes[pickedMode].delay,
        }
    } else {
        return {}
    }
}
    

export default connect(mapStateToProps)(GameField)