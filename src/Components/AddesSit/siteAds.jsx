import React from 'react';
import  styles from './siteAds.module.css';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
const SitAds = (props) => {
    return (
        <>
            <div className={styles.siteAds}>

              {props.userFriends.map(friend=>{
                  return(
                       <div><NavLink to={'/profile/'+friend.id}><strong>{friend.name}</strong></NavLink>   </div>
                  )
              })}

             </div>
        </>
    );
};
 const mapStateToProps = (state)=>({
    userFriends:state.usersData.users.filter(items=>items.followed ===true),
 })
export default connect(mapStateToProps)(SitAds);
