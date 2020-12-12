import { ADD_TASK, TOGGLE_TASK } from './actionTypes'
import { loadData, saveData, removeData } from './localStorage'

export const initState = {
   
    todo: loadData("tasks") || [],
    completed: loadData("completed") || [],
    pending: loadData("pending") || []

}

