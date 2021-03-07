
import * as actionTypes from './actionTypes';
import * as helper from './helper';

/**
 * Reducer to handle all the dispatched action from RoadmapContext
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const roadmapReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.POPULATE_TIMELINE_DATA:
            return helper.populateTimelineData(state, action);
        default:
            return state;
    }
};
