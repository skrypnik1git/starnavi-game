import { createStore, applyMiddleware } from "redux";
import { reducer } from './MainReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)