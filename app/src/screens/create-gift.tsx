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
      <UnsupportedDevice message='Bitte nutze Das Geschenk auf diesem Gerät in Safari.' />
    );
  }

  // If we can't record audio inform and force end
  if (!canUseAudioRecorder()) {
    return (
      <UnsupportedDevice message={`Anscheinend erlaubt dein Gerät dir nicht, Audio aufzunehmen, also kannst du leider kein Geschenk erstellen.`} />
    );
  }

  // Show
  return <CreateGift museumName={museum.name} museumId={museum.id} />;
};

export {
  CreateGiftScreen,
};
