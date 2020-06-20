import styled from 'styled-components';
import { global } from '../themes/global';

/***
 * Consitent round shape
 */

export type PanelRoundBackgroundStyle = 'transparent-black' | 'solid-white' | 'none';
export type PanelRoundBorderStyle = 'solid-red' | 'solid-grey' | 'none';

export interface Props {
  border?: PanelRoundBorderStyle; // default = 'none'
  background: PanelRoundBackgroundStyle;
}


const PanelRound = styled.div<Props>`
  height: ${global.components.circle.width.vm};
  width: ${global.components.circle.width.vm};
  @media (min-width: ${global.desktop.startPixels}px) {
    height: ${global.components.circle.width.pixels};
    width: ${global.components.circle.width.pixels};
  }
  border-radius: 50%;
  border-width: 2vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    border-width: 20px;
  }
  padding: 5%;
  margin: 0 auto;
  display: flex;
  z-index: 0;

  ${(props: Props) =>
    props.border === 'none' && `
      border: solid transparent;
      @media (min-width: ${global.desktop.startPixels}px) {
        border: solid transparent;
      }
  `}

  ${(props: Props) =>
    props.border === 'solid-red' && `
    border: solid ${global.colour.darkRed};
  `}

  ${(props: Props) =>
    props.border === 'solid-grey' && `
    border: solid ${global.colour.lightGrey};
  `}

  ${(props: Props) =>
    props.background === 'transparent-black' && `
    background-color: rgba(0, 0, 0, 0.7);
  `}

  ${(props: Props) =>
    props.background === 'solid-white' && `
    background-color: rgba(255, 255, 255, 1);
  `}

`;

PanelRound.defaultProps = {
  border: 'none',
};

export {
  PanelRound,
};
