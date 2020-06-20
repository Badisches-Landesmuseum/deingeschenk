import styled from 'styled-components';

/**
 * Flex driven container for our panel parts
 */
interface PanelProps {
  isParent?: boolean; // Should this Panel act as a parent for the child controls?
}
const Panel = styled.div<PanelProps>`
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */ /* This causes a problem with the reveal circle */
  height: 100%;
  width: 100%;
  flex-grow: 1;
  z-index: 3;
  position: ${(props) => props.isParent === false ? null : 'relative'};
`;

/**
 * Inner part
 */
interface PanelContentProps {
  topPosition?: 'top-quarter' | 'middle'; // Content position.  Used to show content higher, or in the middle
}

const PanelContent = styled.div<PanelContentProps>`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  z-index: 5; // keep above underlying stucture
  position: relative;

  position: absolute;
  left: 50%;
  top: ${(props) => props.topPosition === 'top-quarter' ? '25%' : '50%'} ;
  transform: ${(props) => props.topPosition === 'top-quarter' ? 'translate(-50%, -25%)' : 'translate(-50%, -50%)'} ;
`;


export {
  PanelContent,
  Panel,
};
