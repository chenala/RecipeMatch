import { TOGGLE_INGREDIENT, ADD_INGREDIENT, RESET_STORE, TOGGLE_COURSE, ADD_COURSE } from './actionTypes';

function toggleIngredient(ingredient) {
    return {
        type: TOGGLE_INGREDIENT,
        ingredient,
    };
}

function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        ingredient,
    };
}

function toggleCourse(course) {
    return {
        type: TOGGLE_COURSE,
        course,
    };
}

function addCourse(courseName) {
    return {
        type: ADD_COURSE,
        course: courseName,
    };
}

function resetStore() {
    return {
        type: RESET_STORE,
    };
}

export {
    toggleIngredient,
    addIngredient,
    toggleCourse,
    addCourse,
    resetStore,
};

