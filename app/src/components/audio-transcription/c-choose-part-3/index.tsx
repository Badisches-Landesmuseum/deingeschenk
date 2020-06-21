import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CChoosePart3Demo } from './c-choose-part-3-demo';
import { CChoosePart3Brighton } from './c-choose-part-3-brighton';
import { CChoosePart3Munch } from './c-choose-part-3-munch';
import { CChoosePart3BLM } from './c-choose-part-3-blm';


const Transcript = (museum.slug === 'demo') ? CChoosePart3Demo
                 : (museum.slug === 'brighton') ? CChoosePart3Brighton
                 : (museum.slug === 'munch') ? CChoosePart3Munch
                 : (museum.slug === 'mpu') ? CChoosePart3Demo
                 : (museum.slug === 'blm') ? CChoosePart3BLM
                 : assertNever(museum.slug);


const CChoosePart3: React.FC = () => {
  return <Transcript />;
};

export {
  CChoosePart3,
};
