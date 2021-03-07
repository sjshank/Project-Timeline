
import React from 'react';
import _ from 'lodash';
import Milestone from '../Milestone';
import Month from '../../containers/Month';
import Quarter from '../Quarter';
import styles from "./timeline.module.less";
import './style.css';

const Timeline = (props) => {
    const { timelineData } = props;

    const populateItems = () => {
        const items = [];
        for (let i = 0; i <= 2; i++) {
            items.push(<div key={`item-${_.random(0, 1110000)}`} className={`d-flex ${styles.eachQuarterRange} each-quarter-range`}>
                {timelineData.listOfMonth.map((mData, ind) => {
                    if (i === 0) {
                        if (ind >= 0 && ind <= 2) {
                            return <Month key={mData.label + ind} label={mData.label}
                                records={mData.records}
                                selectedQuarter={timelineData.selectedQuarter}
                                selectedMonth={timelineData.selectedMonth}
                                selectedYear={timelineData.selectedYear} />;
                        }
                    }
                    else if (i === 1) {
                        if (ind >= 3 && ind <= 5) {
                            return <Month key={mData.label + ind} label={mData.label}
                                records={mData.records}
                                selectedQuarter={timelineData.selectedQuarter}
                                selectedMonth={timelineData.selectedMonth}
                                selectedYear={timelineData.selectedYear} />;
                        }
                    } else if (i === 2) {
                        if (ind >= 6) {
                            return <Month key={mData.label + ind} label={mData.label} class="lastMonthBar"
                                records={mData.records}
                                selectedQuarter={timelineData.selectedQuarter}
                                selectedMonth={timelineData.selectedMonth}
                                selectedYear={timelineData.selectedYear} />;
                        }
                    }
                })}
            </div>);
        }
        return items;
    }


    return (
        <>
            <Quarter quarters={timelineData.listOfQuarter} />
            <div className="row pl-0 pr-0 ml-0 mr-0">
                <div className="col-12 text-center pl-0 pr-0 ml-0 mr-0">
                    <Milestone isBottomMilestoneBar="false" selectedQuarter={timelineData.selectedQuarter} />
                    <div className="d-flex ">
                        {populateItems()}
                    </div>
                    <Milestone isBottomMilestoneBar="true" selectedQuarter={timelineData.selectedQuarter} />
                </div>
            </div>
        </>
    );
};


export default Timeline;
