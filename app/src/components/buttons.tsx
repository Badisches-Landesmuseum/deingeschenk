import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

/**
 * Button components
 * Buttons is the button wrapper
 * Button for a clickable JS button
 * ButtonLink for a styled Router Link, to sit within our Buttons wrapper
 * ButtonAnchor for a styled a(nchor) tag, to sit within our Buttons wrapper
 */

const buttonPaddingVh = 2.5;
const buttonBorderRadiusVh = 2;
const buttonsPaddingVh = buttonPaddingVh * 2;

// Container for button(s) used at the bottom of screens
const Buttons = styled.div`
  display: flex;
  margin: 0;
  align-items: stretch;
  width: 100%;
  padding: 0 3% 3%;
  /* ensure the buttons section is visible without a button */
  /* min-height: calc(1em + ${buttonsPaddingVh}vh); */
  line-height: 1;
  z-index: 10; /* keep above most content */
  /* Set the height to match the buttons, desktop only */
  @media (max-width: ${global.mobile.endPixels}px) {
    font-size: 5vw;
  }
`;

type ButtonColour =
  | 'white'
  | 'black'
  | 'grey'
;


/**
 * Shared Button styles, for both Button and ButtonLink
 */
const buttonStyles = css<ButtonProps>`
  font-family: ${global.fonts.title.family};
  background-color: ${(props) =>
    props.colour === 'white' ? 'rgba(255, 255, 255, 0.7)' :
    props.colour === 'black' ? 'rgba(0, 0, 0, 0.7)' :
    props.colour === 'grey' ? 'rgba(50, 50, 50, 0.7)' :
    null
  };
  line-height: 1;
  margin: 0;
  padding: ${buttonPaddingVh}vh 1%;
  text-align: center;
  font-style: normal;
  flex-grow: 1;
  flex-basis: 0;
  opacity: 0.95;
  /* Ensure we style associated anchor */
  &, a {
    color: ${(props) => props.disabled
      ? 'grey'
      : props.colour === 'white' ? 'black' : 'white'};
  }
  &:active, &:hover {
    opacity: 1;
  }
  /* style when single button or in a pair */
  &:only-child {
    border-radius: ${global.borderRadius};
  }
  &:not(:only-child) {
    &:nth-child(1) {
      border-top-left-radius: ${buttonBorderRadiusVh}vh;
      border-bottom-left-radius: ${buttonBorderRadiusVh}vh;
      border-right: 1px solid;
      border-right-color: ${(props) => props.colour === 'black' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
    }
    &:nth-child(2) {
      border-top-right-radius: ${buttonBorderRadiusVh}vh;
      border-bottom-right-radius: ${buttonBorderRadiusVh}vh;
    }
  }
`;

/**
 * Button component
 */
export interface ButtonProps {
  primary?: boolean; // todo: remove this once confirm no longer required by NT
  colour?: ButtonColour; // Colour scheme for this button
  disabled?: boolean; // Is this visible button disabled?
  onClick?: () => void; // Callback when the button is clicked
}

// Button styles
const ButtonStyle = styled.button<ButtonProps>`
  ${buttonStyles};
`;

const Button: React.FC<ButtonProps> = ({ colour = 'white', disabled, children, onClick }) => {
  return (
    <ButtonStyle colour={colour} onClick={onClick} disabled={disabled}>
      <TextResize textSize={50}>{children}</TextResize>
    </ButtonStyle>
  );
};

/**
 * ButtonLink component
 * An Router Link component, styed like our Button
 */
export interface ButtonLinkProps {
  colour?: ButtonColour; // Colour scheme for this button
  to: string; // Router path for Link
  onClick?: () => void;
}

// Button link styles
const ButtonLinkStyle = styled(Link)<ButtonLinkProps>`
  ${buttonStyles};
`;

const ButtonLink: React.FC<ButtonLinkProps> = ({ colour = 'white', to, onClick, children }) => {
  return (
    <ButtonLinkStyle colour={colour} to={to} onClick={onClick}>
      <TextResize textSize={50}>{children}</TextResize>
    </ButtonLinkStyle>
  );
};

/**
 * ButtonAnchor component
 * An anchor component, styed like our Button
 */
export interface ButtonAchorProps {
  colour?: ButtonColour; // Colour scheme for this button
  href: string;
  target?: string;
  onClick?: () => void;
}

// Button link styles
const ButtonAnchorStyle = styled.a<ButtonAchorProps>`
  ${buttonStyles};
`;

const ButtonAnchor: React.FC<ButtonAchorProps> = ({ colour = 'white', href, target = '', onClick, children }) => {
  return (
    <ButtonAnchorStyle colour={colour} href={href} target={target} onClick={onClick}>
      <TextResize textSize={50}>{children}</TextResize>
    </ButtonAnchorStyle>
  );
};

/**
 * Base button used for controls (audio player, photo capture, etc)
 * Base button has active state
 */
const BaseControlButton = styled.button`
  opacity: 0.8;
  &:active {
    opacity: 1;
  }
`;

export {
  Button,
  ButtonLink,
  ButtonAnchor,
  Buttons,
  BaseControlButton,
};
