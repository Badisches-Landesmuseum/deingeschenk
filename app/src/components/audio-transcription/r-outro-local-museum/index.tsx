import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroLocalMuseumTranscriptDemo } from './r-outro-local-museum-demo';
import { ROutroLocalMuseumTranscriptBrighton } from './r-outro-local-museum-brighton';
import { ROutroLocalMuseumTranscriptMunch } from './r-outro-local-museum-munch';


const Transcript = (museum.slug === 'demo') ? ROutroLocalMuseumTranscriptDemo
                 : (museum.slug === 'brighton') ? ROutroLocalMuseumTranscriptBrighton
                 : (museum.slug === 'munch') ? ROutroLocalMuseumTranscriptMunch
                 : (museum.slug === 'mpu') ? ROutroLocalMuseumTranscriptDemo
                 : assertNever(museum.slug);


const ROutroLocalMuseumTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroLocalMuseumTranscript,
};
