import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CStartGiftTranscriptDemo } from './c-start-gift-demo';
import { CStartGiftTranscriptBrighton } from './c-start-gift-brighton';
import { CStartGiftTranscriptMunch } from './c-start-gift-munch';


const Transcript = (museum.slug === 'demo') ? CStartGiftTranscriptDemo
                 : (museum.slug === 'brighton') ? CStartGiftTranscriptBrighton
                 : (museum.slug === 'munch') ? CStartGiftTranscriptMunch
                 : (museum.slug === 'mpu') ? CStartGiftTranscriptDemo
                 : assertNever(museum.slug);


const CStartGiftTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  CStartGiftTranscript,
};
