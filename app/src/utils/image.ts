/*
 *  Image utils
 */

export const landscapeImageOrientation = 6; // Typical iOS photo orientation

// Get the orientation of a image file
// Returns a number that represents the orientation.  3 = portrait, 1 = landscape (90 ccw)
// Inspired by:
// https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
export const getImageOrientation = (inputFile: File, callback: (orientation: number) => void ) => {

  const reader = new FileReader();

  reader.onload = (event: ProgressEvent) => {

    if (! event.target) {
      return;
    }

    const file = event.target as FileReader;
    const view = new DataView(file.result as ArrayBuffer);

    if (view.getUint16(0, false) !== 0xFFD8) {
        return callback(-2);
    }

    const length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
      const marker = view.getUint16(offset, false);
      offset += 2;

      if (marker === 0xFFE1) {
        if (view.getUint32(offset += 2, false) !== 0x45786966) {
          return callback(-1);
        }

        const little = view.getUint16(offset += 6, false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + (i * 12), little) === 0x0112) {
            return callback(view.getUint16(offset + (i * 12) + 8, little));
          }
        }
      // bitwise operation required
      // tslint:disable-next-line
      } else if ((marker & 0xFF00) !== 0xFF00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    return callback(-1);
  };

  reader.readAsArrayBuffer(inputFile);
};

// Changes the orientation of an image
// Pass in an image URL
// Inpsired by:
// https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
export function setImageOrientation(
  srcImageUrl: string,
  srcOrientation: number,
  callback: (rotatedImageUrl: string) => void,
) {

  // Use a new image to get a canvas
  const img = new Image();

  // When the image is loaded....
  img.onload = () => {

    // Setup the image
    const width = img.width;
    const height = img.height;

    // Get our canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set proper canvas dimensions before transform & export
    if (4 < srcOrientation && srcOrientation < 9) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    // Check....
    if (ctx) {
      // Transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height , width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }

      // Draw image
      ctx.drawImage(img, 0, 0);

    }

    // Export to our callback
    canvas.toBlob((blob) => {
      callback(URL.createObjectURL(blob));
    });
  };

  // Assign the image to trigger the onLoad
  img.src = srcImageUrl;

}

// Determines the required orientation change to make the image portait
export function calcImageOrientationChange(currentOrientation: number): number {
  if (currentOrientation === landscapeImageOrientation) {
    return 6;
  }
  return -1;
}

/**
 * Resizes an image
 * Provides the resized image via a callback
 */
export function resizeImage(
  imageUrl: string,
  maxWidth: number,
  maxHeight: number,
  callback: (resizedImageUrl: string) => void,
) {

  // Use a new image to get a canvas
  const image = new Image();

  // When the image is loaded....
  image.onload = () => {

    const width = image.width;
    const height = image.height;

    // Check if resizing required
    if (width <= maxWidth && height <= maxHeight) {
      callback(imageUrl);
    }

    let newWidth;
    let newHeight;

    // Calculate the new dimensions
    if (width > height) {
        newHeight = height * (maxWidth / width);
        newWidth = maxWidth;
    } else {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
    }

    // Create a canvas for the redraw
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(image, 0, 0, newWidth, newHeight);
    }

    // Export to our callback
    canvas.toBlob((blob) => {
      callback(URL.createObjectURL(blob));
    }, 'image/jpeg', 0.80);

  };

  // Assign the image to trigger the onLoad
  image.src = imageUrl;

}
