
import React, { useReducer } from 'react';
import * as actionTypes from './actionTypes';
import { roadmapReducer } from './reducer';

const RoadmapContext = React.createContext(null);

/**
 *  Initial state of application
 */

const Filter_State = {
    itPillars: new Set(),
    businessValues: new Set()
};

const Initial_State = {
    header: {},
    timeline: {},
    projectLegends: {},
    filter: Filter_State
};



const RoadmapContextProvider = (props) => {
    const [roadmapState, dispatchRoadmapAction] = useReducer(roadmapReducer, Initial_State);

    //Extract and Populate timline data from JSON data based on user selected calendar or uploaded file
    //Removed localstorage. Passing complete master data in masterData object
    const onPopulateTimelineData = (_selectedYear, _selectedQuarter, _masterData) => {
        dispatchRoadmapAction({ type: actionTypes.POPULATE_TIMELINE_DATA, year: _selectedYear, quarter: _selectedQuarter, masterData: _masterData });
    }

    return (
        // populate context provider
        <RoadmapContext.Provider value={{
            roadmapState: roadmapState,
            populateTimelineData: onPopulateTimelineData
        }}>
            {props.children}
        </RoadmapContext.Provider>
    );
};

export { RoadmapContext, RoadmapContextProvider };
