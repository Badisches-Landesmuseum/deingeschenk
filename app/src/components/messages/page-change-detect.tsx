import React from 'react';
import {Prompt} from 'react-router-dom';

/***
 * Detects when the page reloads/closes/moves away
 * Note: We do not detect or intefere with browser back as would be a bad user experience
 */

interface Props {
  enabled: boolean; // Enable or disable the whole control
  promptOnReloadAndClose?: boolean;  // Prompts the user on reload and close
  promptOnRouterLinkClick?: boolean; // Prompts the user if they click a router link
  confirmationMessage?: string; // Optional confirmation message
}

const PageChangeDetect: React.FC<Props> = ({
  enabled = true,
  promptOnReloadAndClose = true,
  promptOnRouterLinkClick = true,
  confirmationMessage = 'Bist du sicher, dass du die Seite verlassen willst?',
}) => {

  if (enabled && promptOnReloadAndClose) {

    // Note: This does not work on iOS, despite using 'pagehide' event
    const eventName = 'beforeunload';

    // Capture and prompt for reload/close
    // Note: Some browsers will ignore the message we give
    window.addEventListener(eventName, (e) => {

      e.cancelBubble = true;

      (e || window.event).returnValue = confirmationMessage; // Gecko + IE
      return confirmationMessage;                            // Webkit, Safari, Chrome
    });

  }

  if (enabled && promptOnRouterLinkClick) {

    // Use a router prompt to detect users clicking to a new URL
    return (
      <Prompt
        when={true}
        message={confirmationMessage}
      />
    );

  }

  // Default
  return null;

};

export {
  PageChangeDetect,
};
