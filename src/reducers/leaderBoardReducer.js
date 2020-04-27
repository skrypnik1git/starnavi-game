import { LEADERBOARD } from "../actions"

const initialState = {
	leaderBoard: [],
    leaderBoardError: false,
}

export const leaderBoardReducer = (state = initialState, action) => {
    const { payload } = action
    switch(action.type) {
        case LEADERBOARD.DATA_REQUEST:
            return {
                ...state,
                leaderBoardError: false,
            }
        case LEADERBOARD.DATA_SUCCESS:
            return {
                ...state,
                leaderBoard: payload,       
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