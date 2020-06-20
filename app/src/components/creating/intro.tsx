import React, { useState } from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { WaitThen } from '../utils/wait-then';

import SvgGift from '../svg/gift';

/**
 * Introduction to gift creation. Simple auto-progressing text transitions.
 */

const GiftImg = styled.div`
  margin-top: 5%;
  width: 35%;
`;

type Status =
  | 'first-message'
  | 'second-message'
;


interface Props {
  onComplete: () => void;
}


export const CreateGiftIntro: React.FC<Props> = ({ onComplete }) => {

  // State
  const [status, setStatus] = useState<Status>('first-message');

  // Locals
  const defaultWait = 5;

  function renderFirstMessage() {
    return (
      <>
        <PanelContent>

          <PanelPrompt
            text='You’re
                  about to make
                  a gift for someone
                  special'
            textSize={50}
            background='transparent-black'
            onClick={() => setStatus('second-message')}
          >

            <GiftImg>
              <SvgGift colour='white' />
            </GiftImg>

          </PanelPrompt>

          <WaitThen
            wait={defaultWait}
            andThen={() => setStatus('second-message')}
          />

        </PanelContent>
      </>
    );
  }


  function renderSecondMessage() {
    return (
      <>
        <PanelContent>

          <PanelPrompt
            text={`It might
              take two minutes.
              It might take twenty.
              It’s up to you`}
            background={'transparent-black'}
            onClick={onComplete}
          />

          <WaitThen
            wait={defaultWait}
            andThen={onComplete}
          />

        </PanelContent>
      </>
    );
  }


  return (
    <Panel>
      {status === 'first-message' && renderFirstMessage()}
      {status === 'second-message' && renderSecondMessage()}
    </Panel>
  );
};
