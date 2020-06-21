import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { RIntroContentLocalPersonalTranscriptionDemo } from './r-intro-content-local-personal-demo';
import { RIntroContentLocalPersonalTranscriptionBrighton } from './r-intro-content-local-personal-brighton';
import { RIntroContentLocalPersonalTranscriptionMunch } from './r-intro-content-local-personal-munch';
import { RIntroContentLocalPersonalTranscriptionBLM } from './r-intro-content-local-personal-blm';


const Transcript = (museum.slug === 'demo') ? RIntroContentLocalPersonalTranscriptionDemo
                 : (museum.slug === 'brighton') ? RIntroContentLocalPersonalTranscriptionBrighton
                 : (museum.slug === 'munch') ? RIntroContentLocalPersonalTranscriptionMunch
                 : (museum.slug === 'mpu') ? RIntroContentLocalPersonalTranscriptionDemo
                 : (museum.slug === 'blm') ? RIntroContentLocalPersonalTranscriptionBLM
                 : assertNever(museum.slug);


const RIntroContentLocalPersonalTranscription: React.FC = () => {
  return <Transcript />;
};

export {
  RIntroContentLocalPersonalTranscription,
};
