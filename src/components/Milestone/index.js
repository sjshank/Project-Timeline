
import React from 'react';
import BusinessMilestone from './BusinessMilestone';
import styles from './milestone.module.less';

const Milestone = (props) => {
    return (
        <div className={props.isBottomMilestoneBar === 'true' ? styles.milestoneBarBottom : styles.milestoneBar}>
            {props.isBottomMilestoneBar !== 'true' && <BusinessMilestone isBottomMilestoneBar="false" />}
            <ul
                className='d-none'>
                <li></li>
            </ul>
            {props.isBottomMilestoneBar === 'true' && <BusinessMilestone isBottomMilestoneBar="true" />}
        </div>
    );
};


export default React.memo(Milestone);
