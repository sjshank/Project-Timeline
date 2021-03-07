
import React from 'react';
import Grow from '@material-ui/core/Grow';
import ProjectTooltip from './Tooltip';
import * as AppConstant from '../../config/appConstants';
import styles from './project-bubble.module.less';

const ProjectBubble = (props) => {
    const { projectData } = props;
    const { status } = projectData;

    return (
        <Grow in={true} {...{ timeout: AppConstant.BUBBLE_GROW_EFFECT_TIMER }} >
            <li className={`${props.isInverted === 'true' ? styles.down : styles.up} 
                        ${props.isInverted !== 'true' ? 'project-bubble-up' : 'project-bubble-down'} 
                        ${projectData.priority === 'High' ? styles.highPriority :
                    projectData.priority === 'Medium' ? styles.mediumPriority :
                        projectData.priority === 'Low' ? styles.lowPriority : ''}`}>
                <div className={styles.dot}>
                    <span className={`${styles.circle} ${styles.topCircle} ${styles[AppConstant.STATUS_ENUM[status]]}`} />
                </div>
                <div className={styles.content}>
                    <ProjectTooltip isInverted={props.isInverted} projectData={props.projectData} />
                </div>
                <div className={styles.dot}>
                    <span className={`${styles.squareDot}`} />
                </div>
            </li>
        </Grow>
    );
};


export default React.memo(ProjectBubble);
