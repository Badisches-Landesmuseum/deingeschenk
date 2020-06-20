import React, { useState } from 'react';

import { Gift } from '../../domain';
import { AccordionTitle } from '../accordion-title';
import { AudioPlayer } from '../media/audio-player';
import { AudioRecorder } from '../media/audio-recorder';
import { Buttons, Button } from '../buttons';

/***
 * Reply section of receiving a gift
 */

interface Props {
  gift: Gift;
}

const ReceiveReply: React.FC<Props> = (props) => {

  // Title
  const showOpenPrompt = false;
  const accordionTitleTextSize = 'small';
  const accordionTextColour = 'light';

  // Audio
  const [hasRecording, setHasRecording] = useState(false);
  const recordText = `Record a message to tell ${props.gift.senderName} what you thought of it`;

  const todo = () => { alert('TODO'); };

  return (
    <>
      <AccordionTitle
        showOpenPrompt={showOpenPrompt}
        textSize={accordionTitleTextSize}
        textColour={accordionTextColour}
      >
        Your reply
      </AccordionTitle>

      {hasRecording && (
        <AudioPlayer
          message={'Listen back to your reply...'}
          src={''}
          forwardButtonType={'go-to-end'}
          giftId={props.gift.id}
          audioReference={`r-reply`}
        />
      )}
      {!hasRecording && (
        <AudioRecorder status={'idle'} text={recordText} onClick={todo} />
      )}

      {/* Should this be PanelButtons ??? */}
      <Buttons>
        <Button onClick={todo}>Re-record</Button>
        <Button onClick={todo}>Send</Button>
      </Buttons>
    </>
  );
};

export {
  ReceiveReply,
};
