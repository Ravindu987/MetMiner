import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import GetAllLines from '../api/services/getAllLines';
import SearchAllLines from '../api/services/searchAll';
import SearchAllPoet from '../api/services/searchAllPoet';
import SearchAllByPoet from '../api/services/searchAllByPoet';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        gap: '30px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
  input: {
    minWidth: '120px'
  },
  button: {
    backgroundColor: '#0074D9',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  select: {
    minWidth: '120px',
  },
}));


export function SearchFieldAll(props){
  const {setData, setPage} = props;
  const [inputValue, setInputValue] = useState('');
  const [inputSelect, setInputSelect] = useState('Any');
  const classes = useStyles();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setInputSelect(event.target.value);
  };

  const handleButtonClick = async () => {

    if (inputSelect === 'Any' && inputValue === '') {
        try {
          const res = await GetAllLines();
          setData(res.data.hits.hits);
        } catch (err) {
          console.log(err);
        }
    }
    else if (inputSelect === 'Any') {
      try {
          const res = await SearchAllLines(inputValue);
          setData(res.data.hit.hits);
      } catch (err) {
          console.log(err);
      }
    }
    else if (inputValue === '') {
        try {
          const res = await SearchAllPoet(inputSelect);
          setData(res.data.hit.hits);
        } catch (err) {
          console.log(err);
        }
    }
    else{
      try{
        const res = await SearchAllByPoet(inputValue, inputSelect);
        setData(res.data.hit.hits);
      } catch (err){
        console.log(err);
      }
    }

    // Set table page to 0
    setPage(0);
};

  return (
    <div className={classes.container}>
    <TextField
        className={classes.input}
        label="Keyword"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
    />
    <Select
        className={classes.select}
        value={inputSelect}
        onChange={handleSelectChange}
    >
        <MenuItem value="Any">Any</MenuItem>
        <MenuItem value="එරංග දසනායක">එරංග දසනායක</MenuItem>
        <MenuItem value="හශින්ත විදානපතිරණ">හශින්ත විදානපතිරණ</MenuItem>
        <MenuItem value="සමන් විජේසූරිය">සමන් විජේසූරිය</MenuItem>
        <MenuItem value="පී. බී. අල්විස් පෙරේරා">පී. බී. අල්විස් පෙරේරා</MenuItem>
        <MenuItem value="බුද්ධදාස ගලප්පත්ති">බුද්ධදාස ගලප්පත්ති</MenuItem>
        <MenuItem value="මහගමසේකර">මහගමසේකර</MenuItem>
        <MenuItem value="රත්න ශ්‍රී විජේසිංහ">රත්න ශ්‍රී විජේසිංහ</MenuItem>
    </Select>

    <Button className={classes.Button} variant="contained" color="primary" onClick={handleButtonClick}>
        Filter
    </Button>
    </div>
  );
};
