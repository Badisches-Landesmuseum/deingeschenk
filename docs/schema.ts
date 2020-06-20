type Id = string;
type MuseumId = Id;
type GiftId = Id;
type PhotoUrl = string;
type AudioRecordingUrl = string;


interface Gift {
  id: GiftId;
  kind: 'MuseumGift' | 'PersonalGift';
  museumId: MuseumId;
  senderName: string;
  recipientName: string;
  parts: GiftPart[];
}


interface GiftPart {
  photo: PhotoUrl;
  note: AudioRecordingUrl;
  clue: string;
}
