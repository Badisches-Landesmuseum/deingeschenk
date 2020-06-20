import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import { ProgressBar } from '../components/progress-bar';

import SvgGift from './svg/gift';

interface Props {
  text: string;
  colourTheme: 'white' | 'light-grey';
  percent?: number;
}

const StyledProgressLoader = styled.div<Props>`
  /* height: 100%; */
  /* height: 100vh; */
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${(props) => props.colourTheme === 'white' && `
    color: ${global.colour.whiteText};
  `}
  ${(props) => props.colourTheme === 'light-grey' && `
    color: ${global.colour.lightGrey};
  `}
`;

const ProgressTitle = styled.div`
  text-align: center;
`;

const GiftIcon = styled.div`
  width: 30%;
  margin-bottom: 5%;
`;

const ProgressLoader: React.FC<Props> = (props) => {

  // Progress bar theme
  const theme = props.colourTheme === 'white' ? 'white-on-black' : 'grey-on-black';

  // Gift SVG colour
  const colour = props.colourTheme === 'white' ? global.colour.whiteText : global.colour.lightGrey;

  return (
    <StyledProgressLoader {...props}>
      <GiftIcon>
        <SvgGift colour={colour} />
      </GiftIcon>
      <ProgressTitle>{props.text}</ProgressTitle>

      { props.percent !== undefined && (
          <>
            <ProgressBar percent={props.percent} theme={theme} height='0.1rem' />
            <ProgressTitle>{props.percent}%</ProgressTitle>
          </>
      )}
    </StyledProgressLoader>
  );

};

export {
  ProgressLoader,
};
