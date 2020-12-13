import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './module.todocard.css';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toggleTask } from '../Redux/App/actions';
import ReactHashtag from "react-hashtag";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: '10px',
        margin: '10px',
        textAlign: 'center',
        color: 'black'
    }
}));

function TodoCard({ data }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { title, status, id } = data;

    const handleToggle = () => {
        dispatch(toggleTask(id));
        console.log('toggle', id);
    };
    console.log('data', title, status);
    return (
        <div className="todoCard__container">
            <Grid container spacing={3}>
                <Grid item xs />
                <Grid item xs={8}>
                    <Paper
                        style={{ backgroundColor: status ? 'green' : 'white' }}
                        onClick={handleToggle}
                        className={classes.paper}
                    >
                        <div>
                            <ReactHashtag>{title}</ReactHashtag>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs />
            </Grid>
        </div>
    );
}

export default TodoCard;
