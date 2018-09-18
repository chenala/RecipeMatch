import { TOGGLE_COURSE, ADD_COURSE, RESET_STORE } from '../actions/actionTypes';

function courseReducer(state = null, action) {
    const newCoursesObj = state ? Object.assign({}, state) : {};
    
    switch (action.type) {
        case TOGGLE_COURSE:
            const newCourse = { selected: !state[action.course].selected };
            newCoursesObj[action.course] = newCourse;
            return newCoursesObj;
        case ADD_COURSE:
            newCoursesObj[action.course] = { selected: false };
            return newCoursesObj;
        case RESET_STORE:
            return null;
        default:
            return (newCoursesObj || null);
    }
}

export default courseReducer;
