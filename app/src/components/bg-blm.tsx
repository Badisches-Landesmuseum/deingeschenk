import * as React from 'react';
import styled from 'styled-components';

/***
 * Background img for Badisches Landesmuseum
 */
const BgBLM: React.FC = () => (
  <div>
    <BgBLMStyle>
      <img src={require('../assets/image/bg-blm.jpeg')} />
    </BgBLMStyle>
    {/*
    <TopLogoStyle>
      <img src={require('../assets/svg/blm_logo_top.svg')} />
    </TopLogoStyle>
    <BottomLogoStyle>
      <img src={require('../assets/svg/blm_logo_bottom.svg')} />
    </BottomLogoStyle>
    */}
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

const TopLogoStyle = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 0;
  width: 30%;
  height: 30%;
  pointer-events: none;
`;

const BottomLogoStyle = styled.div`
  position: absolute;
  top: 95%;
  left: 5%;
  z-index: 0;
  width: 30%;
  height: 30%;
  pointer-events: none;
`;

export {
  BgBLM,
};
