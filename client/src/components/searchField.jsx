// src/InputButton.js
import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GetAllMetaphors from '../api/services/getAllMetaphors';
import SearchAllMetaphors from '../api/services/searchAllMetaphors';
import SearchMetaphorsByPoet from '../api/services/searchMetaphorsByPoet';
import SearchAllMetaphorsPoet from '../api/services/searchAllMetaphorsPoet';

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


export function SearchField({setData}){
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
        const res = await GetAllMetaphors();
        setData(res.data.hits.hits);
      } catch (err) {
        console.log(err);
      }
    }
    else if (inputSelect === 'Any') {
      try {
        const res = SearchAllMetaphors(inputValue);
        setData(res.data.hits.hits);
        
      } catch (err) {
        console.log(err);
      }

    }
    else if (inputValue === '') {
      try {
        const res = await SearchMetaphorsByPoet(inputSelect);
        setData(res.data.hits.hits);
      } catch (err) {
        console.log(err);
        
      }
    }
    else{
      try {
        const res = await SearchAllMetaphorsPoet(inputValue, inputSelect);
        setData(res.data.hits.hits);
      } catch (err) {
          console.log(err);
      }
    }
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
