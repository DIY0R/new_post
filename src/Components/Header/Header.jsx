import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const Header = (props) => {
    const exite = ()=>{
        props.LoginDelete();
    }
    return (
        <>
            <header className={styles.header}>
                {/* <span className={styles.section}><strong className={styles.nameProjects}>New-post</strong></span> */}

                {props.isAuth?
                    <span className={styles.login}> <img className={styles.logo}
                                   src="https://img.icons8.com/small/16/000000/administrator-male.png" alt='logo'/> {props.myGiven.login} <button onClick={exite}>Exite</button>

                </span>:
                    <Button className={styles.loginSet} variant="contained" color="primary">
                        <NavLink  to={'./Login'}>Login</NavLink>
                    </Button>
                }
              {/* <span className={styles.search}><input   type="text" placeholder={'Search'}/></span> */}
            </header>
        </>
    );
};

export default Header;
