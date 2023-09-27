import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from "./Filter.module.css"
import { customAxios } from '../../libs/axios';

function Filter({products, setProducts}) {
  const [gender, setGender] = useState<GetData[]>([]);
  const [age, setAge] = useState<GetData[]>([]);
  const [mood, setMood] = useState<GetData[]>([]);

  const [selectGender, setSelectGender] = useState<string|number>('');
  const [selectAge, setSelectAge] = useState<string|number>('');
  const [selectMood, setSelectMood] = useState<string|number>('');
  const [productList, setProductList] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState("Latest");

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
  const handleChangeSort = (event: SelectChangeEvent) =>{
    const target = event.target as HTMLInputElement;
    setSortType(target.value === "-1" ? '' : target.value);
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

  useEffect(()=>{
    customAxios.get(`products?nickname=&age=${selectAge}&mood=${selectMood}&gender=${selectGender}&sortType=${sortType}&page=${page}`)
    .then((res)=>{
      console.log(res.data.response.productDtoList);
      setProducts(res.data.response.productDtoList);
    })
  },[selectMood, selectAge, selectGender, sortType, page])

  const searchChange = (e) =>{
    console.log(e.target.value);
      setSearch(e.target.value);
  }

  const getProductNickname = () =>{
    customAxios.get(`products?nickname=${search}&age=${selectAge}&mood=${selectMood}&gender=${selectGender}&sortType=${sortType}&page=${page}`)
    .then((res)=>{
      console.log(res.data.response.productDtoList);
      setProducts(res.data.response.productDtoList);
    })
  }

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
      <div className={styles.search}>
        <input className={styles.searchbar} placeholder='seach user nickname' type="text" value={search} onChange={(e)=>searchChange(e)}/>
        <button type="submit" className={styles.search_btn} onClick={getProductNickname}>검색</button>
      </div>


      {/* 정렬 */}
      <div className={styles.sort}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sortType}
          onChange={handleChangeSort}
          label="sort"
        >
        <MenuItem value={'Latest'}>
          <em>최신순</em>
        </MenuItem>
        <MenuItem value={'Sales'}>
          <em>판매순</em>
        </MenuItem>
        </Select>
      </FormControl>
    </div>


    </div>
  );
}

export default Filter;
