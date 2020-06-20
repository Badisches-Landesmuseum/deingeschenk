import React from 'react';
import { Link } from 'react-router-dom';

import { events } from '../services';
import { hGiftsOpenSentGift, hGiftsOpenReceivedGift } from '../event-definitions';

import { Gift } from '../domain';
import styled from 'styled-components';
import SvgGift from './svg/gift';
import { global } from '../themes/global';
import { TextResize } from './text-resize';

const GiftList = styled.div`
  position: relative;
  padding: 3vh 2% 2vh 5%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  /* hide scrollbars */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledGift = styled.div`
  width: 33%;
  display: inline-block;
  text-align: center;
  cursor: pointer;
`;

const GiftImg = styled.div`
  margin: 5% auto 0;
  width: 70%;
`;

const GiftTitle = styled.div`
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  margin-bottom: 0.5vh;
`;

// const GiftStatus = styled(TextResize)`
//   font-family: ${global.fonts.title.family};
//   font-style: italic
// `;

const GiftFrom = styled(TextResize)`
  margin-bottom: 2%;
`;

const SenderName = styled(TextResize)`
  margin-bottom: 4%;
`;

type GiftPileSource =
  | 'received'
  | 'sent'
;

interface Props {
  gifts: Gift[];
  source: GiftPileSource;
}

const GiftPile: React.FC<Props> = ({ gifts, source }: Props) => {

  function handleGiftClicked( giftId: string ): void {

    if (source === 'received') { events.track(hGiftsOpenReceivedGift(giftId)); }
    if (source === 'sent') { events.track(hGiftsOpenSentGift(giftId)); }

  }

  const giftList = gifts.map((gift, index) => (
    <StyledGift key={index}>
      <Link
        onClick={() => {handleGiftClicked(gift.id); }}
        to={`/gift/${gift.id}`}
      >
        <GiftImg>
          <SvgGift colour='black' />
        </GiftImg>
        <GiftTitle>
          <GiftFrom textSize={30}>from</GiftFrom>
          <SenderName textSize={30}>{gift.senderName}</SenderName>
        </GiftTitle>
        {/* <GiftStatus textSize={30}>New</GiftStatus> */}
      </Link>
    </StyledGift>
  ));

  return (
    <GiftList>
      {giftList}
    </GiftList>
  );
};

export {
  GiftPile,
};
