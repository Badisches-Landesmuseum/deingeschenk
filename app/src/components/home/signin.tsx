import React, { useState } from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { BackgroundSvgNoLogo } from '../background-svg-no-logo';
import { TextInput } from '../inputs/text-input';
import { TextResize } from '../text-resize';
import { PanelTitle } from '../panel-title';
import { HeaderCloseButton } from './header-close-button';
import { BaseModalWindow } from '../modals/base-modal-window';

/**
 * Sign in component
 */

const Outer = styled(BaseModalWindow)`
  background-color: white;
`;

const Message = styled(TextResize)`
  color: black;
`;

interface Props {
  onCloseButtonClick: () => void; // Callback when the close button is clicked
}

const SignIn: React.FC<Props> = ({ onCloseButtonClick }) => {

  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Attempt the sign in
  function handleSignIn(email: string) {

    email = email; // todo remove this, once value is used

    // Todo: Check for 200 or 401 response from API

    setMessage(`Überprüfe...`);
    setEmailSent(true);

    // Contact the API, and show a response
    setTimeout( () => {
      setMessage('Check deine Mails für weitere Anweisungen.');
    }, 2000);

  }

  return (

    <Outer>
      <BackgroundSvgNoLogo />

      <HeaderCloseButton onClick={onCloseButtonClick} />

      <Panel>

        <PanelTitle>Anmelden</PanelTitle>

        <PanelContent>

          <TextInput
            placeHolder={'Deine E-Mail-Adresse'}
            onTextChanged={setEmailAddress}
            onEnterPressed={() => {handleSignIn(emailAddress); }}
          />

          <Message textSize={30}>{message}</Message>

        </PanelContent>

        <PanelButtons>
          {emailAddress && !emailSent &&
            <Button onClick={() => handleSignIn(emailAddress)} primary={true}>Anmelden</Button>
          }
        </PanelButtons>

      </Panel>

    </Outer>
  );

};

export {
  SignIn,
};
