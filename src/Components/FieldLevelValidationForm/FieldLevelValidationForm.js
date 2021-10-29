import React from 'react';
import styles from './FieldLevelValidationForm.module.css'
export const requiredFile = value => {
    if (value) return undefined;
    return 'Field is  Required ';
};
export const maxLength = max => value => {
    if (value.length > max) return `Must be ${max} characters or less`;
    return undefined;
}; 

export const CraeteFildValidation = ({input,meta,...props}) => {
    let hasError = meta.touched && meta.error;
    return (<div className={styles.loginError}>
           <input{...input} {...props}className={hasError? styles.error :''}/>
         { hasError&&<div>
            <div className={styles.loginError +""+styles.errorText}>{meta.error}</div>
        </div>}
    </div>);
};