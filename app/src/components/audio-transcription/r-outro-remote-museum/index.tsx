import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroRemoteMuseumTranscriptDemo } from './r-outro-remote-museum-demo';
import { ROutroRemoteMuseumTranscriptBrighton } from './r-outro-remote-museum-brighton';
import { ROutroRemoteMuseumTranscriptMunch } from './r-outro-remote-museum-munch';


const Transcript = (museum.slug === 'demo') ? ROutroRemoteMuseumTranscriptDemo
                 : (museum.slug === 'brighton') ? ROutroRemoteMuseumTranscriptBrighton
                 : (museum.slug === 'munch') ? ROutroRemoteMuseumTranscriptMunch
                 : (museum.slug === 'mpu') ? ROutroRemoteMuseumTranscriptDemo
                 : assertNever(museum.slug);


const ROutroRemoteMuseumTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroRemoteMuseumTranscript,
};
