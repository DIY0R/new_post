import {applyMiddleware, combineReducers, compose, createStore, Action} from "redux";
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';
import AuthReducer from "./auth-reducer";
import ProfileRedcer from "./Profle-reducer";
import UsersReducer from "./users-reducer";
import appReducer from "./apps-reducer";

const rootReducer = combineReducers({
    auth:AuthReducer,
    form: formReducer,
    usersData:UsersReducer,
    appReducer:appReducer,
    ProfileRedcer: ProfileRedcer,
});

export  type RootReducerType = typeof rootReducer;
export type ActionsType<T> = T extends {[key:string]:(...arg:any[])=> infer U}?U:never 
export type AppStateType = ReturnType<RootReducerType> 
export type BaseThunkType<A extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown,A> ;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
export default  store;