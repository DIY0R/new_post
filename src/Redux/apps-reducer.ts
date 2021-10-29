import {RequestinApi} from "./auth-reducer";
import {ActionsType} from "./store";
import {ThunkAction} from "redux-thunk";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
let initialState = {
    initialized: false,
};
type InitialState = typeof initialState;
const appReducer = (state:InitialState = initialState, action:appActionType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
};
const actions = {
    initializedSuccess:()=>({type: INITIALIZED_SUCCESS}as const)

}

const {initializedSuccess} = actions
type ThunkResult<R> = ThunkAction<R, InitialState, undefined, any>;
export const initializeApp= ():ThunkResult<void> => (dispatch) => {
    let promise = dispatch(RequestinApi());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
};
type appActionType = ActionsType< typeof actions>

export default appReducer;