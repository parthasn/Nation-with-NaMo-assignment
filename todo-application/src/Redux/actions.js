import { ADD_TASK, TOGGLE_TASK } from './actionTypes'
import { v4 as uuid } from 'uuid'

export const addTask = (payload) => ({
    type: ADD_TASK,
    payload: {
        id: uuid(),
        title: payload,
        status: false
    }
})

export const toggleTask = (payload) => ({
    type: TOGGLE_TASK,
    payload
})