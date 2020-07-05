import React, { useState } from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { isIosDevice } from '../../utils/helpers';
import { museum } from '../../data';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { TextResize } from '../text-resize';
import { FeedbackModal } from '../modals/feedback-modal';
import { WaitThen } from '../utils/wait-then';

import SvgIconSms from '../svg/icon-sms';
import SvgIconEmail from '../svg/icon-email';
import SvgIconWhatsApp from '../svg/icon-whatsapp';
import SvgIconMessenger from '../svg/icon-messenger';
import SvgArrowForward from '../svg/arrow-forward';

/**
 * Component that allows a gift to be shared
 */

const SharesContent = styled(PanelContent)`
  width: 100%;
`;

const Shares = styled.div`
  margin: 1vh 0 0;
  padding: 0 3%;
  width: 100%;
`;

// Share link
const ShareLinkStyle = styled.a`
  display: flex;
  margin-bottom: 2vh;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 1;
  padding: 3vw 3vw;
  border-radius: ${global.borderRadius};
  width: 100%;
  text-align: center;
  align-items: center;
`;

const ShareLinkIcon = styled.div`
  width: 15%;
  height: auto;
  opacity: 0.7;
  svg { /* hack to prevent cutoff on iPhone7 */
    width: 99%;
  }
`;

const ShareLinkText = styled.div`
  width: 100%;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.normal};
  font-style: italic;
`;

const ShareLinkArrow = styled.div`
  width: 10%;
  margin-left: 5%;
  opacity: 0.7;
`;

interface ShareLinkProps {
  icon: JSX.Element;
  text: string;
  url: string;
  dataAction?: string; // data-target attribute for anchor
  onClick?: () => void;
}

export const ShareLink: React.FC<ShareLinkProps> = ({ icon, text, url, dataAction, onClick }) => {
  return (
    <ShareLinkStyle
      href={url}
      target='_blank'
      data-action={dataAction}
      onClick={onClick}
    >
      <ShareLinkIcon>{icon}</ShareLinkIcon>
      <ShareLinkText><TextResize textSize={50}>{text}</TextResize></ShareLinkText>
      <ShareLinkArrow><SvgArrowForward /></ShareLinkArrow>
    </ShareLinkStyle>
  );
};

// Share component
interface ShareGiftProps {
  senderName: string;
  recipientName: string;
  museumName: string;
  url: string;
  onChannelClicked: (channel: 'sms' | 'email' | 'whatsapp' | 'messenger') => void;
  onComplete: () => void;
}

export const ShareGift: React.FC<ShareGiftProps> = ({
  senderName,
  recipientName,
  museumName,
  url,
  onChannelClicked,
  onComplete,
}) => {

  // State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // String templates
  const shareText = `Hier ist ein Geschenk, das ich für dich im Badischen Landesmuseum gemacht habe... `;
  const emailText = `mailto:?subject=Ein Geschenk von mir aus dem Badischen Landesmuseum&body=Hallo ${recipientName},

Hier ist ein Geschenk, das ich für dich im Badischen Landesmuseum gemacht habe. Klicke auf den Link um es zu öffnen!

${url}

${senderName}`;

  // Prepare all of the URLS
  const emailLink = encodeURI(emailText).replace(/\,/g,"%2C");
  const fbMessengerLink = encodeURI(`fb-messenger://share/?link=${url}`);
  const whatsAppsLink = encodeURI(`whatsapp://send?text=${shareText} ${url}`);

  // Different format for iOS SMS
  const iosSmsLink = encodeURI(`sms:&body=${shareText} ${url}`);
  const androidSmsLink = encodeURI(`sms:?&body=${shareText} ${url}`);
  const smsLink = isIosDevice() ? iosSmsLink : androidSmsLink;

  return (
    <Panel>

      <WaitThen wait={2 * 60 * 1000} andThen={() => {setShowFeedbackModal(true); }} />
      {showFeedbackModal &&
        <FeedbackModal feedbackUrl={museum.feedbackUrl} onFinished={() => {setShowFeedbackModal(false); }} />
      }

      <PanelTitle>Verschicke dein Geschenk</PanelTitle>

      <SharesContent>
        <Shares>

          <ShareLink
            url={smsLink}
            text='SMS'
            icon={<SvgIconSms/>}
            onClick={() => onChannelClicked('sms')}
          />

          <ShareLink
            url={emailLink}
            text='Email'
            icon={<SvgIconEmail/>}
            onClick={() => onChannelClicked('email')}
          />

          <ShareLink
            url={whatsAppsLink}
            text='WhatsApp'
            icon={<SvgIconWhatsApp/>}
            dataAction='share/whatsapp/share'
            onClick={() => onChannelClicked('whatsapp')}
          />

          <ShareLink
            url={fbMessengerLink}
            text='Messenger'
            icon={<SvgIconMessenger/>}
            onClick={() => onChannelClicked('messenger')}
          />

        </Shares>
      </SharesContent>

      <PanelButtons>
        <Button onClick={onComplete} colour={'black'}>Weiter</Button>
      </PanelButtons>

    </Panel>
  );
};
