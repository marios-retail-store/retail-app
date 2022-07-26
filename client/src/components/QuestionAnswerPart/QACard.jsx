import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import HelpfulNess from './HelpfulNess.jsx';
import AnswerModal from './AnswerModal.jsx';
import PhotoReview from './PhotoReview.jsx';
import { BoldSubHeading, Paragraph } from '../shared/styles.js';

const Container = styled('div')`
  display:flex;
  flex-wrap:wrap;
  align-items: center;
`;

const SimpleButton = styled('button')`
  border:none;
  background:none;
  text-decoration:underline;
  cursor:pointer;
`;

const MiniButton = styled('button')`
 background-color: #EAF6F6;
  border: none;
  text-color:black
  padding: 15px 32px;
  text-align: center;
  font-size:15px;
`;

const CustomSubHeading = styled(BoldSubHeading)`
  letter-spacing: 0.05em;
  font-size: 18;
  margin-bottom: 5px;
  display: inline;
  text-transform: none;
`;

const CustomParagraph = styled(Paragraph)`
  letter-spacing: 0em;
  display: inline;
`;

export default function QACard({ ele, productName }) {
  const answerslist = Object.values(ele.answers).sort((a, b) => {
    if (a.answerer_name.toLowerCase() === 'seller') {
      return -1;
    } if (b.answerer_name.toLowerCase() === 'seller') {
      return 1;
    }
    return (b.helpfulness - a.helpfulness);
  });
  const [showModal, setShowModal] = useState(false);
  const [report, setReport] = useState(false);
  const [displayedAns, setDisplayedAns] = useState(answerslist.slice(0, 2));
  const [showCollapseBtn, setShowCollapeBtn] = useState(false);

  const handleLoadMoreBtn = function () {
    setShowCollapeBtn(true);
    setDisplayedAns(answerslist.slice());
  };

  const handleCollapseBtn = function () {
    setShowCollapeBtn(false);
    setDisplayedAns(answerslist.slice(0, 2));
  };

  const handleClickAddAnsButton = function () {
    setShowModal(true);
  };
  const handleReport = function (event, reportingId) {
    const options = {
      url: `/api/qa/questions/${reportingId}/report`,
      method: 'PUT',
    };
    if (!report) {
      axios(options).then(() => {
        setReport(true);
      }).catch(() => { console.log('Error during reporing request'); });
    } else {
      alert('Have received your report. Thanks');
    }
  };

  return (
    <div>
      <br />
      {showModal && (
      <AnswerModal
        setShowModal={setShowModal}
        questionText={ele.question_body}
        productName={productName}
        questionId={ele.question_id}
      />
      )}
      <Container>
        <CustomSubHeading style={{ marginRight: '15px ' }}>
          Q: &nbsp;
          {ele.question_body}
        </CustomSubHeading>
        <div
          style={{ fontFamily: 'Kanit, sans-serif' }}
        >
          <HelpfulNess
            style={{ textAlign: 'center' }}
            id={ele.question_id}
            count={ele.question_helpfulness}
          />
        </div>
        <span>
          &nbsp; &nbsp;| &nbsp; &nbsp;
          <span>
            <SimpleButton
              type="button"
              onClick={() => handleClickAddAnsButton()}
            >
              <CustomParagraph>Add Answer</CustomParagraph>
            </SimpleButton>
          </span>
        </span>
      </Container>
      {displayedAns.map((a) => (
        <div key={a.id}>
          <CustomSubHeading>A:&nbsp;</CustomSubHeading>
          <CustomParagraph>{a.body}</CustomParagraph>
          <div style={{
            padding: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 'smaller',
            textDecorationColor: 'gray',
            fontFamily: 'Kanit, sans-serif',
          }}
          >
            {' '}
            {a.answerer_name.toLowerCase() === 'seller' ? <b>Seller</b> : a.answerer_name }
            ,
            &nbsp;
            <span>
              {' '}
              <Moment format="MMMM-DD-YYYY" date={a.date} />
            </span>
            &nbsp; &nbsp;
            | &nbsp; &nbsp;
            <span />
            <HelpfulNess id={a.id} count={a.helpfulness} />
            <span>
                    &nbsp; | &nbsp;
              <SimpleButton type="button" onClick={(event) => handleReport(event, a.id)}>Report</SimpleButton>
            </span>
          </div>
          <Container>
            {a.photos.length > 0 && a.photos.map(
              (photo) => (
                <PhotoReview
                  key={photo}
                  photo={photo}
                />
              ),
            )}
          </Container>
        </div>
      ))}
      {(answerslist.length > 2 && !showCollapseBtn) && <MiniButton type="button" onClick={() => handleLoadMoreBtn()}>LOAD MORE ANSWERS</MiniButton>}
      {(answerslist.length > 2 && showCollapseBtn) && <MiniButton type="button" onClick={() => handleCollapseBtn()}>COLLAPSE ANSWERS</MiniButton>}
    </div>
  );
}

QACard.propTypes = {
  productName: PropTypes.string.isRequired,
  ele: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
