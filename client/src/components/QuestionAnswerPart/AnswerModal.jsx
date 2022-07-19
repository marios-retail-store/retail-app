/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import configobj from '../../../../config.js';

const Form = styled('form')`
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1em',
  fontSize: '20px',
`;
const PhotoDiv = styled('div')`
  display: 'flex',
  flex-wrap: 'wrap',
  height: '10px',
  width: '10px',
`;
export default function AnswerModal({
  questionText, productName, setShowModal, questionId,
}) {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photosUrl, setPhotosUrl] = useState([]);
  const [photosUploadFile, setPhotosUpload] = useState([]);
  const [errMessage, setErrMessage] = useState([]);

  const handlePhotosChange = function (event) {
    // console.log('show files name: ', event.target.files);
    setPhotosUpload(event.target.files); // object
  // console.log('show photos upload array: ', photosUploadFile);
  };

  const handlePhotosUpload = async function (event, files) {
    event.preventDefault();
    // console.log('show files in handle photos upload :', files);
    if (files.length <= 5) {
      const url = [];
      const promisesUpload = [];
      for (let i = 0; i < files.length; i++) {
        const currentFile = files[i];
        const formData = new FormData();
        formData.append('file', currentFile);
        formData.append('upload_preset', 'f3bq7tgi');
        promisesUpload.push(
          axios
            .post(
              'https://api.cloudinary.com/v1_1/dnfqddlmx/image/upload',
              formData,
            )
            .then((res) => {
              url.push(res.data.url);
            })
            .catch((err) => console.log('Error during post request for uploading photos')),
        );
      }
      Promise.all(promisesUpload)
        .then(() => { setPhotosUrl(url); });
    } else {
      alert('No More Than 5 Photos PLEASE');
    }
  };
    // console.log('show photosUrl state array: ', photosUrl);

  const isValidEmail = function (value) {
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(value);
  };

  const handleSubmit = function () {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
    const option = {
      url: `${url}qa/questions/${questionId}/answers`,
      method: 'POST',
      headers: { Authorization: configobj.TOKEN },
      data: {
        body: answer,
        name: nickname,
        email,
        photosUrl,
      },
    };

    if (!isValidEmail(email)) {
      setErrMessage([...errMessage, 'Email']);
    }
    if (!answer.leng) {
      setErrMessage([...errMessage, 'Answer']);
    }
    if (!nickname.length) {
      setErrMessage([...errMessage, 'Nickname']);
      console.log('show nickname: ',nickname);
    }
    if (photosUrl.length !== photosUploadFile.length) {
      setErrMessage([...errMessage, 'Photo Uploading']);
    }
    if (errMessage.length) {
      alert(`Please enter correct values in the following fields: ${errMessage.join(',')}`);
    } else {
      axios(option).then(() => setShowModal(false))
        .catch((err) => console.log('Error during submit form'));
    }
  };

  return (
    <div style={{ background: '#F5EDDC' }}>
      <button
        type="button"
        onClick={() => setShowModal(false)}
      >
        {'<'}
        {' '}
        Go Back
      </button>
      <h2 style={{ textAlign: 'center' }}>
        Submit Your Answer
      </h2>
      <h4>
        {productName}
        {' '}
        :
        {' '}
        {questionText}
      </h4>
      <Form>
        <label htmlFor="answer">
          Your Answer *  &nbsp;
          <textarea
            type="text"
            placeholder="Enter Answer Here..."
            autoComplete="on"
            maxLength={1000}
            minLength={1}
            rows={6}
            columns={66}
            onChange={(event) => setAnswer(event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="nickname">
          Nickname *  &nbsp;
          <input
            placeholder="Example: jack543!"
            maxLength={66}
            onChange={(event) => setNickname(event.target.value)}
          />
          <p> For privacy reasons, do not use your full name or email address !!</p>
        </label>
        <label htmlFor="email">
          Email*&nbsp;
          <input
            autoComplete="off"
            type="email"
            maxLength={66}
            placeholder="jack@email.com"
            onChange={(event) => setEmail(event.target.value)}
          />
          <p> For authentication reasons, you will not be emailed !!</p>
        </label>
        <label htmlFor="files">
          Select photos (Limit 5)
          <input
            type="file"
            accept="image/*"
            multiple="multiple"
            onChange={(event) => handlePhotosChange(event)}
          />
          <button type="button" onClick={(event) => handlePhotosUpload(event, photosUploadFile)}>Upload</button>
        </label>
        {photosUrl.length > 0 && (
          <div>
            <h4>Click on the image to enlarge it.</h4>
            <PhotoDiv>
              {photosUrl.map((item, index) => (
                <div key={index}>
                  <a href={item}>
                    <img src={item} alt="testImage" />
                  </a>
                </div>
              ))}
            </PhotoDiv>

          </div>
        )}
        <button type="button" onClick={() => handleSubmit()}> Submit </button>
      </Form>
    </div>
  );
}

AnswerModal.propTypes = {
  productName: PropTypes.string,
  questionText: PropTypes.string,
  questionId: PropTypes.number,
  setShowModal: PropTypes.func,
}.isRequired;