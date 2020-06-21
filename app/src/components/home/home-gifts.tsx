import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { events } from '../../services';
import { hGiftsCreatePressedEvent, hGiftsOpenMuseumGiftPressedEvent } from '../../event-definitions';

import { museum } from '../../data';
import { global } from '../../themes/global';
import { getSessionRecipientLocation } from '../../utils/local';

import { InformationWindow } from '../modals/information-window';
import { HelpContent } from '../information/help';
import { PanelTitle } from '../panel-title';
import { TextResize } from '../text-resize';
import SvgAddCircle from '../svg/add-circle';
import SvgGift from '../svg/gift';


/**
 * The gift home screen
 * Shows welcome message, gift pile, and create a gift
 */

 // Message
const HeaderMessage = styled.div`
  margin: 3% auto 3%;
  width: 80%;
  text-align: center;
`;

const HeaderMessageTextResize = styled(TextResize)`
line-height: 1.2;
`;

const OpenMuseumGift = styled.div`
  text-align: center;
`;
const OpenMuseumGiftSvg = styled.div`
  margin: 15% auto 1%;
  width: 30%;
`;
const OpenYourGift = styled.div`
  line-height: 1.3;
  margin-bottom: 18%;
`;
const OpenYourGiftText = styled(TextResize)`
  margin: 0 auto;
  max-width: 70%;
`;


const PlusStyle = styled.div`
  margin: 4% auto 0;
  width: 30%;
  cursor: pointer;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;
`;

const GiftsNotSent = styled.div`
  text-align: center;
  margin: 4% auto 5%; /* Extra spacing at the end to avoid clash with brower chrome */
  div {
    line-height: 1.3;
  }
`;

const CreateAGiftOfYourOwn = styled(TextResize)`
  margin: 0 auto;
  max-width: 70%;
`;

const LineSpacer = styled.div`
  margin: 2% 0 3% 0;
  border-bottom: 0.1vh solid rgba(0,0,0,0.5);
  width: 100%;
`;

const ReadMoreLink = styled.button`
  margin: 2% 0 0;
  font-style: italic;
  color: ${global.colour.darkGrey};
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.normal};
`;

const SectionTitle = styled(PanelTitle)`
  margin-bottom: 2%;
`;

const FeedbackSection = styled.div`
  margin: 5vh 0 15vh;
`;

/**
 * Home screen gifts top level component
 */

interface HomeGiftProps {
  museumName: string;
  curatedGiftId: string;
}

const HomeGifts: React.FC<HomeGiftProps> = ({ museumName, curatedGiftId }) => {

  // State
  const [helpIsOpen, setHelpIsOpen] = useState(false);

  // Prep for render
  const atMuseum = getSessionRecipientLocation() === 'at-museum';
  const showGiftText
  = (museum.slug === 'demo') ? `Show example gift from Brighton Museum`
  : `Öffne das Geschenk von ${museumName}`
  ;

  return (

    <>
      {helpIsOpen && (
        <InformationWindow
          onClose={() => { setHelpIsOpen(false); }}
        >
          <HelpContent />
        </InformationWindow>
      )}

      <HomeContent>

        <HeaderMessage>
          <HeaderMessageTextResize textSize={42}>
            Denk an eine besondere Person<br/>
            und erstelle ein Mixtape für sie<br/>
            - mit Objekten aus dem Museum.
          </HeaderMessageTextResize>

          <ReadMoreLink onClick={() => {setHelpIsOpen(true); }}>
            <TextResize textSize={42}>Mehr erfahren...</TextResize>
          </ReadMoreLink>
        </HeaderMessage>

        <LineSpacer />

        {!atMuseum && <SectionTitle textSize={42}>Wenn du jetzt im Museum bist...</SectionTitle>}

        <GiftsNotSent>
          {/* <TextResize textSize={50}>
            You've not sent any gifts<br/>
            Make one now?
          </TextResize> */}
          <Link
            onClick={() => events.track(hGiftsCreatePressedEvent())}
            to='/create-gift'
          >
            <CreateAGiftOfYourOwn textSize={42}>
              Stelle ein eigenes Geschenk zusammen
            </CreateAGiftOfYourOwn>
            <PlusStyle>
              <SvgAddCircle />
            </PlusStyle>
          </Link>
        </GiftsNotSent>

        <LineSpacer />

        <OpenMuseumGift>

          <Link
            onClick={() => events.track(hGiftsOpenMuseumGiftPressedEvent())}
            to={`/gift/${curatedGiftId}`}
          >

            <OpenMuseumGiftSvg>
              <SvgGift colour='black' />
            </OpenMuseumGiftSvg>

            <OpenYourGift>
              <OpenYourGiftText textSize={42}>{showGiftText}</OpenYourGiftText>
            </OpenYourGift>

          </Link>
        </OpenMuseumGift>

        <LineSpacer />

        <FeedbackSection>
          <ReadMoreLink>
            <TextResize textSize={42}>
              <a href={museum.feedbackUrl} target='_blank'>Hast du Feedback?</a>
            </TextResize>
          </ReadMoreLink>
        </FeedbackSection>

      </HomeContent>

    </>

  );

};

export {
  HomeGifts,
};
