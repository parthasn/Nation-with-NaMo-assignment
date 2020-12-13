import React, { useState, useEffect } from 'react';
import './module.dashboard.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { handleAddTask, reset } from '../Redux/App/actions';
import TodoCard from './TodoCard';
import FilterBox from './FilterBox';

const useStyles = makeStyles(() => ({
    button: {
        margin: '10px',
        padding: '5px',
        color: "white !important" 
    }
}));

function Dashboard() {
    const classes = useStyles();
    const [ task, setTask ] = useState('');
    const pending = useSelector((state) => state.app.pending) || [];
    const filterBy = useSelector((state) => state.app.filterBy) || [];
    const completedTodo = useSelector((state) => state.app.completedTodo) || [];
    const sortByTime = useSelector((state) => state.app.sortByTime);
    const dispatch = useDispatch();

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

    const handleReset = () => {
        dispatch(reset());
    };

    console.log('todo', pending);
    console.log('filter', filterBy);
    console.log('completedTodo', completedTodo);
    console.log('sort', sortByTime);
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__inputDiv">
                    <input
                        className="dashboard__input"
                        placeholder="Add a Task"
                        value={task}
                        type="text"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                    <Button className = {classes.button} onClick = {handleAdd} variant="contained" color="primary">
                        Add
                    </Button>

                    <img
                        src="https://www.flaticon.com/svg/static/icons/svg/560/560512.svg"
                        className="dashboard__reset"
                        onClick={handleReset}
                    />
                </div>
                <hr />
                <div>{filterBy && filterBy.map((item) => <FilterBox key={item} data={item} />)}</div>
                <div className="dashboard__list">
                    <h3 className="dashboard__heading">Pending Tasks:</h3>
                    {pending &&
                        pending
                            .filter((item) => {
                                if(!filterBy.length){
                                    return item
                                }
                                for (let i = 0; i < filterBy.length; i++) {
                                    if (item.title.includes(filterBy[i]))
                                      return item;
                                  }
                                  
                                })
                            .sort((a, b) => {
                                if (sortByTime === null) {
                                    return 0;
                                }
                                if (sortByTime === 'asc') {
                                    return a.creationTime - b.creationTime;
                                } else if (sortByTime === 'desc') {
                                    return b.creationTime - a.creationTime;
                                }
                            })
                            .map((item) => <TodoCard key={item.id} data={item} />)}
                    <br />
                    <hr />
                    <h3 className="dashboard__heading">Completed Tasks:</h3>
                    {completedTodo &&
                        completedTodo
                            .sort((a, b) => {
                                if (sortByTime === null) {
                                    return 0;
                                }
                                if (sortByTime === 'asc') {
                                    return a.completionTime - b.completionTime;
                                } else if (sortByTime === 'desc') {
                                    return b.completionTime - a.completionTime;
                                }
                            })
                            .map((item) => <TodoCard name={item.id} key={item.id} data={item} />)}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
