import React, { useEffect } from 'react';
import { assertNever } from '../../../utils/helpers';

import { events } from '../../../services';
import { pHelpOpenedEvent, pHelpClosedEvent } from '../../../event-definitions';

import { museum } from '../../../data';
import { HelpContent as HelpContentDemo } from './help-demo';
import { HelpContent as HelpContentBrighton } from './help-brighton';
import { HelpContent as HelpContentMunch } from './help-munch';
import { HelpContent as HelpContentMpu } from './help-mpu';


const HelpContent = (museum.slug === 'demo') ? HelpContentDemo
                  : (museum.slug === 'brighton') ? HelpContentBrighton
                  : (museum.slug === 'munch') ? HelpContentMunch
                  : (museum.slug === 'mpu') ? HelpContentMpu
                  : assertNever(museum.slug);


const HelpContentWithEvents: React.FC = () => {
  useEffect(() => {
    events.track(pHelpOpenedEvent());
    return () => events.track(pHelpClosedEvent());
  }, []);

  return <HelpContent />;
};

export {
  HelpContentWithEvents as HelpContent,
};
