import { TOGGLE_INGREDIENT, ADD_INGREDIENT, RESET_STORE } from './actionTypes';

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

function resetStore() {
    return {
        type: RESET_STORE,
    };
}

export {
    toggleIngredient,
    addIngredient,
    resetStore,
};

