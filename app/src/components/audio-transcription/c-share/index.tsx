import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CShareTranscriptDemo } from './c-share-demo';
import { CShareTranscriptBrighton } from './c-share-brighton';
import { CShareTranscriptMunch } from './c-share-munch';


const Transcript = (museum.slug === 'demo') ? CShareTranscriptDemo
                 : (museum.slug === 'brighton') ? CShareTranscriptBrighton
                 : (museum.slug === 'munch') ? CShareTranscriptMunch
                 : (museum.slug === 'mpu') ? CShareTranscriptDemo
                 : assertNever(museum.slug);


const CShareTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  CShareTranscript,
};
