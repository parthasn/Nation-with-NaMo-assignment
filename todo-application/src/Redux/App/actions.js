import { ADD_TASK, TOGGLE_TASK, RESET, FILTER_CRITERIA, DELETE_FILTER_CRITERIA } from './actionTypes';
import { v4 as uuid } from 'uuid';
import axios from 'axios'

export const addTask = (payload) => ({
    type: ADD_TASK,
    payload
    
});

export const toggleTask = (payload) => ({
    type: TOGGLE_TASK,
    payload
});

export const reset = (payload) => ({
    type: RESET,
    payload
});

export const filter = (payload) => ({
    type: FILTER_CRITERIA,
    payload
});

export const deleteFilter = (payload) => ({
    type: DELETE_FILTER_CRITERIA,
    payload
});


export const handleAddTask = (payload) => async (dispatch) => {
    
    
    console.log("t", payload)
    try {
        let res = await axios({
            method: 'post',
            url: 'http://localhost:3000/tasks',
            data: {
                id: uuid(),
                title: payload,
                status: false,
                creationTime: Date.now(),
                completionTime: null
            }
        });
        dispatch(addTask(res.data));

        
    } catch (err) {
        console.log(err)
    }
};
