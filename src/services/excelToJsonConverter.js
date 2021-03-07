
import * as AppConstant from "../config/appConstants";
import _ from 'lodash';


export const convertToJSON = (inputExcelData) => {
    try {
        const convertedJSON = {
            "data": {
                "title": "",
                "years": []
            }
        };
        if (_.isArray(inputExcelData) && inputExcelData.length > 0) {
            inputExcelData.forEach(record => {
                let constructedSDate = new Date(null);
                if (record["Projection_Date"]) {
                    const projectionDtArr = record["Projection_Date"] ? record["Projection_Date"].split("-") : [];
                    const projectionDtStr = (!_.isUndefined(projectionDtArr[0]) && !_.isUndefined(projectionDtArr[1]))
                        ? AppConstant.MONTH_ROMAN_MAPPING_ENUM[projectionDtArr[0].toUpperCase()] + '/1/' + projectionDtArr[1] : null;
                    constructedSDate = new Date(projectionDtStr);
                }
                const sDateMonth = constructedSDate.getMonth() + 1;
                const sDateMonthStr = AppConstant.MONTH_MAPPING_ENUM[sDateMonth];
                const sDateYear = constructedSDate.getFullYear();
                const quarterStr = AppConstant.QUARTER_MAPPING_ENUM[sDateMonthStr];
                let doesYearExist = false;
                let doesQuartersExist = false;
                //Populate year and quarter exist flag 
                _.isArray(convertedJSON.data.years) && convertedJSON.data.years.forEach(eachYearRecord => {
                    if (eachYearRecord && eachYearRecord['year'] === sDateYear.toString()) {
                        doesYearExist = true;
                        if (eachYearRecord['quarters']) {
                            doesQuartersExist = true;
                        }
                    }
                });
                if (doesYearExist && doesQuartersExist) {
                    _.isArray(convertedJSON.data.years) && convertedJSON.data.years.forEach(eachYearRecord => {
                        //check if year and quarters exist
                        if (!_.isUndefined(eachYearRecord) && eachYearRecord['year'] === sDateYear.toString() && eachYearRecord['quarters']) {
                            //check if quarter object exist
                            if (!_.isUndefined(eachYearRecord['quarters'][quarterStr])) {
                                //check if month object and respective records exist
                                if (_.isArray(eachYearRecord['quarters'][quarterStr][sDateMonthStr])) {
                                    eachYearRecord['quarters'][quarterStr][sDateMonthStr].push(_getProjectDetailsPopulated(record))
                                } else {
                                    //Add month object and respective records if doesn't exist
                                    eachYearRecord['quarters'][quarterStr][sDateMonthStr] = new Array(_getProjectDetailsPopulated(record));
                                }
                            } else {
                                //Add quarter object if doesn't exist
                                !_.isUndefined(quarterStr) ? eachYearRecord.quarters[quarterStr] = {
                                    [sDateMonthStr]: new Array(_getProjectDetailsPopulated(record))
                                } : null;
                            }
                        }
                    });
                } else {
                    //Add year and quarters if doesn't exist
                    if (!_.isUndefined(sDateYear) && !_.isNaN(sDateYear) && sDateYear > 1990 && !_.isUndefined(quarterStr) && !_.isNaN(quarterStr) && !_.isUndefined(sDateMonthStr) && !_.isNaN(sDateMonthStr)) {
                        convertedJSON.data.years.push({
                            "year": sDateYear.toString(),
                            "quarters": {
                                [quarterStr]: {
                                    [sDateMonthStr]: new Array(_getProjectDetailsPopulated(record))
                                }
                            }
                        })
                    }
                }
            });
            return convertedJSON;
        }
    } catch (err) {
        console.error("---error while processing data----", err);
    }
}

const _getProjectDetailsPopulated = (record = {}) => {
    return {
        "capabilityId": record["Project_ID"],
        "title": record["Project_Name"],
        "description": record.Description,
        "pilot": record["Pilot"],
        "fullRollout": record["Full_Rollout"],
        "status": record["Status"]
    };
}
