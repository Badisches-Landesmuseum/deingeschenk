import * as React from 'react';
import styled from 'styled-components';

/***
 * Background img for Badisches Landesmuseum
 */
const BgBLMNoLogo: React.FC = () => (
  <div>
    <BgBLMStyle>
      <img src={require('../assets/image/bg-blm.jpeg')} />
    </BgBLMStyle>
    {
    }
  </div>
);

// Styled SVG for fullscreen
const BgBLMStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  img {
  height: 100%;
  }
`;


export {
  BgBLMNoLogo,
};
