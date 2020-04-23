import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../helpers'
import { FORM } from '../actions'



class MainForm extends Component {
    componentDidMount() {
        this.props.getGameModes()
    }

    onSubmit = e => {
        e.preventDefault()
        
        const [select, input] = e.target.children

        this.props.submitGameData({pickedMode: select.value, playerName: input.value,})
    }

    render() {
        const { gameModes } = this.props
        return (
            <form className='d-flex w-100' onSubmit={this.onSubmit}>
                <select className="form-control col-5 mr-2" defaultValue='' required>
                    <option disabled hidden value=''>Choose game mode</option>
                    {Object.keys(gameModes)
                        .map( (item, idx) => {
                            return (
                                <option value={item} key={idx}>
                                    {item}
                                </option>
                            )
                        })
                    }
                </select>
                <input className="form-control col-5 mr-2" placeholder="Enter your name"></input>
                <input type='submit' className="btn btn-secondary col-2" value='Play'></input>
            </form>
        )
    }
}

const mapActionsToProps = {
    getGameModes: actionCreator(FORM.DATA_REQUEST),
    submitGameData: actionCreator(FORM.SUBMIT)
}

function mapStateToProps(state) {
    return {
        gameModes: state.form.gameModes
    }
}


export default connect(mapStateToProps, mapActionsToProps)(MainForm)