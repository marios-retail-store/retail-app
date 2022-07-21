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
  const urlToShare = window.location.href;
  const tweetToShare = 'Check this out!';
  const tweetEncoded = encodeURIComponent(tweetToShare);
  return (
    <Container>
      <ButtonContainer>
        <div
          className="fb-share-button"
          data-href={urlToShare}
          data-layout="button"
          style={{ color: 'rgba(0, 0, 0, 0)' }}
        >
          Share on Facebook
        </div>
      </ButtonContainer>
      <ButtonContainer>
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${tweetEncoded}&url=${urlToShare}`}
          style={{ color: 'rgba(0, 0, 0, 0)' }}
        >
          Tweet
        </a>
      </ButtonContainer>
      <ButtonContainer>
        <a
          data-pin-do="buttonBookmark"
          href="https://www.pinterest.com/pin/create/button/"
          style={{ color: 'rgba(0, 0, 0, 0)' }}
        >
          Save to Pinterest
        </a>
      </ButtonContainer>
    </Container>
  );
}

export default SocialsSharing;
