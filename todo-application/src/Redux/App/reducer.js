import { ADD_TASK, TOGGLE_TASK, SORT_BY_TIME } from './actionTypes'
import { loadData, saveData, removeData } from '../localStorage'

export const initState = {
   
    todo: loadData("tasks") || [],
    completedTodo: loadData("completed") || [],
    pendingTodo: loadData("pending") || [],
    sortByTime: "desc",
    

}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TASK:
            saveData('tasks', [...state.todo, payload]);
            //saveData('pending', [...state.pending, payload]);
            return {
                ...state,
                todo: [...state.todo, payload],
                // pending: [...state.pending, payload]
        };

        case TOGGLE_TASK:
            let newTodo = state.todo.find(item => item.id === payload)
            newTodo.status = !newTodo.status
            saveData('completed', [...state.completedTodo, newTodo]);
            //saveData('pending', state.todo.filter((item) => item.id !== payload));
            
            if(newTodo.status){
                return {
                
                    ...state,
                    todo: state.todo.filter((item) => item.id !== payload),
                    completedTodo: [...state.completedTodo, newTodo]
    
                }
            }
            // else{
            //     let newTask = state.completedTodo.find(item => item.id === payload)
            // newTask.status = !newTask.status
            //     return {
                
            //         ...state,
            //         completedTodo: state.completedTodo.filter((item) => item.id !== payload),
            //         todo: [...state.todo, newTask]
    
            //     }
            // }
            
        

        default:
            return state;
    }
};

export default reducer;

