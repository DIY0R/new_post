import React from 'react';
import styles from '../Users.module.css';
const Paginator = (props) => {
    let page = Math.ceil(props.totalUsersCount / props.pageSize) - 136;
    let pageSize = [];
    for (let i = 1; i <= page; i++) {
        pageSize.push(i);
    }
    
    return (<div>
        {pageSize.map(page => {
            return (
             <button className={props.currentPage === page && styles.activPage} onClick={()=>{
                 props.setCurrentPage(page);
             }}>{page} </button>

            )
        })}
    </div>)
};
export default Paginator;