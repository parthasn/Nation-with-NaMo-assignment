import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './todocard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toggleTask, filter, deleteTask } from '../Redux/App/actions';
import ReactHashtag from 'react-hashtag';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
    paper_completed: {
        padding: '10px',
        margin: '10px',
        backgroundColor: ' #000d33',
        color: 'white',
        textAlign: 'left',
        position: 'relative',
        overflowWrap: 'break-word'
    },
    paper_pending: {
        padding: '10px',
        margin: '10px',
        backgroundColor: '#ccd9ff',
        color: '#00061a',
        textAlign: 'left',
        position: 'relative',
        overflowWrap: 'break-word'
    },

    checkbox: {
        position: 'absolute',
        right: '25px',
        bottom: 0
    },
    deleteCompleted: {
        height: '25px',
        position: 'absolute',
        right: '5px',
        bottom: '7px'
    },
    deletePending: {
        height: '25px',
        position: 'absolute',
        right: '2px',
        bottom: '10px'
    }
}));

function TodoCard({ data }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const filterBy = useSelector((state) => state.app.filterBy) || [];
    const [ checked, setChecked ] = React.useState(data.status);
    const { title, status, id } = data;

    const handleToggle = () => {
        dispatch(toggleTask(id));
        setChecked(true);
    };

    const handleHashtag = (value) => {
        if (filterBy.includes(value)) {
            alert('Filter already present');
        } else {
            dispatch(filter(value));
        }
    };

    const deleteTodo = () => {
        dispatch(deleteTask(id));
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {// If task is completed
                    status ? (
                        <Paper className={classes.paper_completed}>
                            <div className={styles.todocard__taskDiv}>
                                <div className={styles.todocard__task}>
                                    <ReactHashtag onHashtagClick={handleHashtag}>{title}</ReactHashtag>
                                </div>
                                <Tooltip title="Delete" arrow placement="top">
                                    <DeleteIcon onClick={deleteTodo} className={classes.deleteCompleted} />
                                </Tooltip>
                            </div>
                        </Paper>
                    ) : (
                        // If task is pending
                        <Paper className={classes.paper_pending}>
                            <div className={styles.todocard__taskDiv}>
                                <div className={styles.todocard__task}>
                                    <ReactHashtag onHashtagClick={handleHashtag}>{title}</ReactHashtag>
                                </div>
                                <Tooltip title="Completed" arrow placement="top">
                                    <Checkbox
                                        // Checkbox for marking the completion of task
                                        className={classes.checkbox}
                                        checked={checked}
                                        onChange={handleToggle}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Tooltip>
                                <Tooltip title="Delete" arrow placement="top">
                                    <DeleteIcon onClick={deleteTodo} className={classes.deletePending} />
                                </Tooltip>
                            </div>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default TodoCard;
