import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { TextResize } from '../text-resize';
import SvgGift from '../svg/gift';

/**
 *
 * Message component to inform users of import information. e.g. Error message
 * This component is extended in most examples
 * Occupies the entire screen, rather than a modal
 */

const Outer = styled.div`
  background-color: ${global.colour.darkGrey};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative; // For potential extended components
`;

const Inner = styled.div`
  max-width: ${global.mobile.endPixels}px;
  margin: 0 auto;
`;

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;
  text-align: center;
  color: ${global.colour.lightGrey};
`;

const GiftImg = styled.div`
  margin: 5% auto;
  width: 35%;
`;

interface Props {
  message?: string; // Optinal message to show.  Some components will extend this one and provide ther own text.
}

const ScreenMessage: React.FC<Props> = ({ message, children }) => {

  return (
    <Outer>
      <Inner>

        <Content>

          <GiftImg>
            <SvgGift colour='grey' />
          </GiftImg>

          {message && <TextResize>{message}</TextResize>}

          {children}

        </Content>

      </Inner>
    </Outer>
  );

};

export {
  ScreenMessage,
};
