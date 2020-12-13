import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './module.todocard.css';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toggleTask, filter, deleteTask } from '../Redux/App/actions';
import ReactHashtag from 'react-hashtag';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    paper_completed: {
        padding: '10px',
        margin: '10px',
        backgroundColor: ' #000d33',
        color: 'white',
        textAlign: 'left',
        position: "relative"
    },
    paper_pending: {
        padding: '10px',
        margin: '10px',
        backgroundColor: '#ccd9ff',
        color: '#00061a',
        textAlign: 'left',
        position: "relative"
    },
    hashtag: {
        color: "green"
    },
    checkbox: {
        position: "absolute",
        right: "25px",
        bottom: 0
    },
    deleteCompleted: {
        height: "25px",
        position: "absolute",
        right: "5px",
        bottom: "7px"
    },
    deletePending: {
        height: "25px",
        position: "absolute",
        right: "2px",
        bottom: "10px"
    }
   
}));

function TodoCard({ data }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ checked, setChecked ] = React.useState(data.status);
    const { title, status, id } = data;

    const handleToggle = () => {
        dispatch(toggleTask(id));
        setChecked(true);
        console.log('toggle', id);
    };

    const handleHashtag = (value) => {
        dispatch(filter(value));
        console.log('hashtag', value);
    };

    const deleteTodo = () => {
        dispatch(deleteTask(id));
    }
    console.log('data', title, status);
    return (
        <div className="todoCard__container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {status ? (
                        <Paper className={classes.paper_completed}>
                            <div>
                                <ReactHashtag onHashtagClick={handleHashtag}>
                                    {title}
                                </ReactHashtag>
                                <DeleteIcon onClick = {deleteTodo} className = {classes.deleteCompleted}/>
                                
                                
                            </div>
                        </Paper>
                    ) : (
                        <Paper className={classes.paper_pending}>
                            <div >
                                <ReactHashtag  onHashtagClick={handleHashtag}>
                                    {title}
                                </ReactHashtag>
                                <Checkbox
                                    className = {classes.checkbox}
                                    checked={checked}
                                    onChange={handleToggle}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <DeleteIcon onClick = {deleteTodo} className = {classes.deletePending}/>
                                

                            </div>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default TodoCard;
