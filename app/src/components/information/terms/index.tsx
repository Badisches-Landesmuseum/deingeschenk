import React, { useEffect } from 'react';
import { assertNever } from '../../../utils/helpers';

import { events } from '../../../services';
import { pTermsPrivacyOpenedEvent, pTermsPrivacyClosedEvent } from '../../../event-definitions';

import { museum } from '../../../data';
import { TermsContent as TermsContentDemo } from './terms-demo';
import { TermsContent as TermsContentBrighton } from './terms-brighton';
import { TermsContent as TermsContentMunch } from './terms-munch';
import { TermsContent as TermsContentMpu } from './terms-mpu';


const TermsContent = (museum.slug === 'demo') ? TermsContentDemo
                   : (museum.slug === 'brighton') ? TermsContentBrighton
                   : (museum.slug === 'munch') ? TermsContentMunch
                   : (museum.slug === 'mpu') ? TermsContentMpu
                   : assertNever(museum.slug);


const TermsContentWithEvents: React.FC = () => {
  useEffect(() => {
    events.track(pTermsPrivacyOpenedEvent());
    return () => events.track(pTermsPrivacyClosedEvent());
  }, []);

  return <TermsContent />;
};

export {
  TermsContentWithEvents as TermsContent,
};
