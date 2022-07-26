/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import PhotoReview from './PhotoReview.jsx';

const Form = styled('form')`
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1em',
  fontSize: '20px',
`;
const PhotoDiv = styled('div')`
  float:'right',
  flex-wrap: 'wrap',
  height: '10px',
  width: '10px',
`;

const ModalBackground = styled('div')`
  background-color: #F5EDDC;
  width:80%;
  height: 90%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 90;
`;

const Button = styled('button')`
background-color: #D3CEDF;
border-radius: 10px;
padding:10px;
text-align: center;
display: inline-block;
font-size: 16px;
margin-top:15px;
margin-left:200px;
`;

const SmallDiv = styled('input')`
width:180px;
height:30px;
margin:10px;
`;

export default function AnswerModal({
  questionText, productName, setShowModal, questionId,
}) {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photosUrl, setPhotosUrl] = useState([]);
  const [photosUploadFile, setPhotosUpload] = useState([]);

  const handlePhotosChange = function (event) {
    setPhotosUpload(event.target.files); // object
  };

  const handlePhotosUpload = async function (event, files) {
    event.preventDefault();
    if (files.length <= 5) {
      const url = [];
      const promisesUpload = [];
      for (let i = 0; i < files.length; i += 1) {
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

  const isValidEmail = function (value) {
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(value);
  };

  const handleSubmit = function () {
    const option = {
      url: `/api/qa/questions/${questionId}/answers`,
      method: 'POST',
      data: {
        body: answer,
        name: nickname,
        email,
        photosUrl,
      },
    };
    const messages = [];
    if (!isValidEmail(email)) {
      messages.push('Email');
    }
    if (!answer.length) {
      messages.push('Answer');
    }
    if (!nickname.length) {
      messages.push('Nickname');
    }
    if (photosUrl.length !== photosUploadFile.length) {
      messages.push('Files invalid');
    }
    if (messages.length) {
      alert(`Please enter correct values in the following fields: ${messages.join(',')}`);
    } else {
      axios(option).then(() => setShowModal(false))
        .catch((err) => console.log('Error during submit answer form'));
    }
  };

  return (
    <ModalBackground>
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
      <div style={{ margin: '220px', marginTop: '40px' }}>
        <h4>
          {productName}
          {' '}
          :
          {' '}
          {questionText}
        </h4>
        <Form>
          <label>
            Your Answer *  &nbsp;
            <textarea
              style={{ width: '350px', height: '100px' }}
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
          <label>
            Nickname *  &nbsp;
            <SmallDiv
              placeholder="Example: jack543"
              maxLength={60}
              onChange={(event) => setNickname(event.target.value)}
            />
            <p> For privacy reasons, do not use your full name or email address !!</p>
          </label>
          <label>
            Email * &nbsp;
            <SmallDiv
              autoComplete="off"
              type="email"
              maxLength={60}
              placeholder="jack@email.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            <p> For authentication reasons, you will not be emailed !!</p>
          </label>
          <label>
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
                  <PhotoReview
                    key={index}
                    photo={item}
                  />
                ))}
              </PhotoDiv>

            </div>
          )}
          <br />
          <Button type="button" onClick={() => handleSubmit()}> Submit </Button>
        </Form>
      </div>
    </ModalBackground>
  );
}

AnswerModal.propTypes = {
  productName: PropTypes.string,
  questionText: PropTypes.string,
  questionId: PropTypes.number,
  setShowModal: PropTypes.func,
}.isRequired;
