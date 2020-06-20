import styled from 'styled-components';

import { TextResize } from './text-resize';

interface Props {
  textSize?: number;
}

// Pass through to TextResize
const PanelText = styled(TextResize).attrs<Props>((props) => ({
    textSize: props.textSize || 50,
  }))`
  text-align: center;
  font-weight: 300;
  padding: 0 5%;
  line-height: 1.1;
  width: 100%;
`;

export {
  PanelText,
};
