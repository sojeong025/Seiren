import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from "./Filter.module.css"
import { customAxios } from '../../libs/axios';

function Filter() {
  const [gender, setGender] = useState<GetData[]>([]);
  const [age, setAge] = useState<GetData[]>([]);
  const [mood, setMood] = useState<GetData[]>([]);

  const [selectGender, setSelectGender] = useState<string|number>();
  const [selectAge, setSelectAge] = useState<string|number>();
  const [selectMood, setSelectMood] = useState<string|number>();

  interface GetData{
    id:number;
    name:string;
  }

  const handleChangeGender = (event: SelectChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setSelectGender(target.value === "-1" ? '' : target.value);
  };
  const handleChangeAge = (event: SelectChangeEvent) =>{
    const target = event.target as HTMLInputElement;
    setSelectAge(target.value === "-1" ? '' : target.value);
  }
  const handleChangeMood = (event: SelectChangeEvent) =>{
    const target = event.target as HTMLInputElement;
    setSelectMood(target.value === "-1" ? '' : target.value);
  }

  useEffect(()=>{
    customAxios.get("categories")
    .then((res)=>{
      console.log(res.data.response[0].children[0]);
      setGender(res.data.response[0].children[0].children);
      setAge(res.data.response[0].children[1].children);
      setMood(res.data.response[0].children[2].children);
    })
  },[])

  return (
    <div className={styles.filter}>
      {/* 필터 넣는 곳 */}
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectGender === ''?-1:selectGender}
          onChange={handleChangeGender}
          label="gender"
        >
          <MenuItem value="-1">
            <em>All</em>
          </MenuItem>
          {
            gender && gender.map((data, i)=>
            <MenuItem key={i}  value={data.id}>{data.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectAge=== ''?-1:selectAge}
          onChange={handleChangeAge}
          label="age"
        >
          <MenuItem value="-1">
            <em>All</em>
          </MenuItem>
          {
            age && age.map((data, i)=>
            <MenuItem key={i} value={data.id}>{data.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Mood</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectMood === ''?-1:selectMood}
          onChange={handleChangeMood}
          label="mood"
        >
          <MenuItem value="-1">
            <em>All</em>
          </MenuItem>
          {
            mood && mood.map((data, i)=>
            <MenuItem key={i} value={data.id}>{data.name}</MenuItem>
            )
          }
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
