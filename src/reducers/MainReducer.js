import { combineReducers } from 'redux'
import { formReducer } from "./formReducer"
import { leaderBoardReducer } from "./leaderBoardReducer"

export const reducer = combineReducers({
    form: formReducer,
    leaderBoard: leaderBoardReducer,
})