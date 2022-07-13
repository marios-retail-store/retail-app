import React, { useState } from 'react';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import CustomDropdown from './overview/custom_dropdown/CustomDropdown.jsx';
import ImageGallery from './overview/image_gallery/ImageGallery.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import { product, style1, style2 } from './overview/exampledata.js';

function Overview() {
  const [currentStyle, setCurrentStyle] = useState(style1);

  const toggleStyle = () => {
    if (currentStyle === style1) {
      setCurrentStyle(style2);
    } else {
      setCurrentStyle(style1);
    }
  };

  return (
    <>
      <button type="button" onClick={toggleStyle}>toggle style</button>
      <ImageGallery
        style={currentStyle}
      />
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
        style={currentStyle}
      />
      <Slogan
        product={product}
      />
    </>
  );
}

export default Overview;
