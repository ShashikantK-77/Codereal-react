import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LabelArea from './LabelArea';
import useLoginSubmit from 'hooks/useLoginSubmit';
import InputAreacompo from './InputAreacompo';
import Error from './Error';
import Loaderinput from './Loaderinput';
import { formValidationRules } from './formValidationRules';

const PincodeInput = ({ register, errors, handlePincodeSubmit }) => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState('');
  const [Area, setArea] = useState([]);
  const [OtherArea, setOtherArea] = useState();
  const [City, setCity] = useState();
  const [State, setState] = useState();
  const [Country, setCountry] = useState();
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset OtherArea when pincode changes
    setOtherArea('');
  }, [pincode]);

  const fetchData = async (pincode, secretKey, token) => {
    try {
      const response = await axios.post(
        'https://services.v2.ventajatech.com/api/PinCode/GetPincodeDetails',
        {
          pincode: pincode,
          SecureKey: secretKey,
          Token: token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            companyid: '100',
          },
        }
      );

      const data = response.data;
      console.log(data);

      if (data.issuccess === true) { // Check the "issuccess" flag
        const { City, State, Country } = data.result[0];
        setCity(City);
        setState(State);
        setCountry(Country);
        setLoading(false);
        const newResult = `${City},${State}`;

        const areas = data.result.map(item => item.Area);
        areas.push('-- Other Area --');

        setResult(newResult);
        setArea(areas);
      } else {
        setLoading(false);
        setResult('Invalid Pincode');
      }
    } catch (error) {
      console.log('Error:', error);
      setResult('Invalid Pincode');
    }
  };


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

  async function getToken(value) {
    const secretKey = 'GWs6Lmk24HyOUbaL9FQAWDgdhyu45x5sb3qj48T';
    const pincodetryl = value;
    const rawdata = `${pincodetryl}$$${secretKey}`;
    const token = await CreateHashTokenPincode(rawdata, secretKey);
    return token;
  }

  const handleChange = async (e) => {
    const value = e.target.value;


    setPincode(value);
    const secretKey = 'GWs6Lmk24HyOUbaL9FQAWDgdhyu45x5sb3qj48T';
    const token = await getToken(value);

    if (value.length === 6) {
      setLoading(true);
      fetchData(value, secretKey, token);

    } else {
      setCity('');
      setState('');
      setArea([]);
      setOtherArea('');
      setResult('');
      setLoading(false);
      setSelectedArea('');
    }
    // setSelectedArea('');
  };

  const handleSelect = e => {
    const selectedValue = e.target.value;
    // console.log(selectedValue);
    setOtherArea('');
    setSelectedArea(selectedValue);
  };

  const handleBlur = e => {
    e.preventDefault();
    const formData = {
      pincode,
      // selectedArea: OtherArea !== undefined ? OtherArea : selectedArea,
      selectedArea: OtherArea !== '' ? OtherArea : selectedArea,

      // selectedArea: OtherArea !== undefined ? OtherArea : (selectedArea !== undefined ? selectedArea : "shashi"),


      // selectedArea,
      // OtherArea
      City,
      State,
      Country,
    };

    handlePincodeSubmit(formData);
  };

  return (
    <form onBlur={handleBlur}>
      <div className="">
        <div className="">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <LabelArea label="Address" />
                <input
                  {...register('pincode', {
                    ...formValidationRules.pincode,
                  })}
                  type="number"
                  label="pincode"
                  value={pincode}
                  onChange={handleChange}
                  name="pincode"
                  placeholder="Pincode"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

                />
                {/* {!result && errors.pincode && <Error errorName={errors.pincode} />} */}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative mt-12">
                {loading ? (
                  <Loaderinput />
                ) : (
                  <LabelArea
                    style={{ color: result === 'Invalid Pincode' ? 'red' : 'inherit' }}
                    label={result}

                  />
                )}
              </div>
            </div>
            <div className="p-2 w-1/2">
             






              <select
  {...register('select', {
    ...formValidationRules.select,
    validate: (value) => value !== '-- Area --' || 'Please select an area.',
  })}
  name="select"
  label="select"
  onChange={handleSelect}
  className="bg-gray-50 mr-2 rounded w-full h-10 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none mb-4"
>
  <option>-- Area --</option>
  {Area.map((area, index) => (
    <option key={index}>{area}</option>
  ))}
</select>
{/* <Error errorName={errors.select} />  */}

            </div>
            {selectedArea === '-- Other Area --' && pincode.length >= 6 && selectedArea !== '-- Area --' && (
              <div className="p-2 w-1/2">
                <div className="relative">
                  <input
                    {...register('otherArea', {
                      ...formValidationRules.otherArea,
                    })}
                    type="text"
                    name="otherArea"
                    value={OtherArea}
                    onChange={e => setOtherArea(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    label="otherArea"
                    placeholder="Enter Area here"
                  />
                  {/* <Error errorName={errors.otherArea} /> */}
                  
              {/* {!result && errors.pincode && <Error errorName={errors.pincode} />}
           {!errors.pincode && errors.select && <Error errorName={errors.select} /> }
         {!errors.pincode && !errors.select && errors.otherArea &&  <Error errorName={errors.otherArea} />} */}
               
                </div>
              </div>

            )}

        
          </div>
        </div>
      </div>
    </form>
  );
};

export default PincodeInput;
