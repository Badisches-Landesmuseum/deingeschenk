import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

/***
 * Provides the sneak peak reveal
 *
 * Currently we are using clip-path: circle
 * This is not supported on MS Edge
 * https://www.html5rocks.com/en/tutorials/masking/adobe/
 */
interface PanelImageRevealProps {
  imageUrl: string;
}
const PanelImageRevealStyle = styled.div<PanelImageRevealProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  /* Possible MS Edge issue with clip path, check for Polyfill alternative */
  clip-path: circle(${(global.components.imageReveal.width.vm)} at center);
  @media (min-width: ${global.desktop.startPixels}px) {
    clip-path: circle(${(global.components.imageReveal.width.pixels)} at center);
  }
  z-index: 2;
`;

const PanelImageReveal: React.FC<PanelImageRevealProps> = (props: PanelImageRevealProps) => (
  <PanelImageRevealStyle {...props} />
);

export {
  PanelImageReveal,
};
