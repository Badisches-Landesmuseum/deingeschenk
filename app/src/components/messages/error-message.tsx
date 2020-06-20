import React from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../themes/global';
import { Buttons, ButtonAnchor, ButtonLink } from '../buttons';
import { ScreenMessage } from './screen-message';
import { ScreenManager } from '../screen-manager';
import { TextResize } from '../text-resize';

/**
 * Error Message component
 * This will be shown instead of any other content
 */

interface Props {
  message: string;
}

const DeviceButtons = styled(Buttons)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ErrorTextResize = styled(TextResize)`
  margin-bottom: 1vh;
`;

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <ScreenManager>
    <ScreenMessage>
      <GlobalStyles />

      <ErrorTextResize>{message}</ErrorTextResize>

      <ErrorTextResize>Cancel to return to the Gift homepage</ErrorTextResize>

      <DeviceButtons>
        <ButtonLink colour='black' to='/'>Cancel</ButtonLink>
        <ButtonAnchor colour='black' href={window.location.href}>Try again</ButtonAnchor>
      </DeviceButtons>

    </ScreenMessage>
  </ScreenManager>
);

export {
  ErrorMessage,
};
