import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CStartGiftTranscriptDemo } from './c-start-gift-demo';
import { CStartGiftTranscriptBrighton } from './c-start-gift-brighton';
import { CStartGiftTranscriptMunch } from './c-start-gift-munch';
import { CStartGiftTranscriptBLM } from './c-start-gift-blm';


const Transcript = (museum.slug === 'demo') ? CStartGiftTranscriptDemo
                 : (museum.slug === 'brighton') ? CStartGiftTranscriptBrighton
                 : (museum.slug === 'munch') ? CStartGiftTranscriptMunch
                 : (museum.slug === 'mpu') ? CStartGiftTranscriptDemo
                 : (museum.slug === 'blm') ? CStartGiftTranscriptBLM
                 : assertNever(museum.slug);


const CStartGiftTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  CStartGiftTranscript,
};
