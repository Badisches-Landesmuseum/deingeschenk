// =====================================================================
//                          PreparedUpload
// =====================================================================

export interface CreatePreparedUploadRequest {
  mimeType: string;
}

export const createPreparedUploadRequestSchema = {
  type: 'object',
  properties: {
    mimeType: { type: 'string', minLength: 1 },
  },
  required: [
    'mimeType',
  ],
};


export interface CreatePreparedUploadResponse {
  postUrl: string;
  postFields: { [key: string]: string; };
  fileName: string;
  fileUrl: string;
  fileType: string;
}

export const createPreparedUploadResponseSchema = {
  type: 'object',
  properties: {
    postUrl: { type: 'string', minLength: 1 },
    postFields:  {
      type: 'object',
      properties: {},
      additionalProperties: { type: 'string' },
    },
    fileName: { type: 'string', minLength: 1 },
    fileUrl: { type: 'string', minLength: 1 },
    fileType: { type: 'string', minLength: 1 },
  },
  required: [
    'postUrl',
    'postFields',
    'fileName',
    'fileUrl',
    'fileType',
  ],
};



// =====================================================================
//                              Gift
// =====================================================================

// --------
// Get Gift
// --------

export interface GetGiftResponse {
  id: string;
  kind: 'MuseumGift' | 'PersonalGift';
  museumId: string;
  senderName: string;
  recipientName: string;
  parts: Array<{
    photo: string;
    note: string;
    clue: string;
  }>;
}

export const getGiftResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    kind: { type: 'string', enum: ['MuseumGift', 'PersonalGift'] },
    museumId: { type: 'string', format: 'uuid' },
    senderName: { type: 'string', minLength: 1 },
    recipientName: { type: 'string', minLength: 1 },
    parts: { type: 'array', minItems: 1, maxItems: 3, items: {
      type: 'object',
      properties: {
        photo: { type: 'string', format: 'uri' },
        note: { type: 'string', format: 'uri' },
        clue: { type: 'string' },
      },
      required: [
        'photo',
        'note',
        'clue',
      ],
    }},
  },
  required: [
    'id',
    'kind',
    'museumId',
    'senderName',
    'recipientName',
    'parts',
  ],
};

// -----------
// Create Gift
// -----------

export interface CreateGiftRequest {
  id: string;
  museumId: string;
  senderName: string;
  recipientName: string;
  parts: Array<{
    photo: string;
    note: string;
    clue: string;
  }>;
}

export const createGiftRequestSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    museumId: { type: 'string', format: 'uuid' },
    senderName: { type: 'string', minLength: 1 },
    recipientName: { type: 'string', minLength: 1 },
    parts: { type: 'array', minItems: 1, maxItems: 3, items: {
      type: 'object',
      properties: {
        photo: { type: 'string', minLength: 1 },
        note: { type: 'string', minLength: 1 },
        clue: { type: 'string' },
      },
      required: [
        'photo',
        'note',
        'clue',
      ],
    }},
  },
  required: [
    'id',
    'museumId',
    'senderName',
    'recipientName',
    'parts',
  ],
};

export type CreateGiftResponse = GetGiftResponse;
export const createGiftResponseSchema = getGiftResponseSchema;



// =====================================================================
//                              Event
// =====================================================================

// -----------------
// Submit App Events
// -----------------

export type SubmitEventsRequest = Array<{
  name: string;
  payload: {};
  occurredAt: Date;
}>;

export const submitEventsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      payload: { type: 'object' },
      occurredAt: { type: 'string', format: 'date-time' },
    },
    required: ['name', 'payload', 'occurredAt'],
  },
};
