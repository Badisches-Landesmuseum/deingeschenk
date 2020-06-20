import React from 'react';

import { ErrorMessage } from '../components/messages/error-message';

export const NotFound: React.FC = () => (
  <ErrorMessage message='Sorry, that page cannot be found.' />
);
