import React from 'react';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import CustomDropdown from './overview/custom_dropdown/CustomDropdown.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import { product, style } from './overview/exampledata.js';

function Overview() {
  return (
    <>
      <CustomDropdown
        placeholder="select option"
        options={[
          'option1',
          'option2',
          'option3',
          'option4',
          'option5',
        ]}
        width={150}
        height={40}
      />
      <GeneralInfo
        product={product}
        style={style}
      />
      <Slogan
        product={product}
      />
    </>
  );
}

export default Overview;
