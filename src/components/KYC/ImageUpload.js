import React from 'react'
import CropEasy from './CropEasy';
import { Modal, ModalBody, ModalHeader } from '@windmill/react-ui';
import Error from 'components/form/Error';
import { notifyError, notifySuccess } from 'utils/toast';
const ImageUpload = ({ photoURL, setOpenCrop, setPhotoURL, setFile, label, openCrop,imagewidth,imageheight}) => {
    
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   const file = e.target.files[0];

  //   if (file) {
  //     if (file.width < 300 || file.height < 400) {
  //       notifyError('Selected image size is smaller than 300 X 400 pixel. Please Select higher size image.');
  //       return;
  //     }
  //     setFile(file);
  //     setPhotoURL(URL.createObjectURL(file));
  //     setOpenCrop(true);
  //   }
  // };

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        if (image.width < imagewidth || image.height < imageheight) {
          notifyError(`Please select an image with dimensions larger than ${imagewidth}x${imageheight}.`);
        } else {
          setFile(file);
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
     
        }
      };
    }
  };

  const handleCloseCrop = () => {
    setOpenCrop(false);
  };

  return (
    <div>
     <div className='flex  items-center m-2 flex-col lg:flex-row sm:flex-col'>
                  <figure>
                    {/* <img src={photoURL || IMG} alt="Your Image" className="w-44 h-48 m-4 mx-auto lg:mx-0" /> */}
                  {photoURL &&    <img src={photoURL} alt= {label} className="w-44 h-48 m-4 mx-auto lg:mx-0" />}
                  </figure>

                  <div className='w-6/12 m-3 flex justify-center'>
                    <label htmlFor={label} className="w-12/12 lg:w-12/12 sm:w-12/12 text-center align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-2 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 mx-2 text-white">
                   {label}
                      <input
                        type="file"
                        label= {label}  
                        className="hidden"
                          accept="image/*"
                          id= {label}
                          style={{ display: 'none' }}
                          onChange={handleChange}    
                          name={label}               
                      />
                 
        
                          
                    </label>
                  </div>
                </div>

                <Modal isOpen={openCrop} onClose={handleCloseCrop}>
        <ModalHeader>
          <h2 className="text-xl"> {label}</h2>
        </ModalHeader>
        <ModalBody>
          <CropEasy photoURL={photoURL} setOpenCrop={setOpenCrop} setPhotoURL={setPhotoURL} setFile={setFile} imageWidth={imagewidth} imageHeight={imageheight}  />
        </ModalBody>
        
      </Modal>



{/* 
                {openCrop && (
                  <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile}} />
                
                )} */}
    </div>
  )
}

export default ImageUpload

