import React from 'react';

import { assertNever } from '../utils/helpers';
import { museum } from '../data';
import { BgSvgFullScreen } from './svg/bg';
import { BgOrangeFullScreen } from './bg-orange';
import { BgBLM } from './bg-blm';

/***
 * Return the background SVG for the current museum
 */

const Background = (museum.slug === 'demo') ? BgSvgFullScreen
                 : (museum.slug === 'brighton') ? BgSvgFullScreen
                 : (museum.slug === 'munch') ? BgOrangeFullScreen
                 : (museum.slug === 'mpu') ? BgSvgFullScreen
                 : (museum.slug === 'blm') ? BgBLM
                 : assertNever(museum.slug);


const BackgroundSvg: React.FC = () => {
  return <Background />;
};

export {
  BackgroundSvg,
};
