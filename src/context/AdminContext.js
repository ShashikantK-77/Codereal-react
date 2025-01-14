// import Cookies from 'js-cookie';
// import React, { createContext, useReducer } from 'react';
// import useEncryption from 'hooks/useEncryption';


// export const AdminContext = createContext();

// const initialState = {
//   adminInfo: Cookies.get('adminInfo')
//     ? JSON.parse(Cookies.get('adminInfo'))
//     : null,
// };


// function reducer(state, action) {
//   switch (action.type) {
//     case 'USER_LOGIN':
//       const AdminInfo = action.payload
//       console.log(AdminInfo);

//       return { ...state, adminInfo: action.payload };
        


//     case 'USER_LOGOUT':
//       return {
//         ...state,
//         adminInfo: null,
//       };

//     default:
//       return state;
//   }
// }

// export const AdminProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const value = { state, dispatch };
 
//   return (
//     <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
//   );
// };


// import Cookies from 'js-cookie';
// import React, { createContext, useReducer, useEffect } from 'react';

// import useEncryption from 'hooks/useEncryption';

// export const AdminContext = createContext();

// const initialState = {
//   zenithQuark: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'USER_LOGIN':
//       console.log("in reducer USER_LOGIN");
//       return { ...state, zenithQuark: action.payload };

//     case 'USER_LOGOUT':
//       return { ...state, zenithQuark: null };

//     default:
//       return state;
//   }
// }

// export const AdminProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { decrypt } = useEncryption(); // Assuming this hook is correctly set up

//   useEffect(() => {
//     const fetchAdminInfo = async () => {
//       try {
//         const encryptedAdminInfo = Cookies.get('zenithQuark');

//         if (encryptedAdminInfo) {
//           const decryptedAdminInfo = decrypt(encryptedAdminInfo);
//           dispatch({ type: 'USER_LOGIN', payload: decryptedAdminInfo });
//         }
//       } catch (error) {
//         console.error('Error fetching and decrypting adminInfo:', error);
//       }
//     };

//     fetchAdminInfo();
//   }, []);

//   const value = { state, dispatch };

//   return (
//     <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
//   );
// };



import Cookies from 'js-cookie';
import React, { createContext, useReducer } from 'react';
import useEncryption from 'hooks/useEncryption';

export const AdminContext = createContext();

const initialState = {
  zenithQuark: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      console.log("in reducer USER_LOGIN state, action", state, action);
      
      return { ...state, zenithQuark: action.payload };

    case 'USER_LOGOUT':
      return { ...state, zenithQuark: null };

    default:
      return state;
  }
}

export const AdminProvider = ({ children }) => {
  const { decrypt } = useEncryption(); // Assuming this hook is correctly set up

  // Fetch and decrypt adminInfo on each component render
  try {
    const encryptedAdminInfo = Cookies.get('zenithQuark');

    if (encryptedAdminInfo) {
      initialState.zenithQuark = decrypt(encryptedAdminInfo);
    
      console.log("initialState.zenithQuark:",initialState.zenithQuark);
    }
  } catch (error) {
    console.error('Error fetching and decrypting adminInfo:', error);
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};


// import Cookies from 'js-cookie';
// import React, { createContext, useReducer } from 'react';
// import useEncryption from 'hooks/useEncryption';

// export const AdminContext = createContext();

// const initialState = {
//   zenithQuark: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'USER_LOGIN':
//       console.log("in reducer USER_LOGIN state, action", state, action);
//       return { ...state, zenithQuark: action.payload };

//     case 'USER_LOGOUT':
//       return { ...state, zenithQuark: null };

//     default:
//       return state;
//   }
// }

// export const AdminProvider = ({ children }) => {
//   const { decrypt } = useEncryption();

//   // Fetch and decrypt adminInfo on each component render
//   try {
//     const encryptedAdminInfo = Cookies.get('zenithQuark');

//     if (encryptedAdminInfo) {
//       initialState.zenithQuark = decrypt(encryptedAdminInfo);
//       console.log("initialState.zenithQuark:", initialState.zenithQuark);
//     }
//   } catch (error) {
//     console.error('Error fetching and decrypting adminInfo:', error);
//   }

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const value = { state, dispatch };

//   return (
//     <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
//   );
// };
