import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroLocalPersonalTranscriptDemo } from './r-outro-local-personal-demo';
import { ROutroLocalPersonalTranscriptBrighton } from './r-outro-local-personal-brighton';
import { ROutroLocalPersonalTranscriptMunch } from './r-outro-local-personal-munch';


const Transcript = (museum.slug === 'demo') ? ROutroLocalPersonalTranscriptDemo
                 : (museum.slug === 'brighton') ? ROutroLocalPersonalTranscriptBrighton
                 : (museum.slug === 'munch') ? ROutroLocalPersonalTranscriptMunch
                 : (museum.slug === 'mpu') ? ROutroLocalPersonalTranscriptDemo
                 : assertNever(museum.slug);


const ROutroLocalPersonalTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroLocalPersonalTranscript,
};
