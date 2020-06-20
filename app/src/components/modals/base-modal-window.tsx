import styled from 'styled-components';

/***
 * This is a base modal window.  It is full screen.
 * Others can inherit the style to ensure consistent resuable behvaiour.
 *
 */

const BaseModalWindow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; // High above everything else
`;

export {
  BaseModalWindow,
};
