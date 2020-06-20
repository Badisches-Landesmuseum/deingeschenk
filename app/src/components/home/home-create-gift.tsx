import React from 'react';
import styled from 'styled-components';

import { events } from '../../services';
import { hMorePressedEvent, hCreatePressedEvent } from '../../event-definitions';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelButtons } from '../panel-buttons';
import { Button, ButtonLink  } from '../buttons';
import SvgGift from '../svg/gift';

/**
 * Component that allows the user to create a gift from the home sequence
 */

const GiftImg = styled.div`
  width: 70%;
  position: relative;
`;

interface Props {
  onMoreClick: () => void; // callback when "More" is clicked
}

const HomeCreateGift: React.FC<Props> = ({ onMoreClick }) => {

  function handleMoreClick() {
    events.track(hMorePressedEvent());
    onMoreClick();
  }

  function handleCreateClick() {
    events.track(hCreatePressedEvent());
  }

  return (
    <Panel>

      <PanelContent topPosition='top-quarter'>
        <PanelPrompt
          textColor='black'
          background='solid-white'
        >

          <GiftImg>
            <SvgGift colour='black' />
          </GiftImg>

        </PanelPrompt>
      </PanelContent>

      <PanelButtons>
        <ButtonLink
          onClick={handleCreateClick}
          to='/create-gift'
        >
          Create a gift
        </ButtonLink>
        <Button onClick={handleMoreClick}>More...</Button>
      </PanelButtons>

    </Panel>
  );

};

export {
  HomeCreateGift,
};
