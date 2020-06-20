import React from 'react';
import styled from 'styled-components';

import { global, fadeInUp } from '../../themes/global';

import { Panel, PanelContent } from '../panel';
import { PanelRound } from '../panel-round';
import { TextResize } from './../text-resize';
import SvgGift from '../svg/gift';

/**
 * Open gift
 */

const GiftImage = styled.div`
  width: 70%;
  margin: 7% auto 0;
`;

const OpenPanel = styled.div`
  display: block;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeInUp};
`;

const OpenText = styled(TextResize).attrs({
    textSize: 60,
  })`
  font-style: italic;
  font-family: ${global.fonts.title.family};
  position: relative;
  top: -5%; // nudge up because of svg spacing
  color: black;
`;

export interface Props {
  onComplete: () => void;
}

export const ReceivingOpenGift: React.FC<Props> = ({ onComplete }) => {
  return (
    <Panel>
      <PanelContent>
        <PanelRound border={'none'} background={'solid-white'} onClick={onComplete}>
          <OpenPanel>
            <GiftImage>
              <SvgGift colour='black' />
            </GiftImage>
            <OpenText>Click to open</OpenText>
          </OpenPanel>
        </PanelRound>
      </PanelContent>
    </Panel>
  );
};
