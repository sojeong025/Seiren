import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from "./Filter.module.css"

function Filter() {
  const [gender, setGender] = useState<string | "">('');
  const [age, setAge] = useState<string | "">('');
  const [mood, setMood] = useState<string | "">('');

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value === undefined ? '' : event.target.value);
    setAge(event.target.value === undefined ? '' : event.target.value);
    setMood(event.target.value === undefined ? '' : event.target.value);
  };

  return (
    <div className={styles.filter}>
      {/* 필터 넣는 곳 */}
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

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="age"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={'Children'}>Children</MenuItem>
          <MenuItem value={'Female'}></MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Mood</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={mood}
          onChange={handleChange}
          label="mood"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
      </FormControl>
      <div>
        <input className={styles.searchbar} placeholder='seach user nickname' type="text" />
        <button type="submit" className={styles.search_btn}>검색</button>
      </div>
    </div>
  );
}

export default Filter;
