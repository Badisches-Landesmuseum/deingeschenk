import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

/***
 * A sub title element at the top of panels
 */

const PanelSubTitle = styled(TextResize).attrs({
    textSize: 50,
  })`
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-style: italic
`;

export {
  PanelSubTitle,
};
