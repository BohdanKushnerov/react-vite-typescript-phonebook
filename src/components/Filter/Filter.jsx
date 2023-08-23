import React from 'react';
import { TextField } from '@mui/material';
import { getFilter } from '@redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '@redux/filter/filterSlice';

const Filter = React.memo(() => {
  const filterState = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChangeFilter = e => {
    const { value } = e.currentTarget;
    dispatch(changeFilter(value));
  };

  return (
    <TextField
      id="outlined-controlled"
      type="text"
      placeholder="Find contacts by name"
      name="filter"
      value={filterState}
      onChange={handleChangeFilter}
    />
  );
});

export default Filter;
