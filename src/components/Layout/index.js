
import React from 'react';
import styles from './layout.module.less';

const Layout = (props) => {
    return (
        <div className="container-fluid pl-0 pr-0 ml-0 mr-0">
            <div className={`row pl-0 pr-0 ml-0 mr-0 ${styles.topSection}`}>
                {props.TOP_SECTION}
            </div>
            <div className="row pl-0 pr-0 ml-0 mr-0">
                {props.MAIN_SECTION}
            </div>
        </div>
    );
};


export default Layout;
