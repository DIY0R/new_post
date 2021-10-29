import React from "react";
import styles from "./Users.module.css";
import logoUser from "./usersLogo/abstract-user-flat-3.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../types/types";

type PropsTypes = {
   users:Array<UserType>,
   FollowInquiry:(usesId:number)=>void,
   UnFollowInquiry:(usesId:number)=>void
}


const Users:React.FC<PropsTypes> = ({ users, FollowInquiry, UnFollowInquiry }) => {
  return (
    <div>
      {users.map(users => (
        <div className={styles.users}>
          <NavLink to={"/Profile/" + users.id} className={styles.activNameSet}>
            {users.photos.large ? (
              <img src={users.photos.large} alt="logo" />
            ) : (
              <img src={logoUser} alt="" />
            )}
            <br /> <strong>{users.name}</strong>
          </NavLink>
          <br />
          <strong>{users.id}</strong>
          <br />
          {users.followed ? (
            <button
              onClick={() => {
                UnFollowInquiry(users.id);
              }}
            >
              UNFollow
            </button>
          ) : (
            <button
              onClick={() => {
                FollowInquiry(users.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
export default Users;
