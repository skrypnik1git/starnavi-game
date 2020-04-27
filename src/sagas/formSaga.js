import { put, takeEvery, select } from 'redux-saga/effects'
import { FORM, GAME } from "../actions";
import { getData } from '../helpers';

function* workerFormDataRequest() {
    try {
        const gameModes = yield getData('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
        yield put({ type: FORM.DATA_SUCCESS, payload: gameModes })
    } catch (error) {
        yield put({ type: FORM.DATA_ERROR })
    }
}

function* submitGameSettings(action) {
    const { pickedMode } = action.payload;
    const { gameModes } = yield select(state => state.form);
    const { field: fieldQnt, delay } = gameModes[pickedMode];
    const quantityOfCells = fieldQnt*fieldQnt;

    const indexArray = []
    for (let i = 0; i < quantityOfCells; i++) {
        indexArray.push(i)
    }

    const winningNumber = Math.ceil(quantityOfCells / 2)
    
    
    yield put({ 
        type: GAME.GET_CELLSDATA, 
        payload: { arrayOfCells: indexArray, delay, winningNumber }
    });
}

export default function* watchFormDataRequest() {
    yield takeEvery(FORM.DATA_REQUEST, workerFormDataRequest)
    yield takeEvery(FORM.SUBMIT, submitGameSettings)
}



