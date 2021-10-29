import React,{useState,useEffect} from 'react';
import styles from './ProfileNewStatus.module.css'

const ProfileStatus = (props)=>{
  const [status,changeStatus] = useState(props.status);
    return(
        <>
          {status}
        </>
    );
};
export default  ProfileStatus;