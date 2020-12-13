import React from 'react'
import { deleteFilter } from '../Redux/App/actions';
import './module.filterbox.css';
import { useDispatch } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';

function FilterBox({data}) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteFilter(data))
    }
    
    return (
        <span className = "filterbox">
            <p>{data}</p>
            <CancelIcon style = {{marginLeft: "10px"}} onClick = {handleDelete}></CancelIcon>
        </span>
    )
}

export default FilterBox
