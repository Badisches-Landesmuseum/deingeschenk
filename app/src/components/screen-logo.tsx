import React from 'react';
import styled from 'styled-components';

import SvgGift from './svg/gift';

const StyledScreenLogo = styled.div`
  text-align: center;
  margin: 0 0 2vw;
`;

const StyledSvgGift = styled(SvgGift)`
  width: 25%;
`;

const ScreenLogo: React.FC = () => (
  <StyledScreenLogo>
    <StyledSvgGift colour='black' />
  </StyledScreenLogo>
);

export {
  ScreenLogo,
};
