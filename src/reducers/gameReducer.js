import { GAME } from "../actions"


const initialState = {
	delay: 0,
    pickedCell: null,
    userCells: [],
    computerCells: [],
    arrayOfCells: [],
    winner: '',
    winningNumber: 0,
}


export const gameReducer = (state = initialState, action) => {
    const { payload } = action;
    switch(action.type) {
        case GAME.GET_CELLSDATA:
            return {
                ...state,
                ...payload,
            }
        case GAME.CREATE_PICKEDCELL:
            return {
                ...state,
                pickedCell: payload
            }
        case GAME.ADDPOINT.COMPUTER.SUCCESS:
            return {
                ...state,
                ...payload
            }
        case GAME.ADDPOINT.USER.SUCCESS:
            return {
                ...state,
                ...payload,
            }
        case GAME.END:
            return {
                ...state,
                winner: payload || '',
            }
        case GAME.DELETE_STATE: 
            return {
                ...JSON.parse(JSON.stringify(initialState))
            }
        default:
            return { ...state }
    }
}