/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

const axios = require('axios');

const SearchContainer = styled('input')`
  height:45px;
  width:600px;
  border-radius:5px;
  background:#EAF6F6;
`;

function SearchBar() {
  return (
    <div>
      <SearchContainer type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ......" />
    </div>
  );
}

export default SearchBar;
