import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { RIntroContentLocalMuseumTranscriptionDemo } from './r-intro-content-local-museum-demo';
import { RIntroContentLocalMuseumTranscriptionBrighton } from './r-intro-content-local-museum-brighton';
import { RIntroContentLocalMuseumTranscriptionMunch } from './r-intro-content-local-museum-munch';


const Transcript = (museum.slug === 'demo') ? RIntroContentLocalMuseumTranscriptionDemo
                 : (museum.slug === 'brighton') ? RIntroContentLocalMuseumTranscriptionBrighton
                 : (museum.slug === 'munch') ? RIntroContentLocalMuseumTranscriptionMunch
                 : (museum.slug === 'mpu') ? RIntroContentLocalMuseumTranscriptionDemo
                 : assertNever(museum.slug);


const RIntroContentLocalMuseumTranscription: React.FC = () => {
  return <Transcript />;
};

export {
  RIntroContentLocalMuseumTranscription,
};
