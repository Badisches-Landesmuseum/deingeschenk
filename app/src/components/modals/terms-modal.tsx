import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { ModalDialogOuter } from './base-modal-dialog';
import { Button, Buttons } from '../buttons';
import { TextResize } from '../text-resize';

import { museum } from '../../data';

/**
 * Terms & privacy modal
 */

const Inner = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
`;

const Texts = styled.div`
  text-align: center;
  padding: 5% 5% 4%;
  a {
    color: ${global.colour.darkRed};
    opacity: 0.7;
  }
`;

const TopText = styled(TextResize)`
  color: black;
  font-weight: 500;
  margin-bottom: 3%;
  line-height: 1.2;
`;

const MainText = styled(TextResize)`
  color: ${global.colour.lightGreyText};
  margin-bottom: 5%;
  line-height: 1.2;
`;

const TermsButton = styled.button`
  margin-bottom: 2%;
  color: ${global.colour.darkRed};
  opacity: 0.7;
`;

interface Props {
  onAgreeClick: () => void; // Callback when the agree button is clicked
  onShowTerms: () => void; // Callback when the show terms button is clicked
}

// tslint:disable max-line-length
const DemoContent: React.FC = () => (
  <>
    <TopText textSize={40}>This demo of Gift is hosted by<br/>&nbsp;
      <a href='https://www.blasttheory.co.uk/' target='_blank'>Blast Theory</a>
    </TopText>

    <MainText textSize={40}>
      <a href='https://gifting.digital/gift-experience/' target='_blank'>Find out more about hosting Gift at your museum</a>
    </MainText>

    <MainText textSize={35}>
      Blast Theory store and process your data to deliver this service and to make improvements.
      We will never share your personal information without your consent.
      Please press agree to continue.  If you'd like to learn more:
    </MainText>
  </>
);
// tslint:enable max-line-length

const StandardContent: React.FC = () => (
  <>
    <TopText textSize={35}>Gift at {museum.name} is produced by&nbsp;
      <a href='https://www.blasttheory.co.uk/' target='_blank'>Blast Theory</a>
    </TopText>

    <MainText textSize={35}>
      Blast Theory store and process your data to deliver this service and to make improvements.
      We will never share your personal information without your consent.
      Please press agree to continue.  If you'd like to learn more:
    </MainText>
  </>
);


const TermsModal: React.FC<Props> = ({ onAgreeClick, onShowTerms }) => {
  const innerContent = (museum.slug === 'demo') ? (<DemoContent />) : (<StandardContent />);

  return (
    <ModalDialogOuter>
      <Inner>

        <Texts>
          {innerContent}

          <TermsButton onClick={onShowTerms}>
            <TextResize textSize={40}>Read our terms &amp; privacy</TextResize>
          </TermsButton>

        </Texts>

        <Buttons>
          <Button onClick={onAgreeClick} colour='grey'>Agree and continue</Button>
        </Buttons>

      </Inner>
    </ModalDialogOuter>
  );

};

export {
  TermsModal,
};
