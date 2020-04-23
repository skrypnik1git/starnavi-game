import { put, takeEvery } from 'redux-saga/effects'
import { FORM } from "../actions";
import { getData } from '../helpers';


function* workerFormDataRequest(action) {
    try {
        const gameModes = yield getData('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
        yield put({type: FORM.DATA_SUCCESS, payload: gameModes})
    } catch (error) {
        yield put({type: FORM.DATA_ERROR})
    }
}


export default function* watchFormDataRequest() {
    yield takeEvery(FORM.DATA_REQUEST, workerFormDataRequest)
}



