import { FORM, GAME } from "../actions"

const initialState = {
    gameModes: {},
	pickedMode: '',
	playerName: '',
    formError: false,
    showLoading: false,
}

export const formReducer = (state = initialState, action) => {
    const { payload } = action;

    switch(action.type) {
        case FORM.DATA_REQUEST:
            return {
                ...state,
                formError: false,
            }
        case FORM.DATA_SUCCESS:
            return {
                ...state,
                gameModes: payload,       
            }
        case FORM.DATA_ERROR:
            return {
                ...state,
                formError: true,
            }
        case FORM.SUBMIT:
            const { pickedMode, playerName } = payload;
            return {
                ...state,
                pickedMode,
                playerName,
            }
        case FORM.LOADING.SHOW: 
            return {
                ...state,
                showLoading: true
            }
        case FORM.LOADING.CLOSE: 
            return {
                ...state,
                showLoading: false
            }
        case GAME.DELETE_STATE: 
            return {
                ...state,
                pickedMode: '',
	            playerName: '',
            }
        default:
            return { ...state }
    }
}