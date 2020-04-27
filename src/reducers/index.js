import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from './MainReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware()
const composedEnhancers = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const store = createStore(reducer, composedEnhancers)
sagaMiddleware.run(rootSaga)