import React from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
`;

const ButtonContainer = styled('div')`
  margin-right: 5px;
  display: flex;
  justify-content: center;
  height: 100%;
  width: fit-content;
`;

function SocialsSharing() {
  // needs to be the website link later on:
  // needs to be the website link later on:
  // needs to be the website link later on:
  const urlToShare = 'https://www.amazon.com/';
  const tweetToShare = 'Check this out!';
  const tweetEncoded = encodeURIComponent(tweetToShare);
  return (
    <Container>
      <ButtonContainer>
        <div
          className="fb-share-button"
          data-href={urlToShare}
          data-layout="button"
          style={{ color: 'white' }}
        >
          Share On Facebook
        </div>
      </ButtonContainer>
      <ButtonContainer>
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${tweetEncoded}&url=${urlToShare}`}
          style={{ color: 'white' }}
        >
          Tweet
        </a>
      </ButtonContainer>
      <ButtonContainer>
        <a
          data-pin-do="buttonBookmark"
          href="https://www.pinterest.com/pin/create/button/"
          style={{ color: 'white' }}
        >
          Save To Pinterest
        </a>
      </ButtonContainer>
    </Container>
  );
}

export default SocialsSharing;
