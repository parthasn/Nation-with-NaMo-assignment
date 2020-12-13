import { ADD_TASK, TOGGLE_TASK, RESET, FILTER_CRITERIA, DELETE_FILTER_CRITERIA, DELETE_TASK } from './actionTypes';
import { loadData, saveData, removeData, removeTask } from '../localStorage';

export const initState = {
    completedTodo: loadData('completed') || [],
    pending: loadData('pending') || [],
    sortByTime: 'desc',
    filterBy: loadData('filterBy') || []
};

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TASK:
            saveData('pending', [ ...state.pending, payload ]);
            return {
                ...state,
                pending: [ ...state.pending, payload ]
            };

        case TOGGLE_TASK:
            let newTodo = state.todo.find((item) => item.id === payload);
            newTodo.status = !newTodo.status;
            newTodo.completionTime = Date.now();
            saveData('completed', [ ...state.completedTodo, newTodo ]);
            saveData('pending', state.pending.filter((item) => item.id !== payload));

            if (newTodo.status) {
                return {
                    ...state,
                    pending: state.pending.filter((item) => item.id !== payload),
                    completedTodo: [ ...state.completedTodo, newTodo ]
                };
            }
            break;
        case RESET:
            removeData('pending');
            removeData('completed');
            removeData('filterBy');
            return {
                ...state,
                pending: [],
                completedTodo: [],
                filterBy: []
            };

        case FILTER_CRITERIA:
            saveData('filterBy', [ ...state.filterBy, payload ]);
            return {
                ...state,
                filterBy: [ ...state.filterBy, payload ]
            };

        case DELETE_FILTER_CRITERIA:
            saveData('filterBy', state.filterBy.filter((item) => item !== payload));
            return {
                ...state,
                filterBy: state.filterBy.filter((item) => item !== payload)
            };

        case DELETE_TASK:
            removeTask(payload);
            return {
                ...state,
                pending: state.pending.filter((item) => item.id !== payload),
                completedTodo: state.completedTodo.filter((item) => item.id !== payload)
            };

        default:
            return state;
    }
};

export default reducer;
