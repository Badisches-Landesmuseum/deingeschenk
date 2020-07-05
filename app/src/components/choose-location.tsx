import React from 'react';

import { Panel, PanelContent } from './panel';
import { PanelPrompt } from './panel-prompt';
import { PanelButtons } from './panel-buttons';
import { Button } from './buttons';

/***
 * Choose location panel
 */

// Define our receiving locations
export type RecipientLocation = 'unknown' | 'at-museum' | 'not-at-museum';

export interface ChooseLocationProps {
  museumName: string;
  onLocationSelected: (recipientLocation: RecipientLocation) => void; // Callback to the parent
}

const ChooseLocation: React.FC<ChooseLocationProps> = (props) => {

  function handleAtMuseum(): void {
    props.onLocationSelected('at-museum');
  }

  function handleNotAtMuseum(): void {
    props.onLocationSelected('not-at-museum');
  }

  return (
    <Panel>
      <PanelContent topPosition='top-quarter'>
        <PanelPrompt
          text={`Befindest du dich gerade im Badischen Landesmuseum?`}
          background={'transparent-black'}
        />
      </PanelContent>
      <PanelButtons>
        <Button onClick={handleNotAtMuseum}>Nein</Button>
        <Button onClick={handleAtMuseum} primary={true}>Ja</Button>
      </PanelButtons>
    </Panel>
  );
};

export {
  ChooseLocation,
};
