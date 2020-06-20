import * as React from 'react';
import styled from 'styled-components';

/***
 * Background img for Munch museum
 */
const BgOrangeFullScreen: React.FC = () => (
  <BgSvgOrangeFullScreenStyle>
    <img src={require('../assets/image/bg-munch.jpg')} />
  </BgSvgOrangeFullScreenStyle>
);

// Styled SVG for fullscreen
const BgSvgOrangeFullScreenStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  img {
    width: 100%;
  }
`;

export {
  BgOrangeFullScreen,
};
