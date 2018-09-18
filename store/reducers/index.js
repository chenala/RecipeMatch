import {combineReducers} from 'redux';
import ingredientReducer from './ingredientReducer';
import courseReducer from './courseReducer';

/**
 * Store:
 * {
 *      ingredients: {
 *          <ingredient_id>: {
 *              probability: <number>,
 *              name: <string>,
 *              selected: <boolean>,
 *          }
 *      },
 *      courses: {
 *          <course_name>: {
 *              selected: <boolean>
 *          }
 *      }
 * }
 */

const reducers = combineReducers({
    ingredients: ingredientReducer,
    courses: courseReducer,
});

export default reducers;
