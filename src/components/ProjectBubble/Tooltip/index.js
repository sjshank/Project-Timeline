import React from 'react';
import _ from 'lodash';
import * as AppConstant from '../../../config/appConstants';
import styles from './project-tooltip.module.less';

const ProjectTooltip = (props) => {
    const { projectData } = props;

    return (
        <div className={`tooltip-box ${styles.tooltipBox} 
                        ${props.isInverted === 'true' ? styles.tooltipBoxBottom : styles.tooltipBoxTop} ${styles[AppConstant.IT_PILLARS_ENUM[projectData.itPillar]]}
                        ${projectData.priority === 'High' ? styles.highPriority :
                projectData.priority === 'Medium' ? styles.mediumPriority :
                    projectData.priority === 'Low' ? styles.lowPriority : ''}`}>

            <strong className={styles.projectName} title={projectData.title}>{projectData.title}</strong>
            <p title={projectData.description} className={styles.desc}>{projectData.description}</p>
            <div className="clearfix pt-1">
                <div className="clearfix">
                    <ul className={styles.releaseInfoBar}>
                        {projectData.pilot &&
                            <li className="">
                                <span>Pilot: {projectData.pilot}</span>
                            </li>
                        }
                        {projectData.fullRollout &&
                            <li className="">
                                <span>Full Rollout: {projectData.fullRollout}</span>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
};


export default React.memo(ProjectTooltip);
