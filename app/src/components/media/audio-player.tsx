import React, { Fragment } from 'react';
import styled from 'styled-components';

import { events } from '../../services';
import {
  aPlayerPlayPressedEvent,
  aPlayerPausePressedEvent,
  aPlayerSkipPressedEvent,
  aPlayerStepBackwardsPressedEvent,
  aPlayerAudioCompletedEvent,
} from '../../event-definitions';


import { fadeInUp } from '../../themes/global';
import { ProgressBar } from '../progress-bar';
import { PanelText } from '../panel-text';
import { PanelRound } from '../panel-round';
import { BaseControlButton } from '../buttons';

import SvgButtonAudioPlay from '../svg/button-audio-play';
import SvgButtonAudioPause from '../svg/button-audio-pause';
import SvgButtonAudioBack from '../svg/button-audio-back';
import SvgButtonAudioForward from '../svg/button-audio-forward';
import SvgButtonAudioSkip from '../svg/button-audio-skip';

/**
 * Audio Player
 *
 */

const AudioPlayerStyle = styled.div`
  color: white;
  padding: 15% 5% 25%;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeInUp};
`;

const AudioPanelText = styled(PanelText)`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 8%;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8% 0 0;
  height: 55%;
`;

// == Buttons ==
const SkipBack = styled(BaseControlButton)`
  width: 20%
`;

const SkipForward = styled(BaseControlButton)`
  width: 20%
`;

const Play = styled(BaseControlButton)`
  width: 35%;
  margin: 0 5%;
`;

// Forward button options
export type AudioPlayerForwardButtonType = 'skip-seconds' | 'go-to-end';

interface Props {
  message: string; // Message show in player
  src: string; // Reference to audio file to play
  forwardButtonType: AudioPlayerForwardButtonType;
  giftId: string; // Not ideal to have this here, used for events
  audioReference: string;
  onPlaybackStarted?: () => void; // Optional callback when audio playback is started
  onPlaybackComplete?: () => void; // Optional callback when audio has completed playback
}

interface State {
  isPlaying: boolean;
  playbackPercentage: number;
}

export class AudioPlayer extends React.PureComponent<Props, State> {

  private static skipForwardSeconds: number = 5;
  private static skipBackwardSeconds: number = 5;

  public state = {
    isPlaying: false,
    playbackPercentage: 0,
  };

  private audio: HTMLAudioElement | null = new Audio(); // Our audio player

  constructor(props: Props) {
    super(props);

    // Setup audio player callbacks
    if (this.audio) {

      // Ended
      // todo: this doesn't seem to work now
      this.audio.addEventListener('ended', () => {
        if (this.audio) {
          // Update the UI
          this.setPlaybackPercentage(this.audio.duration);
          this.setState({
            isPlaying: false,
          });
        }
      });

    }

  }

  public componentDidMount() {

    // Hookup the progress bar to the audio position change
    if (this.audio) {
      this.audio.addEventListener('timeupdate', () => {
      // add code here to update the handle position
      if (this.audio) {
        this.setPlaybackPercentage(this.audio.currentTime);
      }
    });
    }

  }

  public setPlaybackPercentage(currentTime: number) {

    if (this.audio) {

      const duration = this.audio.duration;

      // Check for end
      if (currentTime === duration) {

        // End of audio file

        events.track(aPlayerAudioCompletedEvent(this.props.giftId, this.props.audioReference));

        // Update the state/UI
        this.setState({
          isPlaying: false,
          playbackPercentage: 100,
        });

        // Check for callback
        if (this.props.onPlaybackComplete) {
          this.props.onPlaybackComplete();
        }

      } else {

        // Calculate the percentage of playback
        let playbackPerc = 0;
        if (duration) { // Avoid div by zero
          playbackPerc = Math.round((currentTime / duration) * 100);
        }

        this.setState({
          playbackPercentage: playbackPerc,
        });

      }

    }

  }

  // Play/pause toggle
  public togglePlay = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    // Call playback event
    if (this.props.onPlaybackStarted) {
      this.props.onPlaybackStarted();
    }

    // If paused, then play
    if (this.audio.paused && this.audio.src) {

      events.track(aPlayerPlayPressedEvent(this.props.giftId, this.props.audioReference));

      // Start the player
      this.audio.play();

      // Update state/UI
      this.setState({
        isPlaying: true,
      });

    } else if (!this.audio.paused) {

      // If not paused, we must be playing, so pause

      events.track(aPlayerPausePressedEvent(this.props.giftId, this.props.audioReference));

      // Pause the player
      this.audio.pause();

      // Update state/UI
      this.setState({
        isPlaying: false,
      });

    }
  }

  // Skip forward seconds
  public skipForward = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    events.track(aPlayerSkipPressedEvent(this.props.giftId, this.props.audioReference));

    // Calculate our target
    const target = Math.round(this.audio.currentTime + AudioPlayer.skipForwardSeconds);

    // Avoid going over the maximum
    if (target > this.audio.duration) {

      // 100%
      this.audio.currentTime = this.audio.duration;

      // Stop
      if (this.state.isPlaying) {
        this.togglePlay();
      }
    } else {
      this.audio.currentTime = target;
    }

    // Update
    this.setPlaybackPercentage(this.audio.currentTime);

  }

  // Go to the end of the audio
  public goToEnd = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    events.track(aPlayerSkipPressedEvent(this.props.giftId, this.props.audioReference));

    // Stop
    if (this.state.isPlaying) {
      this.togglePlay();
    }

    // 100%
    this.audio.currentTime = this.audio.duration;

    // Update
    this.setPlaybackPercentage(this.audio.currentTime);

  }

  // Skip backwards seconds
  public skipBackward = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    events.track(aPlayerStepBackwardsPressedEvent(this.props.giftId, this.props.audioReference));

    // Calculate the target
    const target = Math.round(this.audio.currentTime - AudioPlayer.skipBackwardSeconds);

    // Avoid negative position
    this.audio.currentTime = Math.max(0, target);

    // Update
    this.setPlaybackPercentage(this.audio.currentTime);

  }

  public render() {

    // Prepare our props
    const { children } = this.props;
    const { isPlaying } = this.state;

    // Setup an incompatibility message
    const incompatibilityMessage = children || (
      <p>
        Your browser does not support the <code>audio</code> element.
      </p>
    );

    return (
      <PanelRound background={'transparent-black'}>
        <AudioPlayerStyle role='region' aria-label='audio player'>

          <audio
            src={this.props.src}
            controls={false}
            title={'Play'}
            loop={false}
            autoPlay={false}
            ref={(ref) => { this.audio = ref; }}
          >
            {incompatibilityMessage}
          </audio>

          {/* support line breaks */}
          <AudioPanelText>
            {this.props.message && this.props.message.split('\n').map((item, key) => {
              return <Fragment key={key}>{item}<br /></Fragment>;
            })}
          </AudioPanelText>

          <ProgressBar
            percent={this.state.playbackPercentage}
            theme={'white-on-black'}
            showPositionBar={true}
            height={'0.7vh'}
            /*onSeek={this.onSeek}*/
          />

          <Controls>

            <SkipBack onClick={this.skipBackward} aria-label='Zurückspulen' tabIndex={2}>
              <SvgButtonAudioBack />
            </SkipBack>

            <Play onClick={this.togglePlay} aria-label='Abspielen' tabIndex={0}>
              {isPlaying ? <SvgButtonAudioPause/> : <SvgButtonAudioPlay/>}
            </Play>

            {/* Skip forward seconds */}
            {this.props.forwardButtonType === 'skip-seconds' && (
              <SkipForward onClick={this.skipForward} aria-label='Vorspulen' tabIndex={1}>
                <SvgButtonAudioForward />
              </SkipForward>
            )}

            {/* Jump to end */}
            {this.props.forwardButtonType === 'go-to-end' && (
              <SkipForward onClick={this.goToEnd} aria-label='Überspringen' tabIndex={1}>
                <SvgButtonAudioSkip />
              </SkipForward>
            )}

          </Controls>
        </AudioPlayerStyle>
      </PanelRound>
    );
  }
}
