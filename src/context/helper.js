import { parseTimelineData } from '../services/populateTimeline.js';

//populate timeline data based on user selected calendar or uploaded file
export const populateTimelineData = (state, action) => {
    const Filter_State = {
        itPillars: new Set(),
        businessValues: new Set()
    };
    let { timeline, projectLegends, filter } = { ...state };
    //Removed localstorage
    if (sessionStorage && sessionStorage.getItem("roadmapJSON")) {
        //if (action.masterData) {
        //Removed localstorage
        const roadmapData = JSON.parse(sessionStorage.getItem("roadmapJSON"));
        //const roadmapData = action.masterData;
        try {
            if (roadmapData && roadmapData.data) {
                timeline = { ...parseTimelineData({ ...roadmapData.data }, { year: action.year, quarter: action.quarter }) };
                projectLegends = {};
            }
        } catch (err) {
            console.error("Error while loading data ", err);
        }
    }
    //}
    return {
        ...state,
        timeline,
        filter: Filter_State,
        projectLegends
    };
}

//parse and populate timeline data from uploaded file
export const updateTimelineDataFromFile = (state, action) => {
    let { timeline, projectLegends } = { ...state };
    const updatedData = action.updatedData;
    if (updatedData && updatedData.data) {
        try {
            if (updatedData && updatedData.data) {
                timeline = { ...parseTimelineData({ ...updatedData.data }) };
                projectLegends = {};
            }
        } catch (err) {
            console.error("Error while loading data ", err);
        }
    }
    return {
        ...state,
        timeline,
        projectLegends
    };
}

