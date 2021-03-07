import _ from 'lodash';
import * as AppConstant from "../config/appConstants";


//Extract and Populate timline data from JSON data
export const parseTimelineData = (data, userSelectedCalendar = { year: null, quarter: null }) => {
    try {
        const currentDate = new Date();
        const listOfYear = new Set();
        listOfYear.add(currentDate.getFullYear())
        const filteredRecords = _.isArray(data.years) && data.years.filter(record => {
            listOfYear.add(_.toNumber(record.year));
            if (!_.isNull(userSelectedCalendar.year)) {
                if (record.year.toString() === userSelectedCalendar.year.toString()) {
                    return record;
                }
            } else {
                if (record.year.toString() === currentDate.getFullYear().toString()) {
                    return record;
                }
            }
        });
        const defaultMonth = _.toNumber(currentDate.getMonth() + 1);
        const defaultYear = _.toNumber(!_.isNull(userSelectedCalendar.year) ? userSelectedCalendar.year.toString() : currentDate.getFullYear());
        const currentYearRecord = (_.isArray(filteredRecords) && !_.isUndefined(filteredRecords[0])) ? filteredRecords[0] : null;
        const { quarters, quarterRange } = _populateQuarters(defaultMonth, defaultYear, userSelectedCalendar);

        return {
            listOfYear: listOfYear ? Array.from(listOfYear).sort() : [],
            listOfQuarter: quarters,
            listOfMonth: [..._.flatten(_populateMonths(data, defaultYear, quarters, currentYearRecord, quarterRange))],
            selectedYear: defaultYear,
            selectedMonth: defaultMonth,
            selectedQuarter: quarterRange
        };
    } catch (err) {
        console.error(err);
        throw "Error in parsing timeline data";
    }
};

//Populate odd and even project list for each month
export const parseProjectBubbles = (records) => {
    const parsedResult = [];
    let evenCount = 0;
    let oddCount = 0;
    _.isArray(records) && records.forEach((record, index) => {
        if (index < 6) {
            if (index % 2 === 0) {
                record['isEven'] = true;
                evenCount === 0 ? record['priority'] = 'Low' : null;
                evenCount === 1 ? record['priority'] = 'Medium' : null;
                evenCount === 2 ? record['priority'] = 'High' : null;
                parsedResult.push(record);
                evenCount = evenCount + 1;
            }
            else {
                record['isOdd'] = true;
                oddCount === 0 ? record['priority'] = 'Low' : null;
                oddCount === 1 ? record['priority'] = 'Medium' : null;
                oddCount === 2 ? record['priority'] = 'High' : null;
                parsedResult.push(record);
                oddCount = oddCount + 1;
            }
        }
    });
    return parsedResult;
};



//populate quarters based on system date or user selected calendar
const _populateQuarters = (currentMonth, currentYear, userSelectedCalendar) => {
    try {
        let quarters = ["Q1", "Q2", "Q3"];
        let quarterRange = "Q1-Q2";
        if (userSelectedCalendar && !_.isNull(userSelectedCalendar.quarter)) {
            quarterRange = userSelectedCalendar.quarter;
            userSelectedCalendar.quarter === "Q2-Q3" ? quarters = ["Q2", "Q3", "Q4"] : null;
            userSelectedCalendar.quarter === "Q3-Q4" ? quarters = ["Q3", "Q4", "Q1 ".concat(_.toNumber(userSelectedCalendar.year) + 1)] : null;
            return { quarters, quarterRange };
        } else {
            if (currentMonth >= 1 && currentMonth <= 3) {
                quarters = ["Q1", "Q2", "Q3"];
                quarterRange = "Q1-Q2";
            } else if (currentMonth >= 4 && currentMonth <= 6) {
                quarters = ["Q2", "Q3", "Q4"];
                quarterRange = "Q2-Q3";
            } else if (currentMonth >= 7 && currentMonth <= 9) {
                quarters = ["Q3", "Q4", "Q1 ".concat(currentYear + 1)];
                quarterRange = "Q3-Q4";
            } else if (currentMonth >= 10 && currentMonth <= 12) {
                quarters = ["Q3", "Q4", "Q1 ".concat(currentYear + 1)];
                quarterRange = "Q3-Q4";
                //TO-DO update to Q4 2020, Q1 2021 & slice of Q2 2021. Temp asked. Need to revert
                // quarters = ["Q4", "Q1 ".concat(currentYear + 1), "Q2 ".concat(currentYear + 1)];
                // quarterRange = "Q4-Q1";
            }

            return { quarters, quarterRange };
        }
    } catch (err) {
        console.error(err);
        throw "Error in populating quarters";
    }
}


//populate and structure project records for each month based on system date or user selected calendar
const _populateMonths = (data = {}, defaultYear, listOfQuarter, currentYearRecord = {}, quarterRange) => {
    try {
        let listOfMonth = [];
        listOfMonth = !_.isUndefined(quarterRange) && AppConstant.QUARTER_MONTH_MAPPING_ENUM[quarterRange].map(mon => Object({ 'label': mon, 'records': [] }));
        if (_.isArray(listOfQuarter)) {
            listOfQuarter.forEach((quarter, ind) => {
                if (!_.isNull(currentYearRecord) && !_.isUndefined(currentYearRecord['quarters'])) {
                    currentYearRecord['quarters'][quarter] && Object.keys(currentYearRecord['quarters'][quarter]).forEach((month, ind) => {
                        listOfMonth.forEach(item => item['label'] === month ? item['records'] = currentYearRecord['quarters'][quarter][month] : '');
                    });
                }
            });
            if (!_.isUndefined(listOfQuarter[1]) && listOfQuarter[1] === "Q4") {
                const outputArr = data && data.years.filter(record => {
                    if (record.year.toString() === (defaultYear + 1).toString()) {
                        return record;
                    }
                });
                const nextYearRecord = outputArr[0];
                nextYearRecord && nextYearRecord['quarters']['Q1'] && Object.keys(nextYearRecord['quarters']['Q1']).forEach((month, ind) => {
                    listOfMonth.forEach(item => item['label'] === month ? item['records'] = nextYearRecord['quarters']['Q1'][month] : '');
                });
                // listOfMonth.forEach((item, ind) => item['label'] === 'JAN' ?
                //     item['records'] = (
                //         nextYearRecord && nextYearRecord['quarters'] && nextYearRecord['quarters']['Q1']
                //     ) ? nextYearRecord['quarters']['Q1'][]
                //         : []
                //     : '');
            } else {
                // if (!_.isUndefined(listOfQuarter[2]) && !_.isNull(currentYearRecord) && !_.isUndefined(currentYearRecord['quarters'])) {
                //     const _months = currentYearRecord['quarters'][listOfQuarter[2]] ? Object.keys(currentYearRecord['quarters'][listOfQuarter[2]]) : [];
                //     if (_.isArray(_months) && _months.length > 0) {
                //         listOfMonth.forEach((item, ind) => {
                //             if (item['label'] === _months[0]) {
                //                 item['records'] = currentYearRecord['quarters'][listOfQuarter[2]][_months[0]]
                //             }
                //         });
                //     }
                // }




                //TO-DO update to Q4 2020, Q1 2021 & slice of Q2 2021. Temp asked. Need to revert
                // if (!_.isUndefined(listOfQuarter[0]) && listOfQuarter[0] === "Q4" && listOfQuarter[1] === "Q1 ".concat(defaultYear + 1) && listOfQuarter[2] === "Q2 ".concat(defaultYear + 1)) {
                //     const outputArr = data && data.years.filter(record => {
                //         if (record.year.toString() === (defaultYear + 1).toString()) {
                //             return record;
                //         }
                //     });
                //     const nextYearRecord = outputArr[0];
                //     listOfMonth.forEach(item => (item['label'] === 'JAN' || item['label'] === 'FEB' || item['label'] === 'MAR' || item['label'] === 'APR') ?
                //         item['records'] = (
                //             nextYearRecord && nextYearRecord['quarters'] && nextYearRecord['quarters'][item['label'] === 'APR' ? 'Q2' : 'Q1'] && nextYearRecord['quarters'][item['label'] === 'APR' ? 'Q2' : 'Q1'][item['label']]
                //         ) ? nextYearRecord['quarters'][item['label'] === 'APR' ? 'Q2' : 'Q1'][item['label']]
                //             : []
                //         : '');
                // }
                //TO-DO update to Q4 2020, Q1 2021 & slice of Q2 2021. Temp asked. Need to revert


            }
        }
        //Removed localstorage
        sessionStorage ? sessionStorage.setItem("timelineData", JSON.stringify(listOfMonth)) : null;
        return listOfMonth;
    } catch (err) {
        console.error(err);
        throw "Error in populating months";
    }
}


//Execute timeline data filter logic based on selected IT Pillars
export const filterTimelineData = (itPillars = [], businessValues = []) => {
    try {
        //Removed localstorage
        const storedData = sessionStorage ? JSON.parse(sessionStorage.getItem("timelineData")) : {};
        //const storedData = [];
        const filteredData = storedData.map(store => {
            const itPillarResult = store.records.filter(projRecord => {
                if (itPillars.indexOf(projRecord['itPillar']) < 0) {
                    return projRecord;
                }
            });
            store.records = itPillarResult;
            return store;
        });
        return filteredData;
    } catch (err) {
        console.error(err);
        throw "Error in filtering data";
    }
}

//Populate location margin left distance based on today's date
export const populateLocationMarginForDate = (input) => {
    if (_.inRange(input, 1, 6)) {
        return 5;
    }
    else if (_.inRange(input, 6, 11)) {
        return 10;
    }
    else if (_.inRange(input, 11, 16)) {
        return 15;
    }
    else if (_.inRange(input, 16, 21)) {
        return 20;
    }
    else if (_.inRange(input, 21, 26)) {
        return 25;
    }
    else if (_.inRange(input, 26, 32)) {
        return 30;
    } else {
        return null;
    }
}