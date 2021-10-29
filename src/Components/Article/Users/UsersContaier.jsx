import React, { useEffect } from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { TakeDataUsers, FollowInquiry, UnFollowInquiry } from "../../../Redux/users-reducer";

import Loader from "../../../loader/Loader";
import Paginator from "./Paginator/Paginator";

const UsersContainer = props => {
  useEffect(() => {
    props.TakeDataUsers(props.currentPage, props.pageSize);
  }, []);
  const setCurrentPage = pageNumber => {
    props.TakeDataUsers(pageNumber, props.pageSize);
  };
  return (
    <>
      {props.isLoader ? (
        <Loader />
      ) : ( 
        <>
          <Paginator
            setCurrentPage={setCurrentPage}
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
          />
          <Users {...props} />
        </>
      )}
    </>
  );
};
const mapStateToProps = state => ({
  users: state.usersData.users,
  isLoader: state.usersData.isLoader,
  totalUsersCount: state.usersData.totalUsersCount,
  pageSize: state.usersData.pageSize,
  currentPage: state.usersData.currentPage
});
export default connect(mapStateToProps, { TakeDataUsers, FollowInquiry,UnFollowInquiry})(UsersContainer);
