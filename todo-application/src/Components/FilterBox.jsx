import React from 'react';
import { deleteFilter } from '../Redux/App/actions';
import styles from "./filterbox.module.css"
import { useDispatch } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';

function FilterBox({ data }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteFilter(data));
    };
    return (
        <div className={styles.filterbox}>
            <div className = {styles.filterbox__task}>
            <p>{data}</p>
            </div>
            
            <CancelIcon style={{ marginLeft: '10px' }} onClick={handleDelete} />
        </div>
    );
}

export default FilterBox;
