import uuidv5 from 'uuid/v5';
import { Gift, GiftPart, InProgressGift } from '../src/domain';

// Empty gift, for creating
export const emptyGift: InProgressGift = {
  id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
  museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
  parts: [],
};

// Gifts, for receiving
export const giftThreeParts: Gift = {
  id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
  senderName: 'The Sender',
  recipientName: 'The Receiver',
  parts: [
    {
      photo: require('./assets/test.jpg'),
      note: require('./assets/1-second-of-silence.m4a'),
      clue: 'Part 1 clue',
    },
    {
      photo: require('./assets/test.jpg'),
      note: require('./assets/1-second-of-silence.m4a'),
      clue: 'Part 2 clue',
    },
    {
      photo: require('./assets/test.jpg'),
      note: require('./assets/1-second-of-silence.m4a'),
      clue: 'Part 3 clue',
    },
  ],
};

export const giftTwoParts: Gift = {
  id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
  senderName: 'The Sender',
  recipientName: 'The Receiver',
  parts: [
    {
      photo: 'https://picsum.photos/300/300/?random',
      note: require('./assets/1-second-of-silence.m4a'),
      clue: 'Part 1 clue',
    },
    {
      photo: 'https://picsum.photos/300/300/?random',
      note: require('./assets/1-second-of-silence.m4a'),
      clue: 'Part 2 clue',
    },
  ],
};

export const giftPart: GiftPart = {
  photo: require('./assets/test.jpg'),
  note: require('./assets/1-second-of-silence.m4a'),
  clue: 'Part 1 clue',
};
