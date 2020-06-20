import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroRemotePersonalTranscriptDemo } from './r-outro-remote-personal-demo';
import { ROutroRemotePersonalTranscriptBrighton } from './r-outro-remote-personal-brighton';
import { ROutroRemotePersonalTranscriptMunch } from './r-outro-remote-personal-munch';


const Transcript = (museum.slug === 'demo') ? ROutroRemotePersonalTranscriptDemo
                 : (museum.slug === 'brighton') ? ROutroRemotePersonalTranscriptBrighton
                 : (museum.slug === 'munch') ? ROutroRemotePersonalTranscriptMunch
                 : (museum.slug === 'mpu') ? ROutroRemotePersonalTranscriptDemo
                 : assertNever(museum.slug);


const ROutroRemotePersonalTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroRemotePersonalTranscript,
};
