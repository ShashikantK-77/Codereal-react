import {  useState,  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { notifyError,notifySuccess } from 'utils/toast';
import AdminServices from 'services/AdminServices';
import { useListContext } from 'context/ListContext';


const useStrategySubmit = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { formData } = useListContext();
    console.log("formData is here",formData);
    const [defaultBirthdate, setDefaultBirthdate] = useState('');

    useEffect(() => {
      const currentDate = new Date();
      const defaultDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
      const formattedDefaultDate = defaultDate.toISOString().split('T')[0];
      setDefaultBirthdate(formattedDefaultDate);
    }, []);
    const {
      register,
      handleSubmit,
      formState: { errors },
      // Clear the form fields
  reset,

    } = useForm({});
  
    
    const onSubmit = ({ exchange,bankniftyOption,finniftyOption,futuresOption,niftyOption,optionsOption,selectedOption,strategyName }) => {
      setLoading(true);

      if (location.pathname === '/makestrategy') {
        // console.log("Scrip,strategyname:",Scrip,strategyname);
        AdminServices.StrategyMaster({  exchange,bankniftyOption,finniftyOption,futuresOption,niftyOption,optionsOption,selectedOption,strategyName})
          .then((res) => {
            if (res) {
              setLoading(false);
              notifySuccess('StrategyMaster Added Successfully!');
            
            }
          })
          .catch((err) => {
            notifyError(err ? err.response.data.message : err.message);
            setLoading(false);
          });
      }
    
    };

    let accumulatedData = {}; // Variable to store accumulated data

      const onStratSubmit = async (data) => {
       
  accumulatedData = { ...accumulatedData, ...data };
        setLoading(true);
        console.log("accumulatedData",accumulatedData);
        try {
          // const response = awaidatat yourApiCallHere(data);
          // Handle success
          setLoading(false);
          notifySuccess('StrategyMaster Added Successfully!');
        } catch (error) {
          // Handle error
          setLoading(false);
          notifyError(error ? error.response.data.message : error.message);
        }
      };
      
    return {
      onSubmit,
      register,
      handleSubmit,
      errors,
      loading,
      onStratSubmit,
      reset
    };
  };
  
  export default useStrategySubmit;