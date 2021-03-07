
import React from 'react';
import styles from './quarter.module.less';

const Quarter = (props) => {
    return (
        <div className={styles.quarterRowSection}>
            <div className="row pl-0 pr-0 ml-0 mr-0">
                {props.quarters.map((quarter, ind) => {
                    return (
                        <React.Fragment key={quarter + ind}>
                            <div className={`col-4 text-center pl-0 pr-0 ml-0 mr-0 ${styles.eachQuarter}`}>
                                {quarter}
                            </div>
                        </React.Fragment>);
                })}
            </div>
        </div >
    );
};


export default React.memo(Quarter);
