import { FORM } from "../actions"

const initialState = {
    gameModes: {},
	pickedMode: '',
	playerName: '',
    formError: false,
}

export const formReducer = (state = initialState, action) => {
    switch(action.type) {
        case FORM.DATA_REQUEST:
            return {
                ...state,
                formError: false,
            }
        case FORM.DATA_SUCCESS:
            return {
                ...state,
                gameModes: action.payload,       
            }
        case FORM.DATA_ERROR:
            return {
                ...state,
                formError: true,
            }
        case FORM.SUBMIT:
            return {
                ...state,
                pickedMode: action.payload.pickedMode,
                playerName: action.payload.playerName,
            }
        default:
            return { ...state }
    }
}