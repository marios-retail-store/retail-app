import React,{useState} from 'react';
const axios = require('axios');
import styled from 'styled-components';


const SearchContainer = styled('input')`
  height:45px;
  width:600px;
  border-radius:5px;
  background:#EAF6F6;
`;




function SearchBar(){

  return (
    <div>
      <SearchContainer type="text"  placeholder={`HAVE A QUESTION? SEARCH FOR ANSWERS ......`}></SearchContainer>
    </div>
  )
}

export default SearchBar;