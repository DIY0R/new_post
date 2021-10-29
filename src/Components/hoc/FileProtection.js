import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const FileProtection = Components => {
  const FileRedirect = props => {
    if (props.isAuth === false) {
      return <Redirect to={"/Login"} />;
    }
    return <Components {...props} />;
  };
  let mapStateToProps = state => ({
    isAuth: state.auth.isAuth
  });
  const FileRedirectSet = connect(mapStateToProps, null)(FileRedirect);
  return FileRedirectSet;
};

export default FileProtection;
