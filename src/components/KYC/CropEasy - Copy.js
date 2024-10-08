import React, { useState, useEffect } from 'react';


import Cropper from 'react-easy-crop';
import getCroppedImg from './Utils/CropImage';
import { Button, Input } from '@windmill/react-ui';
import { Modal, ModalBody, ModalHeader } from '@windmill/react-ui';
import './stepper.css'


const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile , aspectRatio }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    const getImageAspect = async () => {
      const image = new Image();
      image.src = photoURL;

      await image.decode(); // Wait for the image to load

      const aspectRatio = image.width / image.height;
      setAspect(aspectRatio);
    };

    if (photoURL) {
      getImageAspect();
    }
  }, [photoURL]);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels, rotation);
      setPhotoURL(url);
      setFile(file);
      setOpenCrop(false);
    } catch (error) {
      console.log(error);
    }
  };

  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <div >
          {/* <Modal > */}
      <div>

        {/* <h2 className='m-2 flex justify-center text-xl'>Update Your Image</h2> */}
        <div className="relative bg-gray-100 h-64 w-8/12 mx-auto">


          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </div>
      </div>
      <div>
      <div className="m-2">

        <div className="flex items-center justify-center">

          {/* <h2>Zoom: {zoomPercent(zoom)}</h2> */}
          <h2>Zoom</h2>



          <input
            type="range"
            min={1}
            max={20}
            value={zoom}
            className="slider"
            aria-label="Zoom"
            onChange={(e, zoom) => setZoom(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center  ">
          {/* <LabelArea label={`Rotation: ${rotation}°`} /> */}

          {/* <h2>Rotation: {rotation + '°'}</h2> */}
          <h2>Rotation</h2>


          <input
            type="range"
            min={0}
            max={360}
            value={rotation}
            className="slider "
            aria-label="Rotation"
            onChange={(e) => setRotation(e.target.value)}
          />


        </div>
        </div>
        <div className="flex justify-center mt-4 p-4">
          <Button  className='m-2' onClick={() => {
            setPhotoURL('');
            setOpenCrop(false);
          }}>
            Cancel
          </Button>
       
          <Button className='m-2'  onClick={cropImage}  >
            Crop 
          </Button>

          {/* <Button className="mx-4 text-white" >
                Submit & Next  
              </Button> */}
        </div>
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default CropEasy;

