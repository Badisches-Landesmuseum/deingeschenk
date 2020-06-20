import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom';

import history from '../src/utils/router-history';
import { setImageOrientation, getImageOrientation, calcImageOrientationChange, resizeImage } from '../src/utils/image';
import { setPrefix, getLocalItem, setLocalItem } from '../src/utils/storage';
import { Gift } from '../src/domain';

// Components
import { ScreenTitle } from '../src/components/screen-title';
import { ScreenHeader } from '../src/components/screen-header';
import { GiftPile } from '../src/components/gift-pile';
import { GlobalStyles } from '../src/themes/global';
import { GiftPartsManager } from '../src/components/receiving/gift-parts-manager';
import { IdleGiftPart } from '../src/components/receiving/idle-gift-part';
import { GiftPartWrapper } from '../src/components/receiving/gift-part-wrapper';
import { PanelContent, Panel } from '../src/components/panel';
import { PanelPrompt } from '../src/components/panel-prompt';
import { PanelRound } from '../src/components/panel-round';
import { PanelText } from '../src/components/panel-text';
import { PanelImageReveal } from '../src/components/panel-image-reveal';
import { Button, Buttons, ButtonLink, ButtonAnchor } from '../src/components/buttons';
import { ScreenManager } from '../src/components/screen-manager';
import { AudioPlayer } from '../src/components/media/audio-player';
import { AudioRecorder } from '../src/components/media/audio-recorder';
import { WaitThen, WaitThenShow } from '../src/components/utils/wait-then';
import { Gradient } from '../src/components/gradient';
import { AccordionTitle } from '../src/components/accordion-title';
import { ReceiveReply } from '../src/components/receiving/receive-reply';
import { ProgressLoader } from '../src/components/progress-loader';
import { PhotoCapture } from '../src/components/media/photo-capture';
import { TextAreaInput } from '../src/components/inputs/textarea-input';
import { TextInput } from '../src/components/inputs/text-input';
import { InformationWindow } from '../src/components/modals/information-window';
import { AudioTranscription } from '../src/components/media/audio-transcription';
import { WorkingModal } from '../src/components/modals/working-modal';
import { MessageModal } from '../src/components/modals/message-modal';
import { FeedbackModal } from '../src/components/modals/feedback-modal';
import { canUseAudioRecorder } from '../src/utils/use-audio-recorder';
import { PageChangeDetect } from '../src/components/messages/page-change-detect';
import { isIosDeviceUsingChrome } from '../src/utils/helpers';
import { SignIn } from '../src/components/home/signin';
import { ScreenMessage } from '../src/components/messages/screen-message';
import { UnsupportedDevice } from '../src/components/messages/unsupported-device';
import { ErrorMessage } from '../src/components/messages/error-message';
import { TextInputModal } from '../src/components/modals/text-input-modal';
import { TextAreaModal } from '../src/components/modals/text-area-modal';
import { TermsModal } from '../src/components/modals/terms-modal';
import { BgSvgFullScreen } from '../src/components/svg/bg';
import { ProgressBar } from '../src/components/progress-bar';
import { SavingInProgress } from '../src/components/creating/save-gift';
import SvgIconDone from '../src/components/svg/icon-done';

// Screens
import { ReceiveGift } from '../src/components/receiving/receive-gift';
import { CreateGift } from '../src/components/creating/create-gift';
import { HomeScreen } from '../src/screens/home';

// Receiving
import { ChooseLocation } from '../src/components/choose-location';
import { ReceivingIntroContent } from '../src/components/receiving/panels/intro-content';
import { ReceivingPartContent } from '../src/components/receiving/panels/part-content';
import { WorkingProgress } from '../src/components/messages/working-progress';

// Creating
import { CreateGiftIntro } from '../src/components/creating/intro';
import { CreateGiftChooseRecipient } from '../src/components/creating/choose-recipient';
import { CreateGiftRecordAndPlayback } from '../src/components/creating/record-and-playback';
import { CreatingPartContent } from '../src/components/creating/part-content';
import { SignGift } from '../src/components/creating/sign-gift';
import { ShareGift } from '../src/components/creating/share-gift';

// Data
import { giftThreeParts, giftPart, emptyGift } from './fixtures';

// TEMP: REMOVE!!
import { ShowMediaDevices } from './temp-media-devices';

// Some useful bits to help...

// Handlers
function alertClicked() {
  alert('Clicked');
}

function logSomething( something?: string ) {
  // tslint:disable-next-line
  console.log( something || 'something' );
}

function doNothing() {
}

// Styles
const greyBG = {
  backgroundColor: 'grey',
  padding: '20px 10px',
};

const whiteText = {
  color: 'white',
};

const fullScreen = {
  height: '100vh',
  width: '100vw',
};


const bgImg = {
  // tslint:disable-next-line
  backgroundImage: 'url(https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

storiesOf('Home', module)
  .add('Home', () => (
    <BrowserRouter>
      <HomeScreen />
    </BrowserRouter>
  ))
  .add('Sign in', () => (
    <BrowserRouter>
      <SignIn onCloseButtonClick={doNothing} />
    </BrowserRouter>
  ))
;

storiesOf('Creating', module)
  .add('Create gift', () => (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <CreateGift museumName={'Blast Theory Museum of Art'} museumId={'123'} />
      </BrowserRouter>
    </>
  ))
;

storiesOf('Receiving', module)
  .add('3 part Museum gift', () => (
    <ReceiveGift gift={giftThreeParts} museumName={'Brighton & Hove Museum'} />
  ))
  // .add('Remotely', () => <h1>TODO</h1>)
;

storiesOf('Components', module)
  .add('Screen Title', () => <ScreenTitle>Lorem Ipsum</ScreenTitle>)
  .add('Screen Header', () => (
    <div>
      <p>Big header with logo</p>
      <ScreenHeader
        preSubTitle={`Pre sub title`}
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        museumName='Blast Theory Museum of Art'
        showLogo={true}
      />
      <p>Big header no logo</p>
      <ScreenHeader
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        showLogo={false}
        museumName='Blast Theory Museum of Art'
      />
      <p>Small header</p>
      <ScreenHeader
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        showLogo={false}
        museumName='Blast Theory Museum of Art'
      />
    </div>
  ))
  .add('Gift Pile', () => {
    const gifts: Gift[] = [ giftThreeParts, giftThreeParts, giftThreeParts,
      giftThreeParts, giftThreeParts, giftThreeParts ];
    return (
      <div style={greyBG}>
        <BrowserRouter>
          <GiftPile gifts={gifts} source={'sent'}>GiftPile</GiftPile>
        </BrowserRouter>
      </div>
    );
  })
  .add('Panel Round', () => (
    <div style={greyBG}>
      <PanelRound border='none' background='transparent-black' />
      <PanelRound border='none' background='solid-white' />
    </div>
  ))
  .add('Panel Prompt text', () => (
    <div style={greyBG}>
      <PanelPrompt text={'lorem ipsum solus incum'} background={'transparent-black'} />
    </div>
  ))
  .add('Panel Image Reveal', () => (
    <div style={{...greyBG, ...fullScreen}}>
      <PanelImageReveal imageUrl={'https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg'} />
    </div>
  ))
  .add('Panel', () => (
    <div style={bgImg}>
      <Panel>
        <p>Panel text</p>
        <Buttons>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Buttons>
      </Panel>
    </div>
  ))
  .add('Buttons', () => (
      <div style={{...bgImg, ...whiteText}}>

        <GlobalStyles />

        <BrowserRouter>

          <p>One button</p>
          <Buttons>
            <Button onClick={logSomething}>One button</Button>
          </Buttons>

          <p>Black button</p>
          <Buttons>
            <Button colour='black'>Black button</Button>
          </Buttons>

          <p>Grey button</p>
          <Buttons>
            <Button colour='grey'>Grey button</Button>
          </Buttons>

          <p>Two buttons</p>
          <Buttons>
            <Button>Button 1</Button>
            <Button primary={true}>Button 2</Button>
          </Buttons>

          <p>One button, one Link</p>
          <Buttons>
            <Button>Button 1</Button>
            <ButtonLink to='/cats' colour='black'>Link 2</ButtonLink>
          </Buttons>

          <p>One button, one Anchor</p>
          <Buttons>
            <Button>Button 1</Button>
            <ButtonAnchor href='http://www.blasttheory.co.uk/' colour='black'>Link 2</ButtonAnchor>
          </Buttons>

          <p>There is a gradient below</p>
          <Gradient position='top' size='small' />

        </BrowserRouter>

      </div>
  ))
  .add('Wait and Then', () => (
    <div>
      <p>Wait 2 seconds and log something.</p>
      <WaitThen
        wait={2}
        andThen={logSomething}
      />
      <p>Wait 3 seconds and show children.</p>
      <WaitThenShow
        wait={3}
      >
        <p>Child 1</p>
        <p>Child 2</p>
      </WaitThenShow>
    </div>
  ))
  .add('Gradient', () => (
    <div>
      <div>
        <p>Small gradient</p>
        <Gradient size='small' position='top' />
      </div>
      <div>
        <p>Big gradient</p>
        <Gradient size='big' position='top' />
      </div>
    </div>
  ))
  .add('Accordion Title', () => (
    <div style={greyBG}>
      <p>Big with Open</p>
      <AccordionTitle showOpenPrompt={true} textSize={'big'} textColour={'light'}>Big</AccordionTitle>
      <p>Mediun</p>
      <AccordionTitle showOpenPrompt={false} textSize={'medium'} textColour={'light'}>Mediun</AccordionTitle>
      <p>Small</p>
      <AccordionTitle showOpenPrompt={false} textSize={'small'} textColour={'light'}>Small</AccordionTitle>
      <p>Medium &amp; White</p>
      <AccordionTitle showOpenPrompt={false} textSize={'medium'} textColour={'white'}>
        Medium &amp; White
      </AccordionTitle>
    </div>
  ))
  .add('Progress Bars', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <p>White on black</p>
      <ProgressBar percent={10} height={'5px'} theme={'white-on-black'}/>
      <p>Black on white</p>
      <ProgressBar percent={20} height={'10px'} theme={'black-on-white'}/>
      <p>Grey on black</p>
      <ProgressBar percent={30} height={'20px'} theme={'grey-on-black'}/>
    </div>
  ))
  .add('Tab close detect', () => (
    <>
      <BrowserRouter>
        <PageChangeDetect enabled={true} />
          <div><a href='http://www.google.com'>Go to Google</a></div>
          <Link to='your-gifts'>Go to Your Gifts</Link>
      </BrowserRouter>
    </>
  ))
;

// Inputs
storiesOf('Inputs', module)
  .add('Text Area Input', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <TextAreaInput onEnterPressed={() => {alert('Enter pressed'); }} />
      <TextAreaInput onTextChanged={(text) => logSomething(text)} />
      <TextAreaInput placeHolder={'enter something'} onTextChanged={(text) => logSomething(text)} />
      <TextAreaInput defaultValue={'lorem impsum'} onTextChanged={(text) => logSomething(text)} />
    </div>
  ))
  .add('Text Input', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <p>Text inputs</p><br/>
      <TextInput onTextChanged={(text) => logSomething(text)} />
      <TextInput placeHolder={'enter your name'} onTextChanged={(text) => logSomething(text)} />
      <TextInput
        placeHolder={'enter your name'}
        defaultValue={'lorem impsum'}
        onTextChanged={(text) => logSomething(text)}
        onEnterPressed={() => {alert('enter pressed'); }}
      />
      <p>Email inputs</p><br/>
      <TextInput inputType='email' placeHolder={'enter your email'} onTextChanged={(text) => logSomething(text)} />
    </div>
  ))
  .add('Text input modal', () => (
    <ScreenManager>
      <GlobalStyles />
      <TextInputModal
        placeHolder='Enter your name'
        onSaveClick={(text) => { alert('Save: ' + text); }}
        onCancelClick={() => { alert('Cancelled'); }}
      />
    </ScreenManager>
  ))
  .add('Text area modal', () => (
    <ScreenManager>
      <GlobalStyles />
      <TextAreaModal
        placeHolder='Enter your name'
        onSaveClick={(text) => { alert('Save: ' + text); }}
        onCancelClick={() => { alert('Cancelled'); }}
      />
    </ScreenManager>
  ))
;

// Tests
storiesOf('Ideas and tests', module)
  .add('Mask', () => (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
        <defs>
          <filter id='blurlayer' width='110%' height='100%'>
            <feGaussianBlur  stdDeviation='4' result='blur'/>
              {/* tslint:disable-next-line */}
              <feImage id='feimage' xlinkHref='https://www.blasttheory.co.uk/wp-content/uploads/2019/04/IMG_8846-1440x1080.jpg' x='0' y='0'  height='300px' width='300px' result='mask' />
          </filter>
        </defs>
      </svg>
      <svg width='568' height='426'>
        {/* tslint:disable-next-line */}
        <image href='https://www.blasttheory.co.uk/wp-content/uploads/2019/04/IMG_8846-1440x1080.jpg' width='500' height='350' mask='url(#masking2)' />
      </svg>
      <svg width='0' height='0'>
        <defs>
          <linearGradient id='gradient' x1='0' y1='00%' x2='0' y2='100%'>
            <stop stop-color='black' offset='0'/>
            <stop stop-color='white' offset='1'/>
          </linearGradient>
          <mask id='masking2' maskUnits='objectBoundingBox' maskContentUnits='objectBoundingBox'>
            <rect y='0.3' width='1' height='.7' fill='url(#gradient)' />
            <circle cx='.5' cy='.5' r='.35' fill='white' />
          </mask>
        </defs>
      </svg>
    </>
  ))
  .add('Audio recorder detection', () => {
    const canUseAudioRec = canUseAudioRecorder();
    // console.log(canUseAudioRec);
    // console.log(navigator.mediaDevices.getUserMedia);
    return (
      <p>Can use audio = {canUseAudioRec.toString()}</p>
    );
  })
  .add('Is Chrome on iOS', () => {
    const chromeOnIos = isIosDeviceUsingChrome();
    return (
      <p>Is Chrome on iOS = {chromeOnIos.toString()}</p>
    );
  })
  .add('Hash Router', () => {
    function pushToHistory() {
      history.push('/test1');
    }
    return (
      <Router history={history}>
        <Switch>
          <Route path='/test1'>
            <p>This is 1</p>
          </Route>
          <Route  path='/test2'>
            <p>This is 2</p>
          </Route>
        </Switch>
        <div><Link to='test1'>Goto 1</Link></div>
        <div><Link to='test2'>Goto 2</Link></div>
        <div><Button onClick={pushToHistory}>Go to 1 via history.push</Button></div>
      </Router>
    );
  })
  .add('Local storage', () => {

    // We need to reliably read a true value when set via local storage, or when there is nothing in local storage
    function getIt(key: string): boolean {
      return getLocalItem<boolean>(key) === undefined ? true : !!getLocalItem<boolean>(key);
    }

    setPrefix('sb');
    const nothing: boolean = getIt('nothing1');

    setLocalItem('set', true);
    const set = getIt('set');
    setLocalItem('set', false);
    const setAgain = getIt('set');
    return (
      <>
        <p>Check item never stored: should be true = {nothing.toString()}</p>
        <p>Check set item: should be true = {set.toString()}</p>
        <p>Check set again item: should be false = {setAgain.toString()}</p>
      </>
    );
  })
  .add('Sharing links', () => (
    <>
      <h1>Sharing links</h1>
      <p>
        {/* tslint:disable-next-line */}
        <a href='mailto:?&subject=Here is a Gift&body=Nick%20has%20sent%20you%20a%20Gift%20%0Ahttps%3A//thegift.app/'>Send Email</a>
      </p>
      <p>
        {/* tslint:disable-next-line */}
        <a target='_blank' href='https://www.facebook.com/sharer/sharer.php?u=https%3A//thegift.app/'>Share on Facebook</a>
      </p>
      <p>
        <a href='fb-messenger://share/?link=https%3A%2F%2Fthegift.app'>Share In Facebook Messenger (mobile only)</a>
      </p>
      <p>
        <a target='_blank' href='https://twitter.com/home?status=https%3A//thegift.app/'>Share on Twitter</a>
      </p>
      <p>
        {/* tslint:disable-next-line */}
        <a href='whatsapp://send?text=Here%27s%20a%20gift%20https%3A%2F%2Fthegift.app%2F' data-action='share/whatsapp/share' target='_blank'>Share via Whatsapp (mobile only)</a>
      </p>
      <p>
        <a href='sms:&body=Here%27s%20a%20gift%20https%3A%2F%2Fthegift.app'>Share via SMS iOS</a>
      </p>
      <p>
        <a href='sms:?body=Here%27s%20a%20gift%20https%3A%2F%2Fthegift.app'>Share via SMS Android</a>
      </p>
    </>
  ))
  .add('Media Devices', () => (<ShowMediaDevices />))
;

// Loaders
storiesOf('Components/Loaders', module)
  .add('Loading gift', () => (
    <WorkingProgress text='Loading' percent={37} />
  ))
  .add('Progress Loader - white text', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <ProgressLoader text={'Loading'} colourTheme='white' percent={25} />
    </div>
  ))
  .add('Progress Loader - grey text', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <ProgressLoader text={'Loading'} colourTheme={'light-grey'} percent={25} />
    </div>
  ))
;

// Modals
storiesOf('Components/Modals', module)
  .add('Information Window', () => (
    <ScreenManager>
      <GlobalStyles />
      <InformationWindow onClose={doNothing}>
        <h1>Privacy</h1>
        <h2>Sub heading</h2>
        <h3>Sub heading</h3>
        <h4>Sub heading</h4>
        <h5>Sub heading</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum.
        Semper feugiat nibh sed pulvinar proin.</p>
      </InformationWindow>
    </ScreenManager>
  ))
  .add('Working Modal', () => {

    function getModal() {

      return (
        <WorkingModal
          iconType='working'
          message='Working...'
          buttonText='OK'
        />
      );
    }

    return (
      /* use a real screen to test over */
      <BrowserRouter>
        <HomeScreen />

        {getModal()}

      </BrowserRouter>
    );
  })
  .add('Message Modal', () => (
    <ScreenManager>
      <GlobalStyles />
      <MessageModal>
        <p>There seems to be a problem with the internet.</p>
        <p>Reboot it.</p>
        <BrowserRouter>
          <Button><Link to='your-gifts'>Go to Your Gifts</Link></Button>
        </BrowserRouter>
      </MessageModal>
    </ScreenManager>
  ))
  .add('Terms Modal', () => (
    <ScreenManager>
      <GlobalStyles />
      <TermsModal onAgreeClick={doNothing} onShowTerms={doNothing} />
    </ScreenManager>
  ))
  .add('Feedback Modal', () => (
    <ScreenManager>
      <GlobalStyles />
      <p style={whiteText}>Wait then show the modal</p>
      <WaitThenShow wait={5}>
        <FeedbackModal feedbackUrl='http://www.google.com/' onFinished={() => {alert('finished'); }} />
      </WaitThenShow>
    </ScreenManager>
  ));

// Message
storiesOf('Components/Messages', module)
  .add('Screen Message', () => (
    <>
      <GlobalStyles />
      <ScreenMessage message='This is a generic screen message' />
    </>
  ))
  .add('Unsupported Device', () => (
    <>
      <GlobalStyles />
      <UnsupportedDevice message='This device is not supported' />
    </>
  ))
  .add('Error message', () => (
    <>
      <GlobalStyles />
      <Router history={history}>
        <ErrorMessage message='There has been an error' />
      </Router>
    </>
  ))
  .add('Saving message', () => (
    <ScreenManager>
      <GlobalStyles />
      <Router history={history}>
        <SavingInProgress text='Saving your gift' progress={Math.round(66)} />
      </Router>
    </ScreenManager>
  ));

// Media
storiesOf('Components/Media', module)
  .add('Audio player', () => (
    <>
      <div style={bgImg}>
        <GlobalStyles />
        <AudioTranscription
          giftId={'123'}
          audioReference={'r-intro-start-here'}
        />
        <p>Skip forward button</p>
        <AudioPlayer
          message={`Lorem
            ipsum
            lorem ipsum`}
          forwardButtonType={'skip-seconds'}
          giftId={''}
          audioReference={'lorem'}
          src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
        />
      </div>
      <p>Jump Go to End forward button</p>
      <AudioPlayer
        message={'Lorem ipsum'}
        forwardButtonType={'go-to-end'}
        giftId={''}
        audioReference={'lorem'}
        src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
      />
    </>
  ))
  .add('Audio recorder', () => (
    <>
      <GlobalStyles />
      <AudioRecorder
        status={'idle'}
        text={'Record a greeting for Alexandria'}
        onClick={doNothing}
      />
      <AudioRecorder
        status={'recording'}
        text={'short'}
        onClick={doNothing}
      />
      <AudioRecorder
        status={'processing'}
        text={'this is quite long text and it should sit ok'}
        onClick={doNothing}
      />
    </>
  ))
  .add('Photo Capture', () => (
    <ScreenManager>
      <GlobalStyles />
      <img id='photo-capture-img' style={{maxWidth: '200px'}} />
      {/* <PhotoCapture text={'take a photo'}/> */}
      <PhotoCapture
        text={`Have a wander
          to find the second object for Nick.
          Why not visit another part of the museum?
          When you’ve found it take a photo to show them.`}
        textSize={42}
        onPhotoTaken={(imageFile) => {
          const img = document.getElementById('photo-capture-img') as HTMLImageElement;
          img.src = imageFile.url;
        }}
      />
    </ScreenManager>
  ))
  .add('Image Resize', () => {
    function doResizeImage() {

      const originalImage = document.getElementById('resize-img') as HTMLImageElement;
      const newImage = document.getElementById('resized-img') as HTMLImageElement;

      // Change orientation
      resizeImage(originalImage.src, 1024, 1024, (resizedImageUrl) =>  {
        newImage.src = resizedImageUrl;
      });

    }
    const image = require('./assets/test2.jpg');
    const imgStyle = {
      maxWidth: '100%',
      display: 'block',
      marginBottom: '10px',
    };
    return (
      <>
        <button
          onClick={() => {
            doResizeImage();
          }}
        >
          Resize the image
        </button>
        <img
          id='resize-img'
          src={image}
          style={imgStyle}
        />
        <img
          id='resized-img'
          style={imgStyle}
        />
      </>
    );
  })
  .add('Image rotate', () => {
    document.addEventListener('DOMContentLoaded', () => {

      const originalImage = document.getElementById('rotate-img') as HTMLImageElement;
      const resetImage = document.getElementById('reset-img') as HTMLImageElement;

      // Change orientation
      setImageOrientation(originalImage.src, 5, (rotatedImageUrl) =>  {
        resetImage.src = rotatedImageUrl;
      });

    });
    const image = require('./assets/test.jpg');
    const imgStyle = {
      maxWidth: '150px',
      display: 'block',
      marginBottom: '10px',
    };
    return (
      <>
        <p>Rotate the image</p>
        <img
          id='rotate-img'
          src={image}
          style={imgStyle}
        />
        <img
          id='reset-img'
          style={imgStyle}
        />
      </>
    );
  })
  .add('Image select and rotate', () => {
    document.addEventListener('DOMContentLoaded', () => {

      const fileInput = document.getElementById('file-input');
      const imageRotateResult = document.getElementById('image-rotate-result');
      const imageRotateCalc = document.getElementById('image-rotate-calc');
      const resetImage1: HTMLImageElement = document.getElementById('reset-img1') as HTMLImageElement;

      if (fileInput) {

        fileInput.onchange = (e) => {

          if (e.target) {

            const target = e.target as HTMLInputElement;

            if (target && target.files) {

              const file = target.files[0];

              getImageOrientation(file, (orientation) => {

                if (imageRotateResult) {
                  imageRotateResult.innerHTML = 'Source image orientation = ' + orientation;
                }

                const url = URL.createObjectURL(file);

                const change = calcImageOrientationChange(orientation);
                if (imageRotateCalc) {
                  imageRotateCalc.innerHTML = 'Orientation calculation = ' + change;
                }

                setImageOrientation(url, change, (rotatedImageUrl) =>  {
                  resetImage1.src = rotatedImageUrl;
                });

              });

            }

          }

        };

      }

    });
    const imgStyle = {
      maxWidth: '150px',
      display: 'block',
      marginBottom: '10px',
    };
    return (
      <>
        <p>Select image, detect orientation, then rotate image</p>
        <input id='file-input' type='file' accept='image/*' />
        <p id='image-rotate-result' />
        <p id='image-rotate-calc' />
        <img
          id='reset-img1'
          style={imgStyle}
        />
      </>
    );
  });


// Receiving components
storiesOf('Components/Receiving', module)
  .add('Idle Gift Part', () => (
    <div style={greyBG}>
      <p>Small</p>
      <IdleGiftPart
        part={giftPart}
        displaySize={'small'}
        isDisabled={false}
        onClick={alertClicked}
        showOpenPrompt={false}
        textColour={'light'}
      >
        Small
      </IdleGiftPart>
      <p>Medium &amp; disabled</p>
      <IdleGiftPart
        part={giftPart}
        displaySize={'medium'}
        isDisabled={true}
        onClick={alertClicked}
        showOpenPrompt={false}
        textColour={'light'}
      >
        Medium
      </IdleGiftPart>
      <p>Big &amp; open</p>
      <IdleGiftPart
        part={giftPart}
        displaySize={'medium'}
        isDisabled={false}
        onClick={alertClicked}
        showOpenPrompt={true}
        textColour={'light'}
      >
        Big
      </IdleGiftPart>
    </div>
  ))
  .add('Gift Part', () => (
    <>
    {/*hack the height*/}
    <style>{'\
      #root > div {\
        height: 100vh;\
      }\
    '}</style>
      <GiftPartWrapper
        gift={giftThreeParts}
        giftPart={giftPart}
        onComplete={doNothing}
        recipientLocation={'at-museum'}
      >
        <PanelImageReveal imageUrl={'https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg'} />
      </GiftPartWrapper>
    </>
  ))
  .add('Gift Parts Manager', () => (
    <ScreenManager>
      <GlobalStyles />
      <GiftPartsManager gift={giftThreeParts} recipientLocation={'at-museum'} />
    </ScreenManager>
  ))
  .add('Choose location', () => <ChooseLocation onLocationSelected={doNothing} museumName={'Hove'} />)
  .add('Intro', () => (
    <ReceivingIntroContent
      gift={giftThreeParts}
      onComplete={doNothing}
      recipientLocation={'at-museum'}
      audioIntroPlayed={true}
      handleAudioIntroPlayed={doNothing}
    />
  ))
  .add('Content', () => (
    <ReceivingPartContent
      gift={giftThreeParts}
      giftPartIndex={0}
      onComplete={doNothing}
      recipientLocation={'at-museum'}
      revealBackgroundImage={doNothing}
      revealPreviewImage={doNothing}
    />
  ))
  .add('Reply', () => (
    <ReceiveReply gift={giftThreeParts} />
  ))
  .add('Done Icon', () => {

    const DoneIconWrap = styled.div`
      width: 20%;
      position: relative;
      margin-bottom: 2vh;
    `;

    return (
      <ScreenManager>
        <BgSvgFullScreen />
        <GlobalStyles />
        <ScreenHeader
          padding={'medium'}
          title={`Making a gift...`}
          museumName={'Blast Theory'}
          background='white'
        />
        <Panel isParent={false}>
          <PanelContent>
            <PanelPrompt
              background={'transparent-black'}
            >
              <DoneIconWrap>
                <SvgIconDone />
              </DoneIconWrap>
              <PanelText>You’ve unwrapped the whole gift</PanelText>
            </PanelPrompt>
          </PanelContent>
        </Panel>
      </ScreenManager>
    );
  });

// Creating components
storiesOf('Components/Creating', module)
  .add('Intro', () => (
    <>
      <GlobalStyles />
      <CreateGiftIntro onComplete={doNothing} />
    </>
  ))
  .add('Choose Recipient', () => (
    <>
      <GlobalStyles />
      <CreateGiftChooseRecipient
        onComplete={logSomething}
        giftId={'test'}
      />
    </>
  ))
  .add('Record and Playback', () => (
    <>
      <GlobalStyles />
      <CreateGiftRecordAndPlayback
        gift={emptyGift}
        giftPartIndex={0}
        text={'Record something'}
        saveButtonText={'Save something'}
        onComplete={(audioFile) => logSomething(audioFile.url)}
        onReRecord={doNothing}
      />
    </>
  ))
  .add('Create Gift Part', () => (
    <>
      <GlobalStyles />
      <CreatingPartContent
        gift={emptyGift}
        recipientName={'Nick'}
        onComplete={doNothing}
      />
    </>
  ))
  .add('Sign gift', () => (
    <ScreenManager>
      <GlobalStyles />
      <SignGift onComplete={logSomething} />
    </ScreenManager>
  ))
  .add('Share gift', () => (
    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />
      <ScreenHeader
         padding={'medium'}
         title={`Making a gift...`}
         museumName={'Blast Theory'}
         background='white'
      />
      {/* <div style={ { backgroundColor: 'pink', display: 'flex' }} > */}
        <ShareGift
          senderName='Kcin'
          recipientName='Nick'
          museumName='Blast Theory Art Museum'
          url='https://www.blasttheory.co.uk/projects/gift/'
          onChannelClicked={doNothing}
          onComplete={doNothing}
        />
      {/* </div> */}
    </ScreenManager>
  ))
;
