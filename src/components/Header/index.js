
import React, { useContext, useEffect, useRef } from 'react';
import _ from 'lodash';
import { RoadmapContext } from '../../context';
import ExcelReader from '../../containers/ExcelReader';
import ExcelGuidelines from '../Guidelines';
import styles from './header.module.less';

const Header = (props) => {
    const { title = "", years = [], quarters = [] } = props;
    const selectedYear = useRef(new Date().getFullYear());
    const selectedQuarter = useRef(_.join(quarters.slice(0, 2), "-"));
    const roadmapContext = useContext(RoadmapContext);
    const { populateTimelineData, roadmapState } = roadmapContext;

    const handleYearChange = (e) => {
        selectedYear.current = e.currentTarget.value;
        populateTimelineData(e.currentTarget.value, _.isEmpty(selectedQuarter.current) ? _.join(quarters.slice(0, 2), "-") : selectedQuarter.current);
    }

    const handleQuarterChange = (e) => {
        selectedQuarter.current = e.currentTarget.value;
        populateTimelineData(selectedYear.current, e.currentTarget.value);
    }

    return (
        <>
            <ExcelGuidelines></ExcelGuidelines>
            <div className="col-9 text-center d-flex">
                <h2 className={styles.title}>Project Timeline</h2>
                <ExcelReader />
            </div>
            {quarters.length > 0 && <div className="col-3 text-center pl-0 pr-0 ml-0 mr-0">
                {years.length > 0 && <select className={styles.yearDropdown} onChange={handleYearChange} value={selectedYear.current}>
                    {years.map((year, ind) => {
                        return <option key={year + "-" + ind} value={year}>{year}</option>
                    })}
                </select>}
                {quarters.length > 0 && <select className={styles.quarterDropdown} onChange={handleQuarterChange} value={_.join(quarters.slice(0, 2), "-")}>
                    <option value="Q1-Q2">Q1-Q2</option>
                    <option value="Q2-Q3">Q2-Q3</option>
                    <option value="Q3-Q4">Q3-Q4</option>
                </select>}
            </div>}
        </>
    );
};


export default Header;
