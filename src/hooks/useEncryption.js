import { useState } from 'react';
import CryptoJS from 'crypto-js';
import jwt_decode from "jwt-decode";

const useEncryption = () => {
  const [secretKey] = useState('1f3g2jh4KK5l6qw8$E7r9ty0uio@Spasdfghjklzaapa%xcvbnm'); // Replace with your secret key

  const encrypt = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
  };

  const decrypt = (encryptedData) => {
    console.log("in decrypt");
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };



  
  
  

  return { encrypt, decrypt };
};

export default useEncryption;
