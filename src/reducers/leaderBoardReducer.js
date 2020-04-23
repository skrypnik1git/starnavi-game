import { LEADERBOARD } from "../actions"

const initialState = {
	leaderBoard: [],
    leaderBoardError: false,
}

export const leaderBoardReducer = (state = initialState, action) => {
    switch(action.type) {
        case LEADERBOARD.DATA_REQUEST:
            return {
                ...state,
                leaderBoardError: false,
            }
        case LEADERBOARD.DATA_SUCCESS:
            return {
                ...state,
                leaderBoard: action.payload,       
            }
        case LEADERBOARD.DATA_ERROR:
            return {
                ...state,
                leaderBoardError: true,
            }
        default:
            return { ...state }
    }
}