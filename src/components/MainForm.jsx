import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../helpers'
import { FORM,GAME } from '../actions'
import GameLoader from './GameLoader'




class MainForm extends Component {
    state = {
        pickedMode: '',
        playerName: '',
    }

    componentDidMount() {
        this.props.getGameModes()
    }

    loadingAndSubmit = () => {
        const { loadingClose, submitGameData } =this.props
        const { pickedMode, playerName } = this.state;
        loadingClose()
        submitGameData({ pickedMode, playerName })
    }

    onSubmit = e => {
        e.preventDefault()
        const { loadingShow } =this.props
        const { mode, name } = e.target

        if (name.value.trim() === "") {
            return false
        }
        this.setState({ pickedMode: mode.value, playerName: name.value })
        loadingShow()
        
    }

    render() {
        const { gameModes, showLoading, pickedMode } = this.props;
        return (
            <form className='d-flex flex-wrap w-100 mt-4' onSubmit={this.onSubmit}>
                <select className="form-control col-12 col-sm-4 mr-2" defaultValue='' required disabled={!!pickedMode} name='mode'>
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
                {showLoading && <GameLoader onLoaded={this.loadingAndSubmit} />}
                <input className="form-control col-12 col-sm-4 mr-2" placeholder="Enter your name" required disabled={!!pickedMode} name='name'/>
                <input 
                    type='submit' 
                    className="btn btn-secondary col-12 col-sm-3 text-wrap" 
                    value='Play'
                    disabled={!!pickedMode}
                />
            </form>
        )
    }
}

const mapActionsToProps = {
    getGameModes: actionCreator(FORM.DATA_REQUEST),
    submitGameData: actionCreator(GAME.RESTART),
    deleteGameState: actionCreator(GAME.DELETE_STATE),
    loadingShow: actionCreator(FORM.LOADING.SHOW),
    loadingClose: actionCreator(FORM.LOADING.CLOSE),
}

function mapStateToProps(state) {
    return {
        gameModes: state.form.gameModes,
        pickedMode: state.form.pickedMode,
        playerName: state.form.playerName,
        showLoading: state.form.showLoading,
    }
}


export default connect(mapStateToProps, mapActionsToProps)(MainForm)