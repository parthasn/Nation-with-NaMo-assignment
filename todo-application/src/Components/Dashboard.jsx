import React, { useState, useEffect } from 'react';
import './module.dashboard.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { handleAddTask, toggleTask } from '../Redux/App/actions';
import TodoCard from './TodoCard';

const useStyles = makeStyles(() => ({
    button: {
        marginLeft: '10px',
        padding: '15px'
    }
}));

function Dashboard() {
    const classes = useStyles();
    const [ task, setTask ] = useState('');
    const todo = useSelector((state) => state.app.todo) || [];
    const pending = useSelector((state) => state.app.pending) || [];
    const completedTodo = useSelector((state) => state.app.completedTodo) || [];
    const sortByTime = useSelector((state) => state.app.sortByTime);
    const dispatch = useDispatch();

    // useEffect(
    //     () => {
    //         dispatch(sortByTimeOfCreation('desc'))
    //     },
    //     [sortByTime]
    // );

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleAdd = () => {
        dispatch(handleAddTask(task));
        setTask('');
    };

    const handleKeyPress = (e) => {
        if (e.which === 13) {
            handleAdd();
        }
    };

    
    console.log('todo', todo);
    console.log('completedTodo', completedTodo)
    console.log('sort', sortByTime);
    return (
        <div className="dashboard__container">
            <div className="dashboard__input">
                <TextField
                    id="filled-password-input"
                    label="Add a Task"
                    value={task}
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <Button className={classes.button} variant="contained" color="primary" onClick={handleAdd}>
                    Add Task
                </Button>
            </div>
            <div className = "dashboard__list">
                {
                    todo && todo
                    .sort((a,b)=>{
                        if(sortByTime === null){
                            return 0
                        }
                        if(sortByTime === "asc"){
                            return a.timestamp - b.timestamp
                        }
                        else if(sortByTime === "desc"){
                            return b.timestamp - a.timestamp
                        }
                    }).map((item) => (
                        <TodoCard key = {item.id} data = {item}/>
                    ))
                }
                {
                    completedTodo && completedTodo
                    .sort((a,b)=>{
                        if(sortByTime === null){
                            return 0
                        }
                        if(sortByTime === "asc"){
                            return a.timestamp - b.timestamp
                        }
                        else if(sortByTime === "desc"){
                            return b.timestamp - a.timestamp
                        }
                    }).map((item) => (
                        <TodoCard name = {item.id} key = {item.id} data = {item}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Dashboard;
