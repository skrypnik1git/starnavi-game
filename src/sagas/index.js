import { all } from 'redux-saga/effects'
import watchFormDataRequest from "./formSaga"
import watchLBDataRequest from "./leaderBoardSaga"

export default function* rootSaga() {
    yield all([watchFormDataRequest(), watchLBDataRequest()])
}