import { useState, useRef, useEffect } from 'react';
import MediaRecorderPolyfill from 'audio-recorder-polyfill';

import { LocalFile } from '../domain';
import { assertNever } from './helpers';

const MediaRecorder = window.MediaRecorder || MediaRecorderPolyfill;


/**
 * TODO: This is the external interface
 */
export type AudioRecorder =
  | { state: 'pending';  start: () => void; }
  | { state: 'preparing' }
  | { state: 'ready'; start: () => void; }
  | { state: 'recording'; stop: () => void; }
  | { state: 'processing' }
  | { state: 'audio-ready'; file: LocalFile; disposeRecording: () => void; }
  | { state: 'error'; error: AudioRecorderError; reset: () => void; }
;

type AudioRecorderError =
  | 'not-compatible'
  | 'not-allowed'
  | 'recording-error'
;


// Internal State
type State =
  | { kind: 'pending' }
  | { kind: 'preparing' }
  | { kind: 'ready'; recorder: MediaRecorder }
  | { kind: 'recording'; recorder: MediaRecorder }
  | { kind: 'processing'; recorder: MediaRecorder }
  | { kind: 'audio-ready'; recorder: MediaRecorder; file: LocalFile }
  | { kind: 'error'; recorder?: MediaRecorder; error: AudioRecorderError }
;


/**
 * TODO
 */
export const useAudioRecorder: () => AudioRecorder = () => {
  const [state, setState] = useState<State>({ kind: 'pending' });

  // Track the state in a mutable ref so we can use the current value when
  // cleaning up.
  const refState = useRef(state);
  refState.current = state;

  // Cleanup
  useEffect(() => (() => {
    const s = refState.current;
    if (s.kind === 'pending') return;
    if (s.kind === 'preparing') return;
    if (!s.recorder) return;
    s.recorder.stream.getTracks().forEach((track) => track.stop());
  }), []);


  if (state.kind === 'pending') {
    return {
      state: 'pending',
      start: () => {
        // Determine compatiblity
        if (!canUseAudioRecorder()) {
          setState({ kind: 'error',  error: 'not-compatible' });
          return;
        }

        setState({ kind: 'preparing' });

        // Prepare a media stream
        getUserMedia({ audio: true, video: false }).then(
          (stream) => {
            // Setup a new MediaRecorder
            const recorder = new MediaRecorder(stream);

            recorder.addEventListener('start', () => {
              setState({ kind: 'recording', recorder });
            });

            // Handle recording ready
            recorder.addEventListener('dataavailable', (e) => {
              const event = e as BlobEvent;
              const file = {
                url: URL.createObjectURL(event.data),
                mimeType: event.data.type,
              };
              setState({ kind: 'audio-ready', file, recorder });
            });

            // Handle error
            recorder.addEventListener('error', (e) => {
              const error = e as MediaRecorderErrorEvent;
              setState({ kind: 'error',  error: 'recording-error', recorder });
            });

            // Start recording
            try {
              recorder.start();
            } catch (e) {
              setState({ kind: 'error',  error: 'recording-error', recorder });
            }
          },
        ).catch(() => {
          setState({ kind: 'error',  error: 'not-allowed' });
        });
      },
    };
  }


  if (state.kind === 'preparing') {
    return { state: 'preparing' };
  }


  if (state.kind === 'ready') {
    return {
      state: 'ready',
      start: () => {
        const recorder = state.recorder;
        try {
          recorder.start();
          setState({ kind: 'recording', recorder });
        } catch (e) {
          setState({ kind: 'error',  error: 'recording-error', recorder });
        }
      },
    };
  }


  if (state.kind === 'recording') {
    return {
      state: 'recording',
      stop: () => {
        const recorder = state.recorder;
        try {
          recorder.stop();
          setState({ kind: 'processing', recorder });
        } catch (e) {
          setState({ kind: 'error',  error: 'recording-error', recorder });
        }
      },
    };
  }


  if (state.kind === 'processing') {
    return { state: 'processing' };
  }


  if (state.kind === 'audio-ready') {
    return {
      state: 'audio-ready',
      file: state.file,
      disposeRecording: () => {
        setState({ kind: 'ready', recorder: state.recorder });
        URL.revokeObjectURL(state.file.url);
      },
    };
  }


  if (state.kind === 'error') {
    return {
      state: 'error',
      error: state.error,
      reset: () => {
        setState({ kind: 'pending' });
        if (state.recorder) {
          state.recorder.stream.getTracks().forEach((track) => track.stop());
        }
      },
    };
  }


  return assertNever(state);
};

/**
 * A basic simulation of navigator.mediaDevices.getUserMedia which simply
 * rejects with an error.  We use this on unsupported devices.
 *
 * TODO: This should reject with a valid MediaStreamError to maintain consistent
 * interface.
 */
const UnsupportedGetUserMedia: MediaDevices['getUserMedia'] = () => Promise.reject(
  new Error('getUserMedia is not implemented in this browser'),
);



/**
 * Basic polyfill for navigator.mediaDevices.getUserMedia.
 *
 * Bits from: https://github.com/mozdevs/mediaDevices-getUserMedia-polyfill
 */
const getUserMedia: GetUserMedia = (() => {
  // If we have a promise-based navigator.mediaDevices.getUserMedia, use it.
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
  }

  // Check to see if we have an older-style navigator.getUserMedia
  const navigatorGetUserMedia = (navigator.getUserMedia ||
                                 (navigator as any).webkitGetUserMedia ||
                                 (navigator as any).mozGetUserMedia ||
                                 (navigator as any).msGetUserMedia);

  // Some browsers just don't implement it - return our promise rejector to keep
  // a consistent interface.
  if (!navigatorGetUserMedia) {
    return UnsupportedGetUserMedia;
  }

  // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
  const wrappedGetUserMedia: GetUserMedia = (constraints) => new Promise(
    (successCallback, errorCallback) => {
      navigatorGetUserMedia.call(navigator, constraints, successCallback, errorCallback);
    },
  );

  return wrappedGetUserMedia;
})();

type GetUserMedia = (constraints: MediaStreamConstraints) => Promise<MediaStream>;


/**
 * Determine whether or not this device should be able to record audio
 */
export const canUseAudioRecorder = () => getUserMedia !== UnsupportedGetUserMedia;
