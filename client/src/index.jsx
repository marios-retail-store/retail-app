/* eslint-disable import/extensions */
import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './components/Router.jsx';

const root = createRoot(document.getElementById('app'));
root.render(<Router />);
