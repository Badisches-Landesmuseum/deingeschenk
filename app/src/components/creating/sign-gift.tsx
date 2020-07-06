import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { TextInputModal } from '../modals/text-input-modal';

/**
 * Sign the gift.  Sender enters their name.
 */

interface Props {
  onComplete: (senderName: string) => void;
}

export const SignGift: React.FC<Props> = ({ onComplete, recipientName }) => {

  // State
  const [showingEnterName, setShowingEnterName] = useState(false);

  return (
    <>

      {showingEnterName && (
        <TextInputModal
          placeHolder='Schreibe deinen Vornamen'
          onSaveClick={(name) => { onComplete(name); }}
          onCancelClick={() => { setShowingEnterName(false); }}
        />
      )}

      <Panel>
        <PanelTitle>Dein Geschenk fertigstellen</PanelTitle>
        <PanelSubTitle>Signiere es</PanelSubTitle>
        <PanelContent>
          <PanelPrompt
            text={`Lass ${recipientName} wissen, von wem das Geschenk kommt...`}
            background={'transparent-black'}
            onClick={() => { setShowingEnterName(true); }}
          />
        </PanelContent>
        <PanelButtons>
          <Button onClick={() => { setShowingEnterName(true); }} primary={true}>Schreibe deinen Vornamen</Button>
        </PanelButtons>
      </Panel>

    </>
  );

};
