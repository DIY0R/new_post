import React, { useEffect } from "react";
import Profile from "./ProfileInfo/Profile";
import { connect } from "react-redux";
import {
  addPost,
  ProfileSet,
  ProfilePhoto, SaveProfile, ProfileStatusGet, setLike
} from "../../../Redux/Profle-reducer";
import { compose } from "redux";
import FileProtection from "../../hoc/FileProtection";
import { withRouter } from "react-router-dom";

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.id;
    }
    if (!userId) {
      this.props.history.push("/login");
    }
    this.props.ProfileSet(userId);
    this.props.ProfileStatusGet(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {

    return (
      <>
        <Profile {...this.props} isOwner={!this.props.match.params.userId} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  ProfilePost: state.ProfileRedcer,
  followingInProgress: state.ProfileRedcer.followingInProgress,
  isAuth: state.auth.isAuth,
  profile: state.ProfileRedcer.profile,
  id: state.auth.id,
  isLoader: state.ProfileRedcer.isLoader,
  status: state.ProfileRedcer.status,

});

export default compose(
  connect(mapStateToProps, { addPost, ProfileSet, ProfilePhoto, SaveProfile, ProfileStatusGet, setLike }),
  FileProtection,
  withRouter
)(ProfileContainer);

