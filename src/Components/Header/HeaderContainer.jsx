import React,{useEffect} from 'react';
import styles from './Header.module.css';
import Header from "./Header";
import {compose} from "redux";
import {connect} from "react-redux";
import {LoginDelete, RequestinApi} from "../../Redux/auth-reducer";

const HeaderContainer = (props) => {
    useEffect(()=>{
        props.RequestinApi()
    },[]);
    return (
        <>
            <Header {...props}/>
        </>
    );
};
const mapStateToProps = (state)=>({
    myGiven:state.auth,
    isAuth:state.auth.isAuth,
});

export default compose(connect(mapStateToProps,{RequestinApi,LoginDelete}))(HeaderContainer);
