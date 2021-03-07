
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import ProjectBubble from '../../components/ProjectBubble';
import { parseProjectBubbles } from '../../services/populateTimeline.js';
import styles from './month.module.less';

const Month = (props) => {
    const { label, records } = props;
    const [projectBubbles, setProjectBubbles] = useState([]);

    useEffect(() => {
        const parsedResult = parseProjectBubbles([...records]);
        setProjectBubbles(parsedResult);
    }, [records]);


    return (
        <div className={`${styles.monthBar} ${styles[props.class]} month-bar`}>
            <div className={styles.timeline}>
                <div className={styles.month}>{label ? label : 'Month'}</div>
                <ul>
                    {projectBubbles && projectBubbles.map((project, ind) => {
                        if (project.isEven) {
                            return <ProjectBubble key={project.title + ind} isInverted="false" projectData={project} />;
                        }
                        else if (project.isOdd) {
                            return <ProjectBubble key={project.title + ind} isInverted="true" projectData={project} />;
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};


export default React.memo(Month);
