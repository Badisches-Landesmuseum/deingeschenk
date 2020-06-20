import styled from 'styled-components';

import { global } from '../../themes/global';

/***
 * This is a base modal dialog.
 * Others can inherit the style to ensure consistent resuable behvaiour.
 */

const ModalDialogOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  z-index: 9999;
`;

const ModalDialogInner = styled.div`
  width: 90%;
  margin: 0 auto;
  top: 50%;
  position: relative;
  transform: translateY(-50%);
  background-color: white;
  border-radius: ${global.borderRadius};
  padding: 5% 0 0;
  text-align: center;
`;


export {
  ModalDialogOuter,
  ModalDialogInner,
};
