import React, { useState } from 'react';
import axios from 'axios';
import LabelArea from './LabelArea';
import useLoginSubmit from "hooks/useLoginSubmit";

const PincodeInput = ({ register, errors, handlePincodeSubmit }) => {
    const [pincode, setPincode] = useState('');
    const [result, setResult] = useState('');
    const [Area, setArea] = useState([]);
    const [OtherArea, setOtherArea] = useState();
    const [City, setCity] = useState();
    const [State, setState] = useState();
    const [Country, setCountry] = useState();
    const [selectedArea, setSelectedArea] = useState('');

    // const { handleSubmit, loading,onSubmit } = useLoginSubmit();

    const fetchData = async (pincode, secretKey, token) => {
        try {
            const response = await axios.post('https://services.v2.ventajatech.com/api/PinCode/GetPincodeDetails', {
                pincode: pincode,
                SecureKey: secretKey,
                Token: token
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'companyid': '100',
                }
            });

            const data = response.data;
            console.log(data);

            if (response.status === 200) {
                const { City, State, Country } = data.result[0]; // Assuming you want to display the first result only
                //   const newResult = `${City}-${State}-${Country}`;
                setCity(City);
                setState(State);
                setCountry(Country);
                const newResult = `${City},${State}`;


                const areas = data.result.map(item => item.Area);

                areas.push('-- Other Area --');

                setResult(newResult);
                console.log(areas);
                setArea(areas);
            }
        } catch (error) {
            console.log('Error:', error);
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

            hmacKey.then(key => {
                crypto.subtle.sign('HMAC', key, rawDataBytes).then(signature => {
                    const hashRawData = new Uint8Array(signature);
                    const result = btoa(String.fromCharCode(...hashRawData));
                    resolve(result);
                }).catch(error => reject(error));
            }).catch(error => reject(error));
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
        // console.log(token);
        // console.log(value, secretKey, token);
        if (value.length === 6) {
            fetchData(value, secretKey, token);
          } else {
            setCity('');
            setState('');
            setArea([]);
            setOtherArea('');
            setResult(''); 
          }
    };
    let showOtherArea = false;

    const handleSelect = (e) => {
        const selectedValue = e.target.value;

        // setSelectedArea(selectedValue === '-- Other Area --' ? OtherArea : selectedValue);
        setSelectedArea(selectedValue);

       
    };








    // const handleSelect = (e) => {
    //     const selectedValue = e.target.value;

    //     setSelectedArea(selectedValue);
    // };
    // const handleOther = (e) => {
    //     const selectedValue = e.target.value;
    //     setSelectedArea(selectedValue);
    //   };

    // console.log(OtherArea);
    const handleBlur = (e) => {
        e.preventDefault(); // Prevent form submission
        const formData = {
            pincode,
            selectedArea: OtherArea !== undefined ? OtherArea : selectedArea,
            City,
            State,
            Country,
        };

        console.log("in PincodeInput", formData);

        handlePincodeSubmit(formData);
    };
   
    // let showOtherArea = selectedArea === '-- Other Area --' || pincode.length !== 6;
   
    // Rest of the component code...

    return (

        <form onBlur={handleBlur}>
            <div className="">
                <LabelArea label="Address" />
                <div className="">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">

                            <div className="relative">
                                <input type="number" value={pincode}
                                    onChange={handleChange}
                                    name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Pincode' />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative ">
                                <label className="leading-7  text-sm text-gray-600">{result} </label>
                            </div>
                        </div>
                        <div className="p-2 w-1/2">

                            <select onChange={handleSelect} className="bg-gray-50 mr-2 rounded w-full h-10 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none mb-4">
                                <option >-- Area --</option>
                                {Area.map((area, index) => (
                                    <option key={index}>{area}</option>
                                ))}
                            </select>
                        </div>
                        {/* Conditionally render the input field based on the selected value */}
                        {selectedArea === '-- Other Area --' && pincode.length >= 6 && (
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="otherArea"
                                        value={OtherArea}
                                        onChange={(e) => setOtherArea(e.target.value)}
                                        placeholder= "Enter Area here"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />    </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>

    );
};

export default PincodeInput;
