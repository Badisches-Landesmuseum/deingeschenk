import React from 'react';
import styled from 'styled-components';

import { LocalFile } from '../../domain';

import { setImageOrientation,
  getImageOrientation,
  calcImageOrientationChange,
  landscapeImageOrientation,
  resizeImage,
} from '../../utils/image';

import { fadeInUp } from '../../themes/global';
import { PanelText } from '../panel-text';
import { PanelRound } from '../panel-round';
import { BaseControlButton } from '../buttons';
import SvgIconCamera from '../svg/icon-camera';

/**
 * Capture photo from users camera
 * Includes a text prompt
 *
 */
const PhotoCaptureStyle = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  animation: ${fadeInUp};
`;

const PhotoCaptureText = styled(PanelText)`
  height: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5% 10%;
  text-align: center;
  margin-top: 5%;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ImageInput = styled.input`
  display: none;
`;

// Buttons
const CaptureButton = styled(BaseControlButton)`
  width: 30%;
`;

interface Props {
  text: string;
  textSize?: number;
  onPhotoTaken?: (imageFile: LocalFile) => void;
}

class PhotoCapture extends React.PureComponent<Props> {

  // Show the camera to the user
  public showCamera = () => {

    // Trigger the input element
    const input = document.getElementById('photo-capture-input'); // todo, improve
    if (input) {
      input.click();
    }
  }

  // Handle the change of file on the input
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // Nothing to do if we don't have anyone listening
    if (!this.props.onPhotoTaken) return;

    // Nothing to do if we don't have any files
    // TODO: should this be an error condition of some kind?
    if (!e.target.files) return;

    const onPhotoTaken = this.props.onPhotoTaken; // Help the typechecker realise this is defined

    const imageFile = e.target.files[0]; // Assuming one file
    const imageUrl = URL.createObjectURL(imageFile);
    const mimeType = imageFile.type;

    const targetImgHeight = 1024;

    // Some pictures will be landscape and will need converting to portrait
    // Get the current orientation and correct if necessary
    getImageOrientation(imageFile, (orientation) => {

      if (orientation === landscapeImageOrientation) { // Landscape
        const change = calcImageOrientationChange(orientation);

        setImageOrientation(imageUrl, change, (rotatedImageUrl) => {
          URL.revokeObjectURL(imageUrl); // Cleanup unused resource

          // Resize the image to ensure a usable size
          resizeImage(rotatedImageUrl, targetImgHeight, targetImgHeight, (resizedImageUrl) =>  {
            onPhotoTaken({ url: resizedImageUrl, mimeType });
          });

        });
      } else {
        // Resize the image to ensure a usable size
        resizeImage(imageUrl, targetImgHeight, targetImgHeight, (resizedImageUrl) =>  {
          onPhotoTaken({ url: resizedImageUrl, mimeType });
        });
      }
    });
  }

  public render() {

    return (
      <PanelRound background={'transparent-black'}>
        <PhotoCaptureStyle>
          {/* support line breaks */}
          <PhotoCaptureText textSize={this.props.textSize}>
            {this.props.text && this.props.text.split('\n').map((item) => {
              return <>{item}<br /></>;
            })}
          </PhotoCaptureText>
          <Controls>
            <CaptureButton>
              <SvgIconCamera onClick={this.showCamera} />
              <ImageInput
                id='photo-capture-input'
                type='file'
                accept='image/*'
                onChange={this.handleChange}
              />
            </CaptureButton>
          </Controls>
        </PhotoCaptureStyle>
      </PanelRound>
    );

  }

}

export {
  PhotoCapture,
};
