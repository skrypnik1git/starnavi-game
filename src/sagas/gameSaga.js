import { put, takeEvery, select } from 'redux-saga/effects'
import { GAME, FORM, LEADERBOARD } from "../actions";
import { getRandomIndex, getFormatedDate } from '../helpers';

const sendDataToServer = winner => {
    const userData = {
        winner,
        date: getFormatedDate()
    }
    return fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
}

/// for ADDPOINT_USER

function* workerUserAddPoint(action) {
    const state = yield select(state => state)
    const { userCells, winningNumber, arrayOfCells, pickedCell } = state.game
    const winner = state.form.playerName
    userCells.push(pickedCell)
    arrayOfCells.splice(arrayOfCells.indexOf(pickedCell), 1)
    
    const win = userCells.length >= winningNumber;
    
    try {
        const gamePayload = {
            userCells,
            arrayOfCells,
        }

        if (win) {
            gamePayload.pickedCell = -1;
        }

        yield put({
            type: GAME.ADDPOINT.USER.SUCCESS,
            payload: gamePayload
        })
        
        if (win) {
            yield sendDataToServer(winner)
            yield put({type: GAME.END, payload: winner})
        } else {
            yield put({type: GAME.CREATE_PICKEDCELL, payload: arrayOfCells[getRandomIndex(arrayOfCells.length - 1)]})
        }
    } catch (error) {
        if (win) {
            yield put({type: GAME.END, payload: winner})
        }
        yield put({type: LEADERBOARD.DATA_ERROR})
    }
    

}

/// for ADDPOINT_COMPUTER

function* workerComputerAddPoint(action) {
    const { computerCells, winningNumber, arrayOfCells, pickedCell } = yield select(state => state.game)
    computerCells.push(pickedCell)
    arrayOfCells.splice(arrayOfCells.indexOf(pickedCell), 1)

    const win = computerCells.length >= winningNumber;

    const gamePayload = {
        computerCells,
        arrayOfCells,
    }

    if (win) {
        gamePayload.pickedCell = -1;
    }

    yield put({
        type: GAME.ADDPOINT.COMPUTER.SUCCESS,
        payload: gamePayload
    })
    
    if (win) {
        yield put({type: GAME.END, payload: 'COMPUTER'})
    } else {
        yield put({type: GAME.CREATE_PICKEDCELL, payload: arrayOfCells[getRandomIndex(arrayOfCells.length - 1)]})
    }

}

function* restartGameSaga(action) {
    const { payload } = action
    try {
        yield put({ type: GAME.DELETE_STATE })
        yield put({ type: FORM.SUBMIT, payload })
    } catch(error) {
        console.log(error)
    }
}

// root
export default function* watchAddPoint() {
    yield takeEvery(GAME.ADDPOINT.COMPUTER.REQUEST, workerComputerAddPoint)
    yield takeEvery(GAME.ADDPOINT.USER.REQUEST, workerUserAddPoint)
    yield takeEvery(GAME.RESTART, restartGameSaga)
}