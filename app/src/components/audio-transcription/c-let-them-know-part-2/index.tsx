import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CLetThemKnowPart2TranscriptDemo } from './c-let-them-know-part-2-demo';
import { CLetThemKnowPart2TranscriptBrighton } from './c-let-them-know-part-2-brighton';
import { CLetThemKnowPart2TranscriptMunch } from './c-let-them-know-part-2-munch';
import { CLetThemKnowPart2TranscriptBLM } from './c-let-them-know-part-2-blm';


const Transcript = (museum.slug === 'demo') ? CLetThemKnowPart2TranscriptDemo
                 : (museum.slug === 'brighton') ? CLetThemKnowPart2TranscriptBrighton
                 : (museum.slug === 'munch') ? CLetThemKnowPart2TranscriptMunch
                 : (museum.slug === 'mpu') ? CLetThemKnowPart2TranscriptDemo
                 : (museum.slug === 'blm') ? CLetThemKnowPart2TranscriptBLM
                 : assertNever(museum.slug);


const CLetThemKnowPart2Transcript: React.FC = () => {
  return <Transcript />;
};

export {
  CLetThemKnowPart2Transcript,
};
