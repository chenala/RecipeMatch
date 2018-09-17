import {combineReducers} from 'redux';
import ingredientReducer from './ingredientReducer';

/**
 * State structure (so far):
 * {
 *      ingredients: {
 *          <ingredient_id>: {
 *              probability: <number>,
 *              name: <string>,
 *              selected: <boolean>,
 *          }
 *      },
 * }
 */

const reducers = combineReducers({
    ingredients: ingredientReducer,
});

export default reducers;
