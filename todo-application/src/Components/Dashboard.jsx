import React, {useState} from 'react';
import './module.dashboard.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        marginLeft: '10px',
        padding: '10px'
    }
}));

function Dashboard() {
    const classes = useStyles();
    const [ task, setTask ] = useState('')
    const handleChange = (e) => {};

    const handleAdd = () => {};
    return (
        <div className="dashboard__container">
            <div className="dashboard__input">
                <TextField
                    id="filled-password-input"
                    label="Add a Task"
                    value = {task}
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />
                <Button className={classes.button} variant="contained" color="primary" onClick={handleAdd}>
                    Add Task
                </Button>
            </div>
        </div>
    );
}

export default Dashboard;
