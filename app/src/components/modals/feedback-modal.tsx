import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { ModalDialogOuter } from './base-modal-dialog';
import { Buttons, Button, ButtonAnchor } from '../buttons';
import { TextResize } from '../text-resize';

/**
 * Feedback modal
 */

const Outer = styled(ModalDialogOuter)`
  position: fixed;
`;

const Inner = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
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
`;

const MainText = styled(TextResize)`
  color: ${global.colour.lightGreyText};
  margin-bottom: 5%;
  line-height: 1.2;
`;

interface Props {
  feedbackUrl: string;
  feedbackText?: string;
  onFinished: () => void; // Callback when the modal is finished with
}


const FeedbackModal: React.FC<Props> = ({ feedbackUrl, feedbackText, onFinished }) => {

  // Use feedbackText if provided, else fallback to default copy
  const mainText = feedbackText || `
    Wir würden sehr gerne deine Meinung hören, um Das Geschenk weiter zu verbessern. Wenn du 5 Minuten hast, bitte drücke auf Weiter
    um uns von deiner Erfahrung zu erzählen.
  `;

  return (
    <Outer>
      <Inner>

        <Texts>

          <TopText textSize={35}>Danke, dass du Das Geschenk benutzt!</TopText>

          <MainText textSize={35}>{mainText}</MainText>

        </Texts>

        <Buttons>
          <Button onClick={onFinished} colour='grey'>Nein, danke</Button>
          <ButtonAnchor
            href={feedbackUrl}
            target='_blank'
            onClick={onFinished}
            colour='grey'
          >
            Weiter
          </ButtonAnchor>
        </Buttons>

      </Inner>
    </Outer>
  );

};

export {
  FeedbackModal,
};
