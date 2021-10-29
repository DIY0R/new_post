import React from 'react';
import styles from './Login.module.css'
import {Field, Form, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {authLoginPost} from "../../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {CraeteFildValidation, maxLength, requiredFile} from "../../FieldLevelValidationForm/FieldLevelValidationForm";


const Login = (props)=>{
    let loginPost = (values)=>{
        props.authLoginPost(values.email,values.password,values.checkbox,values.captcha);
    };
    if (props.isAuth){
        return <Redirect to={'/Profile'}/>
    }
    return (<>

         <h1>Login</h1>
        <SignInPage onSubmit={loginPost} captcha={props.captcha}/>

    </>)
};

let maxLengthSet  = maxLength(40)
const SignIn = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Field component={CraeteFildValidation} name={'email'} type={'email'} validate={[requiredFile,maxLengthSet]} placeholder={'email'}/>
            <Field component={CraeteFildValidation} name={'password'} type={'password'} validate={[requiredFile,maxLengthSet]} placeholder={'password'}/>
            <Field component={'input'} name={'checkbox'} type={'checkbox'}/>
            {props.error&& <div className={styles.stopError}>{props.error}</div>}

           <div className={styles.stopErrorCaptcha}>
               {props.captcha &&  <div><img src={props.captcha} alt="captcha"/></div>}
               {props.captcha &&  <Field component={CraeteFildValidation} name={'captcha'} validate={[requiredFile,maxLengthSet]}placeholder={'captcha'}/>}
           </div>
            <button>add</button>
        </Form>
    )
}
const SignInPage = reduxForm({form: "SignIn"})(SignIn)

let mapStateToProps = (state)=>({
    isAuth:state.auth.isAuth,
    captcha:state.auth.captcha,
})
export default connect(mapStateToProps,{authLoginPost})(Login);
