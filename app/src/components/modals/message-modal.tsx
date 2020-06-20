import React from 'react';
import styled from 'styled-components';
import { BaseModalWindow } from './base-modal-window';

import { global } from '../../themes/global';

const Outer = styled(BaseModalWindow)`
  background-color: ${global.colour.lightGrey};
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;
  color: black;
  text-align: center;
`;

interface Props {
}

const MessageModal: React.FC<Props> = ({ children }) => {

  return (
    <Outer>
      <Inner>
        {children}
      </Inner>
    </Outer>
  );

};

export {
  MessageModal,
};
