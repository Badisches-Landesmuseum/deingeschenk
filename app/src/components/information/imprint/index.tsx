import React, { useEffect } from 'react';
import { assertNever } from '../../../utils/helpers';

import { events } from '../../../services';
import { pImprintOpenedEvent, pImprintClosedEvent } from '../../../event-definitions';

import { museum } from '../../../data';
import { ImprintContent as ImprintContentBLM } from './imprint-blm';


const ImprintContent = ImprintContentBLM;


const ImprintContentWithEvents: React.FC = () => {
  useEffect(() => {
    events.track(pImprintOpenedEvent());
    return () => events.track(pImprintClosedEvent());
  }, []);

  return <ImprintContent />;
};

export {
  ImprintContentWithEvents as ImprintContent,
};
