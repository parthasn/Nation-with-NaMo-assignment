import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '10px',
    margin: '10px',
    textAlign: 'center',
    color: 'black',
  },
}));

function TodoCard({data}) {
  const classes = useStyles(); 
  const { title, status, onClick } = data
  console.log("data",title, status)
  return (
    <div className = "todoCard__container">
        <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <Paper onClick = {onClick} className={classes.paper}>
            <div>
              {title}
            </div>
          </Paper>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  )
}

export default TodoCard