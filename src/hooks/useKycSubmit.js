import {  useState,  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { notifyError } from 'utils/toast';

const useKycSubmit = () => {
    const [loading, setLoading] = useState(false);


    //bank details
    const [input, setInput] = useState('');
    const [Bankname, setBankname] = useState('');
    const [Branchname, setBranchname] = useState('');
    const [load,setLoad]  = useState(false);

    //birthdate
    const [defaultBirthdate, setDefaultBirthdate] = useState('');

    useEffect(() => {
      const currentDate = new Date();
      const defaultDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
      const formattedDefaultDate = defaultDate.toISOString().split('T')[0];
      setDefaultBirthdate(formattedDefaultDate);
    }, []);

//image upload
    // const [image, setImage] = useState(null);
    // const [selectedImage, setSelectedImage] = useState(null);

    // const inputFileRef = useRef(null);


    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({});
  
    
    const onSubmit = ({ Birthdate,EmailID,MobileNo,Username,AadharCard,pannumber }) => {
      setLoading(true);
    
  // console.log("in kyc submit",Birthdate,EmailID,MobileNo,Username,AadharCard,pannumber);
    
    };

    // const handlesubmitinkyc =(e)=>{
    //   e.preventDefault();
    //   setLoad(false);
    //   const inputValue = e.target.value;

    //   setInput(inputValue);
    //   // console.log(input);
    //   if (input.length == 11) {
    //     handleifscSubmit();
    // }
    //   if (input.length != 11) {
    //       setBankname('');
    //       setBranchname('');
    //   }
    // }

    const handlesubmitinkyc = (e) => {
      e.preventDefault();
      setLoad(false);
      const inputValue = e.target.value;
      // const inputValue = e.target.elements.IFSCode.value;
    
      setInput(inputValue);
      
      if (inputValue.length === 11) {
        console.log("inputValue is here === 11",inputValue );
        handleifscSubmit();
      }
    
      if (inputValue.length !== 11) {
        setBankname('');
        setBranchname('');
      }
    }
    

    function CreateHashTokenPincode(rawData, secretKey) {
      return new Promise((resolve, reject) => {
          secretKey = secretKey || '';

          const encoding = new TextEncoder();
          const secretKeyBytes = encoding.encode(secretKey);
          const rawDataBytes = encoding.encode(rawData);

          const hashAlgorithm = 'SHA-256';
          const hmacKey = crypto.subtle.importKey(
              'raw',
              secretKeyBytes,
              { name: 'HMAC', hash: { name: hashAlgorithm } },
              false,
              ['sign']
          );

          hmacKey
              .then(key => {
                  crypto.subtle
                      .sign('HMAC', key, rawDataBytes)
                      .then(signature => {
                          const hashRawData = new Uint8Array(signature);
                          const result = btoa(String.fromCharCode(...hashRawData));
                          resolve(result);
                      })
                      .catch(error => reject(error));
              })
              .catch(error => reject(error));
      });
  }

  async function getToken(secretKey) {

       
      const rawdata = `${input}$$${secretKey}`;
      const token = await CreateHashTokenPincode(rawdata, secretKey);
      console.log("input:",input,"secretKey:",secretKey,"token:",token);
      return token;
  }




  const fetchData = async (secretKey, token) => {
    setLoad(true);
    try {
      const response = await Promise.race([
        axios.post(
          'https://services.v2.ventajatech.com/api/IFSC/GetIFSCDetails',
          {
            IFSCode: input,
            SecureKey: secretKey,
            Token: token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              companyid: '100',
            },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 8000) // Adjust the timeout duration as needed
        ),
      ]);
  
      if (response) {
        const data = response.data;
        if (data.result[0].Bank) {
          setBankname(data.result[0].Bank);
          setBranchname(data.result[0].Branch);
        } else {
          notifyError('Invalid IFSC Code.');
        }
      } else {
        notifyError('Request timed out');
      }
    } catch (error) {
      if (error.message === 'Request timeout') {
        notifyError('Request timed out');
      } else {
        notifyError('Plz Enter Valid IFSC code');
      }
    } finally {
      setLoad(false);
    }
  };
  
  
  const handleifscSubmit = async (e) => {
    e.preventDefault();
    setLoad(false);

    const inputValue = e.target.value;
      // setInput(inputValue);
    if (inputValue.length === 11) {
      setInput(inputValue);
      const secretKey = 'GWs6Lmk24HyOUbaL9FQAWDgdhyu45x5sb3qj48T';
      setLoad(true);
      const token = await getToken(secretKey);
   
      fetchData(secretKey, token);
    } else if (inputValue.length === 0) {
      notifyError("Plz enter ifsc code");
      setBankname('');
      setBranchname('');
    } else {
      // notifyError("Plz fill correct ifsc code");
      // notifyError(input.length);
      setBankname('');
      setBranchname('');
    }
  };
  




    return {
      onSubmit,
      register,
      handleSubmit,
      errors,
      loading,
      handlesubmitinkyc,
      handleifscSubmit,
      Bankname,
      Branchname,
      load,
      input,
      defaultBirthdate,
    };
  };
  
  export default useKycSubmit;