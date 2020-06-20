import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { RIntroContentRemotePersonalTranscriptionDemo } from './r-intro-content-remote-personal-demo';
import { RIntroContentRemotePersonalTranscriptionBrighton } from './r-intro-content-remote-personal-brighton';
import { RIntroContentRemotePersonalTranscriptionMunch } from './r-intro-content-remote-personal-munch';


const Transcript = (museum.slug === 'demo') ? RIntroContentRemotePersonalTranscriptionDemo
                 : (museum.slug === 'brighton') ? RIntroContentRemotePersonalTranscriptionBrighton
                 : (museum.slug === 'munch') ? RIntroContentRemotePersonalTranscriptionMunch
                 : (museum.slug === 'mpu') ? RIntroContentRemotePersonalTranscriptionDemo
                 : assertNever(museum.slug);


const RIntroContentRemotePersonalTranscription: React.FC = () => {
  return <Transcript />;
};

export {
  RIntroContentRemotePersonalTranscription,
};
