import React from 'react'
import { deleteFilter } from '../Redux/App/actions';
import { useDispatch } from 'react-redux';

function FilterBox({data}) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteFilter(data))
    }
    
    return (
        <div className = "filterbox__container">
            <p>{data}</p>
            <button onClick = {handleDelete}>x</button>
        </div>
    )
}

export default FilterBox
