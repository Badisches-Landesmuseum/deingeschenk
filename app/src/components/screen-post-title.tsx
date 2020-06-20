import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const ScreenPostTitle = styled(TextResize).attrs({
  textSize: 30,
  scaleDownForSmallDevices: true,
})`
  margin: 0;
  text-align: center;
  line-height: 0.9;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenPostTitle,
};
