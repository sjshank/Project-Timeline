
import React from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faDownload } from '@fortawesome/free-solid-svg-icons';
import * as AppConstant from '../../../config/appConstants';
import styles from './regulations.module.less';


const Regulations = (props) => {

    return (
        <>
            <div className="d-flex p-2">
                <div className={styles.doSection}>
                    <ul className="d-flex pl-2">
                        <li><FontAwesomeIcon className={styles.thumbsUp} icon={faThumbsUp} size="lg" /></li>
                        <li><h5 className="pl-1">The Do's</h5></li>
                    </ul>
                    <ul>
                        {AppConstant.EXCEL_DOS.map((excelDo, ind) => {
                            return <li key={`ind-${_.random(0, 1110000)}`} className={styles.eachRegulation} dangerouslySetInnerHTML={{ __html: excelDo }}></li>;
                        })}
                    </ul>
                </div>
                <div className="p-2"></div>
                <div className={styles.dontSection}>
                    <ul className="d-flex pl-2">
                        <li><FontAwesomeIcon className={styles.thumbsDown} icon={faThumbsDown} size="lg" /></li>
                        <li><h5 className="pl-1">The Don'ts</h5></li>
                    </ul>
                    <ul>
                        {AppConstant.EXCEL_DONTS.map((excelDont, ind) => {
                            return <li key={`ind-${_.random(0, 1110000)}`} className={styles.eachRegulation} dangerouslySetInnerHTML={{ __html: excelDont }}></li>;
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Regulations;