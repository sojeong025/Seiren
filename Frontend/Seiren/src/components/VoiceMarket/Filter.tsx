import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from "./Filter.module.css"

function Filter() {
  const [gender, setGender] = useState<string | "">('');

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value === undefined ? '' : event.target.value);
  };

  return (
    <div className={styles.filter}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={gender}
          onChange={handleChange}
          label="gender"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
