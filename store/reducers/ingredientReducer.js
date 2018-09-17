import { TOGGLE_INGREDIENT, ADD_INGREDIENT, RESET_STORE } from '../actions/actionTypes';

/**
 * Given the previous state and action, returns the INGREDIENTS object of the update state.
 * @param {Object} state the previous state
 * @param {Object} action the action
 * @returns {Object} the INGREDIENTS object of the updated state
 */
function ingredientReducer(state = null, action) {
    const newIngredientsObj = state ? Object.assign({}, state) : {};
    
    switch (action.type) {
        case TOGGLE_INGREDIENT:
            const newIngredient = {...state[action.ingredient.id], selected: !state[action.ingredient.id].selected };
            newIngredientsObj[action.ingredient.id] = newIngredient;
            return newIngredientsObj;
        case ADD_INGREDIENT:
            newIngredientsObj[action.ingredient.id] = {
                probability: action.ingredient.value, name: action.ingredient.name, selected: false
            };
            return newIngredientsObj;
        case RESET_STORE:
            return null;
        default:
            return (newIngredientsObj || null);
    }
}

export default ingredientReducer;
