import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CLetThemKnowPart1TranscriptDemo } from './c-let-them-know-part-1-demo';
import { CLetThemKnowPart1TranscriptBrighton } from './c-let-them-know-part-1-brighton';
import { CLetThemKnowPart1TranscriptMunch } from './c-let-them-know-part-1-munch';


const Transcript = (museum.slug === 'demo') ? CLetThemKnowPart1TranscriptDemo
                 : (museum.slug === 'brighton') ? CLetThemKnowPart1TranscriptBrighton
                 : (museum.slug === 'munch') ? CLetThemKnowPart1TranscriptMunch
                 : (museum.slug === 'mpu') ? CLetThemKnowPart1TranscriptDemo
                 : assertNever(museum.slug);


const CLetThemKnowPart1Transcript: React.FC = () => {
  return <Transcript />;
};

export {
  CLetThemKnowPart1Transcript,
};
