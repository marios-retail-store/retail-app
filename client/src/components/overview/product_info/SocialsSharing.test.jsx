import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveAttribute } from '@testing-library/jest-dom';
// ^ used in all tests, but somehow does not get recognized
import SocialsSharing from './SocialsSharing.jsx';

describe('Socials Sharing', () => {
  it('should display 3 buttons: for facebook, twitter and pinterest', () => {
    render(<SocialsSharing />);
    const facebookBtn = screen.getByText('Share on Facebook');
    expect(facebookBtn).toBeInTheDocument();
    const twitterBtn = screen.getByText('Tweet');
    expect(twitterBtn).toBeInTheDocument();
    const pinterestBtn = screen.getByText('Save to Pinterest');
    expect(pinterestBtn).toBeInTheDocument();
  });

  it('each of the buttons should have the correct attribute for the automatic style to apply', () => {
    render(<SocialsSharing />);
    const facebookBtn = screen.getByText('Share on Facebook');
    expect(facebookBtn).toHaveClass('fb-share-button');
    const twitterBtn = screen.getByText('Tweet');
    expect(twitterBtn).toHaveClass('twitter-share-button');
    const pinterestBtn = screen.getByText('Save to Pinterest');
    expect(pinterestBtn).toHaveAttribute('data-pin-do', 'buttonBookmark');
  });
});
