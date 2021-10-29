import {authApi} from "../api/server-requests";
import {stopSubmit} from "redux-form";
import { ActionsType, BaseThunkType } from "./store";
import { ThunkAction } from "redux-thunk";
const DATA = 'DATA';
const CAPTCHA_URL = 'CAPTCHA_URL';
type NullbleType<T> = null |T
const initialState= {
    id: null as  NullbleType<number>,
    email: null as NullbleType<string>,
    login: null as NullbleType<string>,
    isAuth: false as NullbleType<boolean>,
    captcha:null as NullbleType<string>,
};

type InitialStateType = typeof initialState
const AuthReducer = (state = initialState, action:AuthReducerType):InitialStateType => {
    switch (action.type) {
        case DATA:
        case CAPTCHA_URL:{
            return {
                ...state,
                ...action.payload,
            }
        }
        default :
            return state;
    }
};


const actions = {
    receivingData : (id:number|null, email:string|null, login:string|null, isAuth:boolean) => ({
    type: DATA, 
    payload: {id, email, login, isAuth}} as const),

 captchaUrl:(captcha:string) => ({type: CAPTCHA_URL, payload: {captcha}} as const )
}
const {receivingData,captchaUrl } = actions



const SecurityCaptcha = ():ThunkType => async (dispatch)=>{
    const response = await authApi.SecurityCaptcha();
    if (response){
        dispatch(captchaUrl(response.data.url));
    }
}
export const RequestinApi = ():ThunkType => async (dispatch) => {
    let response = await authApi.authRequest();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(receivingData(id, email, login, true));
    }
};
export const authLoginPost = (email:string,password:string,rememberMe:boolean,captcha:string):ThunkType=> async (dispatch)=>{
    let responce =  await  authApi.authLoginPost(email,password,rememberMe,captcha);
    if (responce.data.resultCode ===0){
        dispatch(RequestinApi());
    } else {
        if (responce.data.resultCode ===10){
        dispatch(SecurityCaptcha())
        }
        let messages = responce.data.messages.length >0 ? responce.data.messages[0]:'some Errors';
      dispatch( stopSubmit('SignIn',{_error:messages}));
    }
};
export const LoginDelete = ():ThunkType => async (dispatch) => {
    let res = await authApi.authLoginDelete();
    if (res.data.resultCode === 0) {
      dispatch(receivingData(null,null,null,false,));
    }
};


type AuthReducerType   = ActionsType<typeof actions>
type ThunkType = BaseThunkType<AuthReducerType| ReturnType<typeof stopSubmit>> ;
export default AuthReducer;