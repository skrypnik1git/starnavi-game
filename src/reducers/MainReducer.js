import { combineReducers } from 'redux'
import { formReducer } from "./formReducer"
import { leaderBoardReducer } from "./leaderBoardReducer"
import { gameReducer } from './gameReducer'


export const reducer = combineReducers({
    form: formReducer,
    leaderBoard: leaderBoardReducer,
    game: gameReducer,
})