export const FollowUnfollow = (state,action,follow)=>{
    
      return  state.users.map(u=>{
            if(u.id === action.id){
              return{
                  ...u,
                  followed:follow
              }
            }
            return u;
           })  
    
};