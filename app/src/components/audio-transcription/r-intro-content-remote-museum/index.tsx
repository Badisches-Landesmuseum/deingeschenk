import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { RIntroContentRemoteMuseumTranscriptionDemo } from './r-intro-content-remote-museum-demo';
import { RIntroContentRemoteMuseumTranscriptionBrighton } from './r-intro-content-remote-museum-brighton';
import { RIntroContentRemoteMuseumTranscriptionMunch } from './r-intro-content-remote-museum-munch';


const Transcript = (museum.slug === 'demo') ? RIntroContentRemoteMuseumTranscriptionMunch
                 : (museum.slug === 'brighton') ? RIntroContentRemoteMuseumTranscriptionMunch
                 : (museum.slug === 'munch') ? RIntroContentRemoteMuseumTranscriptionMunch
                 : (museum.slug === 'mpu') ? RIntroContentRemoteMuseumTranscriptionMunch
                 : assertNever(museum.slug);


const RIntroContentRemoteMuseumTranscription: React.FC = () => {
  return <Transcript />;
};

export {
  RIntroContentRemoteMuseumTranscription,
};
