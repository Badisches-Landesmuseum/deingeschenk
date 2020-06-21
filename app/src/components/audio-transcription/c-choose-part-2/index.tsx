import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CChoosePart2Demo } from './c-choose-part-2-demo';
import { CChoosePart2Brighton } from './c-choose-part-2-brighton';
import { CChoosePart2Munch } from './c-choose-part-2-munch';
import { CChoosePart2BLM } from './c-choose-part-2-blm';


const Transcript = (museum.slug === 'demo') ? CChoosePart2Demo
                 : (museum.slug === 'brighton') ? CChoosePart2Brighton
                 : (museum.slug === 'munch') ? CChoosePart2Munch
                 : (museum.slug === 'mpu') ? CChoosePart2Demo
                 : (museum.slug === 'blm') ? CChoosePart2BLM
                 : assertNever(museum.slug);


const CChoosePart2: React.FC = () => {
  return <Transcript />;
};

export {
  CChoosePart2,
};
