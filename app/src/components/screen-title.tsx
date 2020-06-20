import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

export interface ScreenTitleProps {
  titleSize?: number; // Title text size
  marginBottom?: 'small' | 'medium'; // The margin below the title
  titleWeight?: 'bold' | 'black'; // Title weight
}

const ScreenTitle = styled(TextResize).attrs<ScreenTitleProps>((props) => ({
    scaleDownForSmallDevices: true,
    textSize: props.titleSize,
    // todo text size should be dynamic calculated to allow for long names
  }))<ScreenTitleProps>`
  line-height: 1;
  margin: 0;
  ${(props: ScreenTitleProps) => ((!props.marginBottom) || (props.marginBottom === 'medium')) && `
    margin-bottom: 1.3vh;
  `}
  ${(props: ScreenTitleProps) => props.marginBottom === 'small' && `
    margin-bottom: 0.5vh;
  `}
  @media (min-width: ${global.desktop.startPixels}px) {
    margin: 0 0 10px;
  }
  text-align: center;
  font-family: ${global.fonts.title.family};
  ${(props: ScreenTitleProps) => ((!props.titleWeight) || (props.titleWeight === 'bold')) && `
    font-weight: ${global.fonts.title.bold};
  `}
  ${(props: ScreenTitleProps) => (props.titleWeight === 'black') && `
    font-weight: ${global.fonts.title.black};
  `}
`;

ScreenTitle.defaultProps = {
  titleSize: 82,
};


export {
  ScreenTitle,
};
