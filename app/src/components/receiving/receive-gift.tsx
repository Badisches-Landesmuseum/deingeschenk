import React from 'react';
import styled from 'styled-components';

import { assertNever } from '../../utils/helpers';
import { events } from '../../services';
import { rAtMuseumConfirmedEvent, rOpenPressedEvent } from '../../event-definitions';

import { Gift } from '../../domain';
import { GlobalStyles, global } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { TextResize } from '../text-resize';
import { ScreenHeader } from '../screen-header';
import { GiftPartsManager } from './gift-parts-manager';
import { ChooseLocation, RecipientLocation } from '../choose-location';
import { Button } from '../buttons';
import { ReceivingOpenGift } from './open-gift';
import { Panel, PanelContent } from '../panel';
import { PanelButtons } from '../panel-buttons';
import { PanelPrompt } from '../panel-prompt';
import { BackgroundSvg } from '../background-svg';
import {
  getSessionRecipientLocation,
  setSessionRecipientLocation,
} from '../../utils/local';
import history from '../../utils/router-history';

/**
 * Gift Receive screen top level component
 */

export const MainTitle = styled(TextResize).attrs({
  textSize: 40,
})`
  z-index: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  margin: 5vh 0 0;
`;

export const MuseumName = styled(TextResize).attrs({
  textSize: 150,
})`
  z-index: 1;
  width: 90%;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  line-height: 0.9;
`;

// Current status of this screen
type ReceiveGiftStatus = 'Welcome' | 'SelectLocation' | 'OpenOrSave' | 'ShowingParts';

interface Props {
  gift: Gift;
  museumName: string;
}

interface State {
  status: ReceiveGiftStatus;
  recipientLocation: RecipientLocation;
  compactHeader: boolean;
}

class ReceiveGift extends React.PureComponent<Props, State> {

  public state: State = {
    status: 'Welcome',
    recipientLocation: getSessionRecipientLocation(), // Default to the stored session value
    compactHeader: false,
  };


  public handleOpenClicked = () => {
    events.track(rOpenPressedEvent(this.props.gift.id));

    if (this.state.recipientLocation === 'unknown') {
      this.setState({ status: 'SelectLocation' });
    } else {
      this.setState({ status: 'ShowingParts' });
    }
  }


  public handleOpenAnywayClicked = () => {
    this.setCompactHeader();
    this.setState({
      status: 'ShowingParts',
    });
  }


  public handleSetLocation = (recipientLocation: RecipientLocation) => {
    if (recipientLocation === 'at-museum') events.track(rAtMuseumConfirmedEvent(this.props.gift.id, true));
    if (recipientLocation === 'not-at-museum') events.track(rAtMuseumConfirmedEvent(this.props.gift.id, false));

    setSessionRecipientLocation(recipientLocation);

    // Determine the next stage based on the location
    const nextStage: ReceiveGiftStatus = recipientLocation === 'not-at-museum'
      ? 'OpenOrSave'
      : 'ShowingParts';

    // Store this
    this.setState({
      recipientLocation,
      status: nextStage,
    });
  }


  public handleSaveForLaterClicked = () => {

    // Go to the homepage
    history.push('/');

  }


  public setCompactHeader = () => {
    this.setState({
      compactHeader: true,
    });
  }


  // Return the correct content based on status
  public renderContent() {
    switch (this.state.status) {
      case 'Welcome':
        return this.renderWelcome();
      case 'OpenOrSave':
        return this.renderOpenOrSave();
      case 'SelectLocation':
        return this.renderSelectLocation();
      case 'ShowingParts':
        return this.renderGiftParts();
      default:
        return assertNever(this.state.status);
    }
  }

  public renderWelcome() {
    return (
      <ReceivingOpenGift onComplete={this.handleOpenClicked} />
    );
  }

  public renderOpenOrSave() {
    return (
      <Panel>
        <PanelContent>
          <PanelPrompt
            text={`Open it now or save your gift for when you're at the museum?`}
            background={'transparent-black'}
          />
        </PanelContent>
        <PanelButtons>
          <Button onClick={this.handleOpenAnywayClicked} primary={true}>Open it now</Button>
          <Button onClick={this.handleSaveForLaterClicked}>Save it</Button>
        </PanelButtons>
      </Panel>
    );
  }

  public renderGiftParts() {
    return (
      <GiftPartsManager
        gift={this.props.gift}
        recipientLocation={this.state.recipientLocation}
      />
    );
  }

  public renderSelectLocation() {
    return (
      <ChooseLocation
        museumName={this.props.museumName}
        onLocationSelected={this.handleSetLocation}
      />
    );
  }

  public render() {

    const { status, compactHeader } = this.state;

    // The header size is based on our current state
    const headerSize = compactHeader ? 'compact'
      : status === 'Welcome' || status === 'SelectLocation' || status === 'OpenOrSave' ? 'big'
      : 'small';

    // Only include museum name for personal gift
    const museumName = this.props.gift.kind === 'PersonalGift'
      ? `at ${this.props.museumName}`
      : '';

    return (
      <ScreenManager>
        <BackgroundSvg />
        <GlobalStyles />

        {headerSize === 'big' && (
          <>
            <ScreenHeader
              showLogo={false}
              museumName={museumName}
            />
            <MainTitle>Here's your gift from</MainTitle>
            <MuseumName>{this.props.gift.senderName}</MuseumName>
          </>
        )}
        {headerSize === 'small' && (
          <ScreenHeader
            postSubTitle={`Your gift from`}
            title={this.props.gift.senderName}
            showLogo={false}
            background='white'
            museumName={museumName}
          />
        )}
        {headerSize === 'compact' && (
          <ScreenHeader
            postSubTitle={`Your gift from`}
            title={this.props.gift.senderName}
            showLogo={false}
            background='white'
            museumName={museumName}
          />
        )}

        {this.renderContent()}
      </ScreenManager>
    );
  }
}

export {
  ReceiveGift,
};
