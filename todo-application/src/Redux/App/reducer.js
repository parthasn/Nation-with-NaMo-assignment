import { ADD_TASK, TOGGLE_TASK, SORT_BY_TIME } from './actionTypes'
import { loadData, saveData, removeData } from '../localStorage'

export const initState = {
   
    todo: loadData("tasks") || [],
    sortByTime: "desc",
    

}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TASK:
            saveData('tasks', [...state.todo, payload]);
            return {
                ...state,
                todo: [...state.todo, payload]
        };

        // case SORT_BY_TIME:
        //     saveData('sortByTime', payload );
        //     return {
        //         ...state,
        //         sortByTime: payload
        // };
        

        default:
            return state;
    }
};

export default reducer;

