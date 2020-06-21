import React, { useState } from 'react';
import styled from 'styled-components';

import { events } from '../../services';
import { rOpenPartPressedEvent } from '../../event-definitions';

import { assertNever } from '../../utils/helpers';
import { Gift, GiftPart } from '../../domain';
import { romanNumeralFromDecimal } from '../../themes/global';

import { GiftPartWrapper } from './gift-part-wrapper';
import { IdleGiftPart } from './idle-gift-part';
import { RecipientLocation } from '../choose-location';


/**
 * Holds and manages visual Gift Parts
 * Controls behaviours of the parts when clicked/made active
 */

const StyledGiftPartsManager = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  position: relative;
`;


interface Props {
  gift: Gift;
  recipientLocation: RecipientLocation;
}

interface State {
  status: ManagerStatus;
  partStateMap: Map<GiftPart, GiftPartState>;
}

type ManagerStatus =
  | { kind: 'ShowingAllParts' }
  | { kind: 'OnePartOpen', activePart: GiftPart };
  // | { kind: 'ShowingResponse' };

interface GiftPartState {
  isDisabled: boolean;
}


/**
 * Create a fresh new GiftPartsManagerState based on the provided gift.
 */
function mkState(gift: Gift): State {
  const partStateMap = new Map<GiftPart, GiftPartState>();

  gift.parts.forEach((part, idx) => {
    partStateMap.set(part, {
      isDisabled: idx !== 0,
    });
  });

  return {
    status: { kind: 'ShowingAllParts' },
    partStateMap,
  };
}


const GiftPartsManager: React.FC<Props> = ({ gift, recipientLocation }) => {
  const [state, setState] = useState(() => mkState(gift));


  if (state.status.kind === 'ShowingAllParts') {
    return (
      <StyledGiftPartsManager>
        {gift.parts.map((part, idx) => {
          const partState = state.partStateMap.get(part)!;
          const showOpenPrompt = (idx === 0);
          const textColour = (idx === 0) ? 'white' : 'light';

          return (
            <IdleGiftPart
              key={idx}
              part={part}
              displaySize={'big'}
              isDisabled={partState.isDisabled}
              showOpenPrompt={showOpenPrompt}
              textColour={textColour}
              onClick={() => {
                events.track(rOpenPartPressedEvent(gift.id, idx + 1));
                setState({
                  ...state,
                  status: { kind: 'OnePartOpen', activePart: part },
                });
              }}
            >
              Teil {romanNumeralFromDecimal(idx + 1)}
            </IdleGiftPart>
          );
        })}
      </StyledGiftPartsManager>
    );
  }


  if (state.status.kind === 'OnePartOpen') {
    const activePart = state.status.activePart;

    const handlePartComplete = (part: GiftPart) => {
      const nextPart = nextGiftPart(gift, part);

      if (nextPart) {
        // Mark the nextPart as no longer being disabled.
        const partStateMap = state.partStateMap;
        const nextPartState = partStateMap.get(nextPart)!;
        partStateMap.set(nextPart, {
          ...nextPartState,
          isDisabled: false,
        });

        setState({
          ...state,
          status: { kind: 'OnePartOpen', activePart: nextPart },
          partStateMap,
        });
      } /*else {
        setState({
          ...state,
          status: { kind: 'ShowingResponse' },
        });
      } */
    };

    return (
      <StyledGiftPartsManager>
        {gift.parts.map((part, idx) => {
          const partState = state.partStateMap.get(part)!;

          if (part === activePart) {
            return (
              <GiftPartWrapper
                key={idx}
                gift={gift}
                giftPart={part}
                recipientLocation={recipientLocation}
                onComplete={() => { handlePartComplete(part); }} // next
              />
            );
          }

          return (
            <IdleGiftPart
              key={idx}
              part={part}
              displaySize={'small'}
              showOpenPrompt={false}
              textColour={'light'}
              isDisabled={partState.isDisabled}
              onClick={() => setState({
                ...state,
                status: { kind: 'OnePartOpen', activePart: part },
              })}
            >
              Teil {romanNumeralFromDecimal(idx + 1)}
            </IdleGiftPart>
          );
        })}
      </StyledGiftPartsManager>
    );
  }


  // if (state.status.kind === 'ShowingResponse') {
  //   return (
  //     <StyledGiftPartsManager>
  //       <PanelContent>
  //         <h3>TODO: Respond to gift</h3>
  //       </PanelContent>
  //     </StyledGiftPartsManager>
  //   );
  // }

  return assertNever(state.status);
};

/**
 * Find the part after the given one for the given gift.
 *
 * Returns `null` if there are no more parts in the gift.
 */
function nextGiftPart(gift: Gift, currentPart: GiftPart): GiftPart | null {
  for (let i = 0; i < gift.parts.length; i++) {
    if (gift.parts[i] !== currentPart) continue;
    return gift.parts[i + 1] || null;
  }
  return null;
}

export {
  GiftPartsManager,
};
