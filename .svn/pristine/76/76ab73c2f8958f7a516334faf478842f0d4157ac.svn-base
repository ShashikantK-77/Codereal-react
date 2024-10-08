import { useContext, useState, useEffect } from 'react';
import { AdminContext } from 'context/AdminContext';
import {jwtDecode} from 'jwt-decode';

const useDecodedToken = () => {
  const { state } = useContext(AdminContext);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const { zenithQuark } = state;
    
    if (zenithQuark) {
      try {
        const token = jwtDecode(zenithQuark);
        setDecodedToken(token.user);
      } catch (error) {
        console.error('Failed to decode token:', error);
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null);
    }
  }, [state]);

  return decodedToken;
};

export default useDecodedToken;
