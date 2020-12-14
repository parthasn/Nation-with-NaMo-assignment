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
        <span className={styles.filterbox}>
            <p>{data}</p>
            <CancelIcon style={{ marginLeft: '10px' }} onClick={handleDelete} />
        </span>
    );
}

export default FilterBox;
