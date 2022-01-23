import uuidv5 from "uuid/v5";
import { GetGiftResponse } from "../common/api-schema";

export const preparedGifts = new Map<string, GetGiftResponse>();

/* tslint:disable max-line-length */

// =====
// GIFTS
// =====

/**
 * Brighton Museum curated Gift
 *
 * ID: 031a7ccc-4451-5139-9942-262bfed975d2
 */
preparedGifts.set(
  uuidv5("https://api.thegift.app/gift/brighton-museum-1", uuidv5.URL),
  {
    id: uuidv5("https://api.thegift.app/gift/brighton-museum-1", uuidv5.URL),
    kind: "MuseumGift",
    museumId: uuidv5(
      "https://api.thegift.app/museum/brighton-museum",
      uuidv5.URL
    ),
    senderName: "Brighton Museum",
    recipientName: "visitor",
    parts: [
      {
        photo:
          "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-photo.6046a68f.jpg",
        note: "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-note.c4ff803e.m4a",
        clue: "Find the cabinet of Japanese inspired furniture",
      },
      {
        photo:
          "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-photo.863ba708.jpg",
        note: "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-note.cd932aee.m4a",
        clue: "Look among the chairs by the  entrance",
      },
      {
        photo:
          "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-photo.819aeecd.jpg",
        note: "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-note.2ea33504.m4a",
        clue: "Search for the glass case of figurines",
      },
    ],
  }
);

/**
 * Munch Museum curated Gift
 *
 * ID: d9a99419-a5e1-5ba7-9ed0-7b0006eae213
 */
preparedGifts.set(
  uuidv5("https://api.thegift.app/gift/munch-museum-1", uuidv5.URL),
  {
    id: uuidv5("https://api.thegift.app/gift/munch-museum-1", uuidv5.URL),
    kind: "MuseumGift",
    museumId: uuidv5("https://api.thegift.app/museum/munch-museum", uuidv5.URL),
    senderName: "Munch Museum",
    recipientName: "visitor",
    parts: [
      {
        photo:
          "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-1-photo.7046a68f.jpg",
        note: "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-1-note.d5ff803f.m4a",
        clue: "Find this in the middle of the first room of the exhibition",
      },
      {
        photo:
          "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-2-photo.a046a68e.jpg",
        note: "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-2-note.ffaa804f.m4a",
        clue: "Look in the corner by the glass case with paints and brushes",
      },
      {
        photo:
          "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-3-photo.d046a68e.jpg",
        note: "https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-3-note.6gff805f.m4a",
        clue: "Follow the line of landscape painting to find this",
      },
    ],
  }
);

/**
 * Badisches Landesmuseum curated gift
 *
 * ID: 13b929c4-d4ff-508f-a995-3d25744ee5fd
 */
preparedGifts.set(uuidv5("https://landesmuseum.de/gift/gift1", uuidv5.URL), {
  id: uuidv5("https://landesmuseum.de/gift/gift1", uuidv5.URL),
  kind: "MuseumGift",
  museumId: uuidv5("https://landesmuseum.de", uuidv5.URL),
  senderName: "Badisches Landesmuseum",
  recipientName: "Besucher",
  parts: [
    {
      photo:
        "https://storage.geschenk.landesmuseum.de/gift/production/museum-gift/img_1.jpg",
      note: "https://storage.geschenk.landesmuseum.de/gift/production/museum-gift/audio_1.mp3",
      clue: "Gehe in die Ausstellung „Göttinnen des Jugendstils“. Suche nach dem größten Objekt im hinteren Teil des ersten Raumes.",
    },
    {
      photo:
        "https://storage.geschenk.landesmuseum.de/gift/production/museum-gift/img_2.jpg",
      note: "https://storage.geschenk.landesmuseum.de/gift/production/museum-gift/audio_2.mp3",
      clue: "Gehe durch die Verengung in den zweiten Raum. Es ist das erste Objekt im „grünen Bereich“. ",
    },
    {
      photo:
        "https://storage.geschenk.landesmuseum.de/gift/production/museum-gift/img_3.jpg",
      note: "https://storage.geschenk.landesmuseum.de/gift/production/museum-gift/audio_3.mp3",
      clue: "Das Objekt befindet sich im Raum „Von Beruf Künstlerin“ und hängt zwischen zwei roten Bögen.",
    },
  ],
});
