import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../themes/global';

interface Props {
  // Note: textSize is optional as this is inherited by some components.
  // It's inherited as it allows good merging to CSS classes over styled components
  textSize?: number;
  // Automatically scale down the text size on devices with small aspect rations?  e.g. iPad, iPhone5, etc
  scaleDownForSmallDevices?: boolean;
}

const TextResize = styled.div<Props>`

  line-height: inherit;

  /* Default font size */
  font-size: ${(props) => calcMobileTextSize(props.textSize || 50)}vw;

  /* Do we need to scale down font sizes? */
  ${(props: Props) => props.scaleDownForSmallDevices && `

    /* Smaller text for smaller ratio mobiles */
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      font-size: ${calcMobileTextSize((props.textSize && props.textSize * 0.9) || 40)}vw;
    }
    /*  Smaller text for tablets */
    @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
      font-size: ${calcMobileTextSize((props.textSize && props.textSize * 0.8) || 40)}vw;
    }
  `}

  /* Desktop size on bigger screens */
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.textSize || 50 ) }%;
  };
`;

TextResize.defaultProps = {
  scaleDownForSmallDevices: false,
};


export {
  TextResize,
};
