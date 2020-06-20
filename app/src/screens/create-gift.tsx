import React from 'react';

import { isIosDeviceUsingChrome } from '../utils/helpers';
import { canUseAudioRecorder } from '../utils/use-audio-recorder';

import { museum } from '../data';
import { UnsupportedDevice } from '../components/messages/unsupported-device';
import { CreateGift } from '../components/creating/create-gift';

/**
 * Create gift screen
 */

const CreateGiftScreen: React.FC = () => {

  // Check the device meets our requirements

  // If this is an iOS device using Chrome prompt the user to use Safari, as they will have it
  if (isIosDeviceUsingChrome()) {
    return (
      <UnsupportedDevice message='Please open Gift in Safari on this device' />
    );
  }

  // If we can't record audio inform and force end
  if (!canUseAudioRecorder()) {
    return (
      <UnsupportedDevice message={`Your phone doesn't seem to allow you to record audio, so you can't create a gift`} />
    );
  }

  // Show
  return <CreateGift museumName={museum.name} museumId={museum.id} />;
};

export {
  CreateGiftScreen,
};
