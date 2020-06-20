import React from 'react';
import styled from 'styled-components';

import { BaseModalWindow } from './base-modal-window';
import SvgCloseCircle from '../svg/close-circle';
import { global } from '../../themes/global';

/**
 * Popover Information component.
 * Used for showing information such as Privacy
 */

// Close button
const CloseButton = styled.button`
  width: 8%;
  top: 2.5%;
  right: 2%;
  position: absolute;
  cursor: pointer;
  z-index: 10;
`;

// Close circle
const SvgCloseCircleStyled = styled(SvgCloseCircle)`
`;

const Outer = styled(BaseModalWindow)`
  background-color: white;
  z-index: 12000;
  h1,
  h2 {
    margin: 20px 0 20px 0;
    font-family: ${global.fonts.title.family};
    font-weight: ${global.fonts.title.bold};
    color: #555555;
  }
  h3,
  h4,
  h5,
  em,
  p,
  ul,
  li {
    margin: 10px 0 0 0;
    font-family: ${global.fonts.body.family};
    color: #555555;
  }

  h1 {
    margin-top: 40px;
    color: #333333;
  }

  h2 {
    margin-top: 40px;
    color: #333333;
  }

  h3 {
    font-size: 1.15em;
    margin-top: 30px;
    color: #555555;
  }

  h4 {
    font-size: 0.9em;
    font-weight: 800;
    margin-top: 30px;
    color: #555555;
  }

  h5 {
    font-size: 0.88em;
    font-weight: 800;
    margin-top: 20px;
    color: #333;
  }

  p,
  ul,
  li {
    font-size: 0.88em;
    line-height: 1.3;
    margin-top: 3px;
  }

  ul {
    padding-left: 20px;
  }

  a {
    color: #f7a;
    text-decoration: none;
  }

  hr {
    margin-top: 80px;
    height: 0;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10% 10% 10% 8%;
  overflow: scroll;
  box-sizing: border-box;
`;

interface Props {
  onClose: () => void;
}

// Info Popover component
const InformationWindow: React.FC<Props> = (props) => {

  function handleClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Outer>
      <CloseButton onClick={handleClose} aria-label='close'>
        <SvgCloseCircleStyled />
      </CloseButton>
      <Inner>
        {props.children}
      </Inner>
    </Outer>
  );
};

export {
  InformationWindow,
};
