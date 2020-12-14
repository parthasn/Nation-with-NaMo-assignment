import React, { useState } from 'react';
import styles from './dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddTask, reset } from '../Redux/App/actions';
import TodoCard from './TodoCard';
import FilterBox from './FilterBox';
import Tooltip from '@material-ui/core/Tooltip';

function Dashboard() {
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
        if (task === '') {
            alert('Task cannot be empty');
        } else {
            dispatch(handleAddTask(task));
            setTask('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.which === 13) {
            handleAdd();
        }
    };

    const handleReset = () => {
        dispatch(reset());
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboard__inputDiv}>
                <input
                    className={styles.dashboard__input}
                    placeholder="Add a Task"
                    value={task}
                    type="text"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <Tooltip title="Reset" arrow placement="top">
                    <img
                        src="https://cdn0.iconfinder.com/data/icons/essentials-solid/100/Refresh-512.png"
                        alt="reset"
                        className={styles.dashboard__reset}
                        onClick={handleReset}
                    />
                </Tooltip>
            </div>
            <hr className={styles.dashboard__hr} />
            <div className={styles.dashboard__filter}>
                <h3>Filter By:</h3>
                {filterBy && filterBy.map((item) => <FilterBox key={item} data={item} />)}
            </div>

            <div className={styles.dashboard__list}>
                <h3 className={styles.dashboard__heading}>Pending Tasks:</h3>
                {pending &&
                    pending
                        .filter((item) => {
                            if (!filterBy.length) {
                                return item;
                            }
                            let numOfCriteriaMatching = 0;
                            for (let i = 0; i < filterBy.length; i++) {
                                if (item.hashtagList.includes(filterBy[i].toLowerCase())) {
                                    numOfCriteriaMatching++;
                                }
                            }
                            if (numOfCriteriaMatching === filterBy.length) {
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
                <hr className={styles.dashboard__hr} />
                <h3 className={styles.dashboard__heading}>Completed Tasks:</h3>
                {completedTodo &&
                    completedTodo
                        .filter((item) => {
                            if (!filterBy.length) {
                                return item;
                            }
                            let numOfCriteriaMatching = 0;
                            for (let i = 0; i < filterBy.length; i++) {
                                if (item.hashtagList.includes(filterBy[i].toLowerCase())) {
                                    numOfCriteriaMatching++;
                                }
                            }
                            if (numOfCriteriaMatching === filterBy.length) {
                                return item;
                            }
                        })
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
    );
}

export default Dashboard;
