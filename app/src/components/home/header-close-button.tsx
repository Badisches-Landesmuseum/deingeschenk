import styled from 'styled-components';

import SvgCloseCircle from '../svg/close-circle';

/***
 * Close circle button used in the header and in modals
 */

const HeaderCloseButton = styled(SvgCloseCircle)`
  width: 8%;
  top: 2.5%;
  right: 2%;
  position: absolute;
  cursor: pointer;
  z-index: 100;
`;

export {
  HeaderCloseButton,
};
