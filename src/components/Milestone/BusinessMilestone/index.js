
import React from 'react';
import styles from './business-milestone.module.less';

const BusinessMilestone = (props) => (
    <ul
        className={`${styles.businessMilestoneBar} ${props.isBottomMilestoneBar === 'true' ? styles.businessMilestoneBarBottom : ''} d-flex align-items-center justify-content-start pl-0 pb-0 mb-0`}>
        <li className={styles.businessMilestoneLbl}>Milestone</li>
    </ul>
);


export default React.memo(BusinessMilestone);
