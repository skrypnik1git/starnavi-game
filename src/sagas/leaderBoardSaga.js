import { put, takeEvery } from 'redux-saga/effects'
import { LEADERBOARD } from "../actions";
import { getData } from '../helpers';


function* workerLBDataRequest(action) {
    try {
        const fullLeaderBoard = yield getData('https://starnavi-frontend-test-task.herokuapp.com/winners')
        const leaderBoard = fullLeaderBoard.reverse().splice(0,4)
        yield put({type: LEADERBOARD.DATA_SUCCESS, payload: leaderBoard})
    } catch (error) {
        yield put({type: LEADERBOARD.DATA_ERROR})
    }
}


export default function* watchLBDataRequest() {
    yield takeEvery(LEADERBOARD.DATA_REQUEST, workerLBDataRequest)
}
