import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { RIntroContentLocalMuseumTranscriptionDemo } from './r-intro-content-local-museum-demo';
import { RIntroContentLocalMuseumTranscriptionBrighton } from './r-intro-content-local-museum-brighton';
import { RIntroContentLocalMuseumTranscriptionMunch } from './r-intro-content-local-museum-munch';
import { RIntroContentLocalMuseumTranscriptionBLM } from './r-intro-content-local-museum-blm';


const Transcript = (museum.slug === 'demo') ? RIntroContentLocalMuseumTranscriptionDemo
                 : (museum.slug === 'brighton') ? RIntroContentLocalMuseumTranscriptionBrighton
                 : (museum.slug === 'munch') ? RIntroContentLocalMuseumTranscriptionMunch
                 : (museum.slug === 'mpu') ? RIntroContentLocalMuseumTranscriptionDemo
                 : (museum.slug === 'blm') ? RIntroContentLocalMuseumTranscriptionBLM
                 : assertNever(museum.slug);


const RIntroContentLocalMuseumTranscription: React.FC = () => {
  return <Transcript />;
};

export {
  RIntroContentLocalMuseumTranscription,
};
