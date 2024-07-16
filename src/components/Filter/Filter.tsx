import type { ChangeEvent, FC } from 'react';
import { memo } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { changeFilter } from '@red@redux/storeice';
// import type { AppDispatch } from '@redux/(old)/store';
// import { getFilter } from '@redux/contacts/selectors';
import { TextField } from '@mui/material';

const Filter: FC = memo(() => {
  const filterState = 'sadsadsad';
  // const filterState = useSelector(getFilter);
  // const dispatch: AppDispatch = useDispatch();

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    // dispatch(changeFilter(value));
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
