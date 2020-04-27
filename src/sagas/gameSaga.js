import { put, takeEvery, select } from 'redux-saga/effects'
import { GAME, FORM } from "../actions";
import { getRandomIndex, getFormatedDate } from '../helpers';

/// for ADDPOINT_USER

function* workerUserAddPoint(action) {
    const state = yield select(state => state)
    const { userCells, winningNumber, arrayOfCells, pickedCell } = state.game
    const winner = state.form.playerName
    userCells.push(pickedCell)
    arrayOfCells.splice(arrayOfCells.indexOf(pickedCell), 1)

    const win = userCells.length >= winningNumber;

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
        yield put({type: GAME.END, payload: winner})
    } else {
        yield put({type: GAME.CREATE_PICKEDCELL, payload: arrayOfCells[getRandomIndex(arrayOfCells.length - 1)]})
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

function* sendDataToServer() {
    const { winner } = yield select(state => state.game)
    const userData = {
        winner,
        date: getFormatedDate()
    }
    let response = yield fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
}

// root
export default function* watchAddPoint() {
    yield takeEvery(GAME.ADDPOINT.COMPUTER.REQUEST, workerComputerAddPoint)
    yield takeEvery(GAME.ADDPOINT.USER.REQUEST, workerUserAddPoint)
    yield takeEvery(GAME.RESTART, restartGameSaga)
}