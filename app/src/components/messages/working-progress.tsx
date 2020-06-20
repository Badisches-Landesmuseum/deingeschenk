import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { ProgressLoader } from '../progress-loader';

const WorkingOuter = styled.div`
  background-color: ${global.colour.darkGrey};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const WorkingInner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;
`;

interface Props {
  percent?: number;
  text: string;
}

const WorkingProgress: React.FC<Props> = ({ percent, text }) => {

  return (
    <WorkingOuter>
      <WorkingInner>
        <ProgressLoader text={text} colourTheme={'light-grey'} percent={percent} />
      </WorkingInner>
    </WorkingOuter>
  );

};

export {
  WorkingProgress,
};
