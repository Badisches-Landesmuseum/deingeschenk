import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { Gift, GiftPart } from '../../domain';
import { romanNumeralFromDecimal } from '../../themes/global';
import { ReceivingIntroContent } from './panels/intro-content';
import { ReceivingPartContent } from './panels/part-content';
import { AccordionTitle } from '../accordion-title';
import { Gradient } from '../gradient';
import { RecipientLocation } from '../choose-location';
import { PanelImageReveal } from '../panel-image-reveal';


/**
 * Visual wrapper for a gift part
 * Handles displaying its contents
 */
export type GiftPartWrapperStatus = 'Idle' | 'Open' | 'Closed';

export interface Props {
  gift: Gift;
  giftPart: GiftPart;
  recipientLocation: RecipientLocation;
  onComplete: () => void;
}

interface State {
  activePanelIndex: number; // Which panel is active
  audioIntroPlayed: boolean; // Has the audio player
  hasOpened: boolean;  // Has this part ever been opened?
  isComplete: boolean; // Has the reader finsihed consuming this part
  blurImage: boolean; // Should the background image be blurred
  showImagePreview: boolean; // Should the circular preview be visible
}

interface StyledGiftPartProps {
  imageSrc: string;
  blurImage: boolean;
}

const StyledGiftPart = styled.div<StyledGiftPartProps>`
  /* Common */
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  position: relative;
  background-color: ${global.colour.blurBackground};

  /* Background image as :before to apply blur */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.imageSrc});
    background-position: center;
    background-size: cover;
    ${(props) => props.blurImage && `
      filter: blur(5px);
      opacity: 0.8;
    `}
  }
`;

class GiftPartWrapper extends React.PureComponent<Props, State> {

  public state = {
    activePanelIndex: 0,
    audioIntroPlayed: false,
    hasOpened: false,
    isComplete: false,
    blurImage: true,
    showImagePreview: false,
  };

  public unBlurImage = () => {
    this.setState({
      blurImage: false,
    });
  }

  public showImagePreview = () => {
    this.setState({
      showImagePreview: true,
    });
  }

  public getPanelCount(): number {

    const giftPartIndex = getGiftPartIndexInGift(this.props.gift, this.props.giftPart);

    if (giftPartIndex === 0) {
      return 2;
    } else {
      return 1;
    }

  }

  // Go to the next panel in the list
  public nextPanel = () => {

    const panelCount = this.getPanelCount();

    // Are we at the last panel?
    if ( (this.state.activePanelIndex + 1) === panelCount) {

      // Mark this part as complete
      this.setState({
        isComplete: true,
      });

      // We are at the last panel so onComplete
      if (this.props.onComplete) {
        this.props.onComplete();
      }

    } else {

      // Get the next index, but don't exceed the panels count
      const nextIndex = Math.min(this.state.activePanelIndex + 1, panelCount);

      // Update
      this.setState({
        activePanelIndex: nextIndex,
      });

    }

  }


  // Sets the audio intro having been played
  public handleIntroAudioPlayed = () => {
    this.setState({
      audioIntroPlayed: true,
    });
  }

  // Returns the index of the gift part in our gift

  // Load the content for the gift part
  public getGiftPartContent = () => {

    const index = this.state.activePanelIndex;
    const giftPartIndex = getGiftPartIndexInGift(this.props.gift, this.props.giftPart);

    // Render the correct content based on our gift part index [0,1,2]
    switch (giftPartIndex) {
      case 0 :
        return (
          <>
            {index === 0 && (
              <ReceivingIntroContent
                gift={this.props.gift}
                onComplete={this.nextPanel}
                recipientLocation={this.props.recipientLocation}
                audioIntroPlayed={this.state.audioIntroPlayed}
                handleAudioIntroPlayed={this.handleIntroAudioPlayed}
              />
            )}
            {index === 1 && (
              <ReceivingPartContent
                gift={this.props.gift}
                giftPartIndex={giftPartIndex}
                onComplete={this.nextPanel}
                recipientLocation={this.props.recipientLocation}
                revealBackgroundImage={this.unBlurImage}
                revealPreviewImage={this.showImagePreview}
              />
            )}
          </>
        );
      case 1 :
      case 2 :
        return (
          <ReceivingPartContent
            gift={this.props.gift}
            giftPartIndex={giftPartIndex}
            onComplete={this.nextPanel}
            recipientLocation={this.props.recipientLocation}
            revealBackgroundImage={this.unBlurImage}
            revealPreviewImage={this.showImagePreview}
          />
        );
      default :
        return null;
    }

  }

  public render() {

    const giftPartIndex = getGiftPartIndexInGift(this.props.gift, this.props.giftPart);

    return (
      <StyledGiftPart imageSrc={this.props.giftPart.photo} blurImage={this.state.blurImage} >

        <Gradient position={'top'} size={'big'} />

        {this.state.showImagePreview && <PanelImageReveal imageUrl={this.props.giftPart.photo} />}

        <AccordionTitle
          showOpenPrompt={false}
          textSize={'medium'}
          textColour={'white'}
        >
          Teil {romanNumeralFromDecimal(giftPartIndex + 1)}
        </AccordionTitle>
        {this.getGiftPartContent()}
      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};

/***
 * Returns the index of the gift part in our gift
 * Returns -1 if not found
 */
function getGiftPartIndexInGift(gift: Gift, part: GiftPart): number {

  for (let i = 0; i < gift.parts.length; i++) {
    if (gift.parts[i] !== part) continue;
    return i;
  }
  return -1;

}
