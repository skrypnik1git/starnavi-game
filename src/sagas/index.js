import { spawn } from 'redux-saga/effects'
import watchFormDataRequest from "./formSaga"
import watchLBDataRequest from "./leaderBoardSaga"
import rootGameSaga from './gameSaga'



export default function* rootSaga() {
    yield spawn(watchFormDataRequest)
    yield spawn(watchLBDataRequest)
    yield spawn(rootGameSaga)
}