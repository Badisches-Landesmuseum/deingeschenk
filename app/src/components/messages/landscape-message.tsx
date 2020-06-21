import React, { useState } from 'react';
import styled from 'styled-components';

import { isMobileDevice } from '../../utils/helpers';
import { MessageModal } from '../modals/message-modal';

/***
 * Shows a message when mobile device is in landscape orientation
 */

const StyledMessage = styled(MessageModal)`
  text-align: center;
`;

export const LandscapeMessage: React.FC = () => {

  // Our state
  const [isLandscape, setIsLandscape] = useState(getIsLandscape);

  // Return whether the screen is landscape
  function getIsLandscape(): boolean {
    // Note: dont compare width vs height, as when the keyboard appears on mobile the height can be < width
    // Note: dont use window.matchMedia('(orientation: landscape)') as it gives false results
    return window.orientation === 90 || window.orientation === -90;
  }

  // Updates the state with the current orientation
  function updateIsLandscape() {
    setIsLandscape(getIsLandscape());
  }

  // Check
  window.addEventListener('orientationchange', () => {
    updateIsLandscape();
  });
  window.addEventListener('resize', () => {
    updateIsLandscape();
  });

  if (isMobileDevice() && isLandscape) {
    return (
      <StyledMessage>
        <p>Diese App funktioniert nur im Portrait-Modus.</p>
        <p>Bitte drehe dein Gerät.</p>
        <div style={{fontSize: '5rem'}}>📱</div>
      </StyledMessage>
    );
  }

  // Default
  return null;

};
