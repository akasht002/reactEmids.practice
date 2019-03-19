import React from 'react';
import {ImageCrop} from '../../External';
import 'react-image-crop/dist/ReactCrop.css';
import { SETTING } from '../../../constants/config'

let imageRef;

const ImageCropView = (props) =>{

    const onCropComplete = (crop, pixelCrop) => {
        let croppedImageUrl = null;
        if (imageRef && crop.width && crop.height) {
            croppedImageUrl = getCroppedImg(
                imageRef,
                pixelCrop
            );
        }
        props.changeCroppedImage(croppedImageUrl);
    }

    const getCroppedImg = (image, pixelCrop) => {
        const canvas = document.createElement('canvas');
        let width = pixelCrop.width;
        let height = pixelCrop.height;
        const max_size = SETTING.RESIZE_IMAGE;
        
        if (width > height) {
            if (width > max_size) {
                height *= max_size / width;
                width = max_size;
            }
        } else {
            if (height > max_size) {
                width *= max_size / height;
                height = max_size;
            }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            width,
            height,
        );

        return canvas.toDataURL('image/jpeg');
    }


    return(
        <div className='width100 UploadProfileImageContainer'>
          <div className='cropper-style'>
            <ImageCrop 
              src={props.uploadedImageFile} 
              crop={props.crop}
              onImageLoaded={(image) => {
                imageRef = image;
              }}
              onComplete={onCropComplete}
              onChange={(crop) => {
                props.onCropChange(crop)
              }}
            />
          </div>
        </div>
    );
}

export default ImageCropView;