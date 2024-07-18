import type { ChangeEvent, FC } from 'react';
import { memo } from 'react';

import { TextField } from '@mui/material';

interface IFilterProps {
  filterValue: string;
  handleChangeFilterValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter: FC<IFilterProps> = memo(
  ({ filterValue, handleChangeFilterValue }) => {
    return (
      <TextField
        id="outlined-controlled"
        type="text"
        placeholder="Find contacts by name"
        name="filter"
        value={filterValue}
        onChange={handleChangeFilterValue}
      />
    );
  }
);

export default Filter;
