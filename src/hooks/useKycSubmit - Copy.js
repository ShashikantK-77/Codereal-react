import { useContext, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useHistory, useLocation } from 'react-router-dom';
import { AdminContext } from 'context/AdminContext';
import AdminServices from 'services/AdminServices';
import { notifyError, notifySuccess } from 'utils/toast';


const useKycSubmit = () => {
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AdminContext);
    const history = useHistory();
    const location = useLocation();

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
      const cookieTimeOut = 0.5;
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
    
      setInput(inputValue);
      
      if (inputValue.length === 11) {
        // console.log("inputValue is here",inputValue );
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
          setTimeout(() => reject(new Error('Request timeout')), 5000) // Adjust the timeout duration as needed
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

      notifyError('Plz Enter Valid IFSC code');
    } finally {
      setLoad(false);
    }
  };
  
  const handleifscSubmit = async () => {
    // console.log("Submitted:", input);
    setLoad(false);
    // if (input.length===11){
        const secretKey = 'GWs6Lmk24HyOUbaL9FQAWDgdhyu45x5sb3qj48T';
        const token = await getToken(secretKey);
        console.log("secretKey:", secretKey, "token:", token);

        fetchData(secretKey, token);
  //   }
  //   else if(input.length===''){
  //       // alert("plz fill correct ifsc code")
  //       notifyError("Plz enter ifsc code");
    
  //   } else {
  //     // alert("plz fill correct ifsc code")
  //     notifyError("Plz fill correct ifsc code");
  
  // }
   
}




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