import {users} from "../api/server-requests";
import {FollowUnfollow} from "./utilits/FoolowUnHelper";
import {ActionsType, BaseThunkType} from "./store";

const USERS = 'USERS';
const IS_LOADER = 'IS_LOADER';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const CURRENT_PAGE = 'CURRENT_PAGE';
const FOLLOW  = 'FOLLOW';
const UN_FOLLOW = 'UN_FOLLOW';

type photosType = {
    small:string|null,
    large:string|null, 
}
// ---------
  export  type UserType = {
    name: string,
    id: number,
    status: string,
    photos: photosType,
    followed: boolean,
}; 
// ---------------
const initialState = {
    users: [] as Array<UserType>,
    isLoader: false,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
};
type InitialState = typeof initialState;


 

const UsersReducer = (state = initialState, action:UserActionTypes):InitialState => {
    switch (action.type) {
        case USERS:{
            return {
                ...state,
                users:action.user
            }
        }
        case IS_LOADER:{
            return {
                ...state,
                isLoader:action.isLoad
            }
        }  case SET_TOTAL_USERS_COUNT:{
            return {
                ...state,
                totalUsersCount:action.total
            }
        }case CURRENT_PAGE:{
            return {
                ...state,
                currentPage:action.page
            }
        }
       case FOLLOW:{
           return{
               ...state,
               users:FollowUnfollow(state,action,true),
           }
       }
        case UN_FOLLOW:{
           return{
               ...state,
               users:FollowUnfollow(state,action,false),
           }
       }
        default :
            return state;
    }
};




const actions = {
    setTotalUsersCount : (total:number)=>({type:SET_TOTAL_USERS_COUNT,total} as const ),
     isLoader : (isLoad:boolean)=>({type:IS_LOADER,isLoad}as const ),
    setCurrentPage : (page:number)=>({type:CURRENT_PAGE,page}as const ),
    follow  :(id:number)=>({type:FOLLOW,id}as const ),
     usersData :(user:Array<UserType>)=>({type:USERS,user}as const ),
    UnFollowSet :(id:number)=>({type:UN_FOLLOW,id}as const )

}

type UserActionTypes = ActionsType<typeof  actions>
type ThunkType = BaseThunkType< UserActionTypes>

const {setTotalUsersCount,isLoader,setCurrentPage,follow,usersData,UnFollowSet} = actions
export const FollowInquiry = (id:number):ThunkType=> async (dispatch)=>{
   let response  = await users.follow(id);
   if(response.data.resultCode ===0){
    dispatch(follow(id));
   }
}
export const UnFollowInquiry = (id:number):ThunkType=> async (dispatch)=>{
   let response  = await users.UnFollow(id);
   if(response.data.resultCode ===0){
    dispatch(UnFollowSet(id));
   }
}

export const TakeDataUsers = (currentPage:number,pageSize:number):ThunkType => async (dispatch) => {
    dispatch(isLoader(true));
    dispatch(setCurrentPage(currentPage))
    let usersDataApi = await users.users(currentPage,pageSize);
    dispatch(isLoader(false));
    dispatch(setTotalUsersCount(usersDataApi.totalCount));
    dispatch(usersData(usersDataApi.items));
}

export default UsersReducer;