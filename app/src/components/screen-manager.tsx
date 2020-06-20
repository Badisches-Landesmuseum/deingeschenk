import React from 'react';
import styled from 'styled-components';

interface Props {
  allowScroll?: boolean; // Can the page be scrolled, or fix the viewport?
}

// Arranges the elements on the screen, using flex
const ScreenManagerStyle = styled.div<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden; // Added to ensure svg background is cropped

  ${(props: Props) => !props.allowScroll && `
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100); // Set in JS
  `}
`;

const ScreenManager: React.FC<Props> = ( { allowScroll = false, children } ) => {
  return (
    <ScreenManagerStyle allowScroll={allowScroll}>
      {children}
    </ScreenManagerStyle>
  );
};

// todo: ideally we would hide the chrome
// Fix the vh screen height issue
// Browsers do not consider the browser chrome when calculating viewport height
// We need to calculate out own to ensure our enstire screen is shown
function setupScreenHeight() {
  // Calculate the actual height of the window
  const vh = window.innerHeight * 0.01;
  // Set the css variable
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function waitThenSetupScreenHeight() {
  window.setTimeout(() => {
    setupScreenHeight();
  }, 500);
}

// Hookup the resize event to recalc our values
window.onresize = () => {
  waitThenSetupScreenHeight();
};

// Fire when fully loaded
window.onload = () => {
  setupScreenHeight();
};

// Orientation change
window.onorientationchange = () => {
  waitThenSetupScreenHeight();
};

export {
  ScreenManager,
};
