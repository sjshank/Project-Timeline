
import React, { useContext } from 'react';
import _ from 'lodash';
import { Alert, AlertTitle } from '@material-ui/lab';
import Timeline from '../../components/Timeline';
import Header from '../../components/Header';
import { RoadmapContext } from '../../context';
import styles from './roadmap.module.less';


const Roadmap = (props) => {
    const roadmapContext = useContext(RoadmapContext);
    const { roadmapState } = roadmapContext;

    return (
        <>
            <div className={`row pl-0 pr-0 ml-0 mr-0 ${styles.topSection}`}>
                <Header title={roadmapState.header.title} years={roadmapState.timeline.listOfYear} quarters={roadmapState.timeline.listOfQuarter} />
            </div>
            {!_.isEmpty(roadmapState) &&
                <>
                    <div className="row pl-0 pr-0 ml-0 mr-0">
                        <div className={`text-center pl-0 pr-0 ml-0 mr-0 col-12`}>
                            {!_.isEmpty(roadmapState.timeline) && <Timeline timelineData={roadmapState.timeline} />}
                        </div>
                    </div>
                </>
            }
            {_.isEmpty(roadmapState) &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Something went wrong. Please try after sometime !
                </Alert>
            }
        </>
    );
};


export default Roadmap;
