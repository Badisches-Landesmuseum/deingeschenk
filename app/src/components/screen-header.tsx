import React, { useState } from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import { getUserHasAgreedTerms, setUserHasAgreedTerms } from '../utils/local';

import { ScreenTitle } from './screen-title';
import { ScreenSubTitle } from './screen-sub-title';
import { ScreenPostTitle } from './screen-post-title';
import { ScreenLogo } from './screen-logo';
import { InformationWindow } from './modals/information-window';
import { Gradient } from './gradient';
import { Menu, MenuBurger } from './home/menu';
import { HeaderCloseButton } from './home/header-close-button';
import { TermsModal } from './modals/terms-modal';
import { HelpContent } from './information/help';
import { TermsContent } from './information/terms';
import { ImprintContent } from './information/imprint';

/**
 * Global screen header
 */

// Texts wrapper
const HeaderTexts = styled.div`
  width: 70%;
  position: relative;
  left: 15%;
`;

type Padding =
  | 'none'
  | 'small'
  | 'medium'
  | 'large'
;

type BottomPadding =
  | 'none'
  | 'medium'
;

type ShowGradient =
  | 'none'
  | 'small'
  | 'big'
;

interface ScreenHeaderStyleProps {
  padding?: Padding;
  bottomPadding?: BottomPadding; // Optional value to override general padding
  museumName: string; // For terms dialog
  background?: 'none' | 'white';
}

// Header
const ScreenHeaderStyle = styled.div<ScreenHeaderStyleProps>`
  width: 100%;
  padding: 5% 2% 3%;
  position: relative;
  /* Smaller padding on tablets */
  @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
    padding: 3% 0;
  }
  ${(props) => props.padding === 'none' && `
    padding: 0;
  `}
  ${(props) => props.padding === 'small' && `
    padding-top: 7%;
    // Smaller padding on mobiles
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      padding: 2% 2%;
    }
    // Smaller padding on tablets
    @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
      padding: 1% 1%;
    }
  `}
  ${(props) => props.padding === 'medium' && `
    padding-top: 20%;
    // Smaller padding on smaller ratio screens
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      padding: 10% 5%;
    }
    @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
      padding: 5% 3%;
    }
  `}
  ${(props) => props.padding === 'large' && `
    padding-top: 30%;
    // Smaller padding on smaller ratio screens
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      padding: 15% 0% 5%;
    }
    @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
      padding: 10% 0% 3%;
    }
  `}
  ${(props) => props.background === 'white' && `
    background-color: white;
  `}
  padding-bottom: ${(props) => props.bottomPadding === 'none' ? '0 !important' : null};
`;

interface Props {
  showLogo?: boolean;
  showMenuBurger?: boolean;
  showCloseButton?: boolean;
  showGradient?: ShowGradient;
  preSubTitle?: string; // Text above the sub title
  subTitle?: string; // Smaller Sub title
  postSubTitle?: string; // Text after the sub title
  title?: string; // The main Title text
  postTitle?: string; // Text after the main title
  museumName: string; // For terms dialog
  titleSize?: number;  // Title text size
  titleWeight?: 'bold' | 'black'; // Title weight
  padding?: Padding; // Padding to apply
  bottomPadding?: BottomPadding; // Bottom only padding
  background?: 'none' | 'white'; // Background colour
  onTermsAccepted?: () => void; // Callback for when the terms are accepted
}

const ScreenHeader: React.FC<Props> = (props: Props) => {

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [privacyIsOpen, setPrivacyIsOpen] = useState(false);
  const [imprintIsOpen, setImprintIsOpen] = useState(false);
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [termsModalIsOpen, setTermsModalIsOpen] = useState(!getUserHasAgreedTerms());

  // Locals
  const screenTitleMarginBottom = props.padding === 'large' ? 'medium' : 'small';

  // Functions
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleAgreeTerms() {

    // Record the state
    setUserHasAgreedTerms();

    // Close the dialog
    setTermsModalIsOpen(false);

    // Callback
    if (props.onTermsAccepted) {
      props.onTermsAccepted();
    }

  }

  return (
    <>
    <ScreenHeaderStyle
      padding={props.padding}
      bottomPadding={props.bottomPadding}
      museumName={props.museumName}
      background={props.background}
    >

      {isMenuOpen && (
        <Menu
          openPrivacy={() => { setPrivacyIsOpen(true); }}
          openImprint={() => { setImprintIsOpen(true); }}
          openHelp={() => { setHelpIsOpen(true); }}
          onCloseClick={() => { setIsMenuOpen(false); }}
        />
      )}

      {props.showMenuBurger && !isMenuOpen && <MenuBurger onClick={toggleMenu} />}

      {props.showCloseButton && <HeaderCloseButton />}

      <HeaderTexts>

        {props.showLogo && <ScreenLogo />}
        {props.preSubTitle && <ScreenPostTitle>{props.preSubTitle}</ScreenPostTitle>}
        {props.subTitle && <ScreenSubTitle>{props.subTitle}</ScreenSubTitle>}
        {props.postSubTitle && <ScreenPostTitle>{props.postSubTitle}</ScreenPostTitle>}

        {/* support line breaks */}
        {props.title && props.title.split('\n').map((item, key) => {
          return (
            <ScreenTitle
              key={key}
              titleSize={props.titleSize}
              titleWeight={props.titleWeight}
              marginBottom={screenTitleMarginBottom}
            >
              {item}
            </ScreenTitle>
          );
        })}

        {props.postTitle && <ScreenPostTitle>{props.postTitle}</ScreenPostTitle>}

      </HeaderTexts>

      {props.showGradient !== undefined && props.showGradient !== 'none' && (
        <Gradient position='bottom' size={props.showGradient} />
      )}

    </ScreenHeaderStyle>

    {/* == Privacy == */}
    {privacyIsOpen && (
      <InformationWindow
        onClose={() => { setPrivacyIsOpen(false); }}
      >
        <TermsContent />
      </InformationWindow>
    )}

    {/* == Imprint == */}
    {imprintIsOpen && (
      <InformationWindow
        onClose={() => { setImprintIsOpen(false); }}
      >
        <ImprintContent />
      </InformationWindow>
    )}

    {/* == Help == */}
    {helpIsOpen && (
      <InformationWindow
        onClose={() => { setHelpIsOpen(false); }}
      >
        <HelpContent />
      </InformationWindow>
    )}

    {/* == Terms == */}
    {termsModalIsOpen && (
      <TermsModal
        onAgreeClick={handleAgreeTerms}
        onShowTerms={() => {setPrivacyIsOpen(true); }}
      />
    )}

    </>
  );
};

ScreenHeader.defaultProps = {
  showMenuBurger: true,
  showCloseButton: false,
  showGradient: 'none',
  titleSize: 82,
};


export {
  ScreenHeader,
};
