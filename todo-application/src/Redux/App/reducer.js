import { ADD_TASK, TOGGLE_TASK, SORT_BY_TIME } from './actionTypes'
import { loadData, saveData, removeData } from '../localStorage'

export const initState = {
   
    todo: loadData("tasks") || [],
    completedTodo: loadData("completed") || [],
    pending: loadData("pending") || [],
    sortByTime: "desc",
    

}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TASK:
            saveData('tasks', [...state.todo, payload]);
            saveData('pending', [...state.pending, payload]);
            console.log("reducer", payload)
            return {
                ...state,
                todo: [...state.todo, payload],
                pending: [...state.pending, payload]
        };

        case TOGGLE_TASK:
            let newTodo = state.todo.find(item => item.id === payload)
            newTodo.status = !newTodo.status
            newTodo.completionTime = Date.now()
            saveData('completed', [...state.completedTodo, newTodo]);
            saveData('pending', state.pending.filter((item) => item.id !== payload));
            
            if(newTodo.status){
                return {
                
                    ...state,
                    pending: state.pending.filter((item) => item.id !== payload),
                    completedTodo: [...state.completedTodo, newTodo]
    
                }
            }
            
        default:
            return state;
    }
};

export default reducer;

