// import React, { useContext,useState,useEffect } from "react";
// import { Redirect, Route } from "react-router-dom";
// import { AdminContext } from "context/AdminContext";
// import { jwtDecode } from "jwt-decode";

// const PrivateRoute = ({ children, ...rest }) => {
//   const { state } = useContext(AdminContext);
//   const [decode, setDecode] = useState({});
//   const { zenithQuark } = state;
// console.log("in privateroute zenithQuark:",zenithQuark);

// useEffect(() => {
//   if (zenithQuark) {
//     try {
//       const decodedToken = jwtDecode(zenithQuark);
//       console.log("decodedToken in PrivateRoute:", decodedToken.user);
//       setDecode(decodedToken.user);
//     } catch (error) {
//       console.error("Invalid token", error);
//       // setDecode(null);
//     }
//   } else {
//     // setDecode(null);
//   }
// }, [zenithQuark]); // Dependency array to run effect when zenithQuark changes

//   console.log("lastchk:",decode );
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         decode.email_id ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;


// import React, { useContext } from "react";
// import { Redirect, Route } from "react-router-dom";
// import { AdminContext } from "context/AdminContext";
// import { jwtDecode } from "jwt-decode";

// const PrivateRoute = ({ children, ...rest }) => {
//   const { state } = useContext(AdminContext);
//   const { zenithQuark } = state;
//   let isValidToken = false;

//   if (zenithQuark) {
//     try {
//       const decodedToken = jwtDecode(zenithQuark);
//       console.log("decodedToken in PrivateRoute:",decodedToken);
//       // Check if token is decoded successfully
//       isValidToken = !!decodedToken;
//     } catch (error) {
//       isValidToken = false;
//     }
//   }

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isValidToken ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;




// import React, { useContext, useState, useEffect } from "react";
// import { Redirect, Route } from "react-router-dom";
// import { AdminContext } from "context/AdminContext";
// import {jwtDecode} from "jwt-decode"; // Corrected import
// import Cookies from "js-cookie";

// const PrivateRoute = ({ children, ...rest }) => {
//   const { state } = useContext(AdminContext);
//   const [decode, setDecode] = useState({});
//   const { zenithQuark } = state;

//   // console.log("in privateroute zenithQuark:", zenithQuark);

//   useEffect(() => {
//     // Check if zenithQuark is valid before decoding
//     // const zenithQuark = Cookies.get("zenithQuark");
//     if (zenithQuark) {
//       try {
//         const decodedToken = jwtDecode(zenithQuark);
//         console.log("decodedToken in PrivateRoute:", decodedToken);

//         if (decodedToken && decodedToken.user) {
//           setDecode(decodedToken.user.email_id);
//           console.log("Settled decodedToken.user:", decodedToken.user);
//         } else {
//           console.error("Invalid decoded token structure", decodedToken);
//           setDecode({});
//         }
//       } catch (error) {
//         console.error("Invalid token", error);
//         setDecode({});
//       }
//     } else {
//       console.error("zenithQuark is not set or is empty");
//       setDecode({});
//     }
//   }, []); // Dependency array to run effect when zenithQuark changes

//   useEffect(() => {
//     console.log("Updated decode state:", decode);
//   }, [decode]);

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         decode? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;


import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Corrected import
const PrivateRoute = ({ children, ...rest }) => {
  // Check if zenithQuark cookie exists
  const zenithQuark = Cookies.get("zenithQuark");

  // const decodedToken = jwtDecode(zenithQuark);
  // console.log("decodedToken in PrivateRoute:", decodedToken);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        zenithQuark ? (
          // If cookie exists, render the children components
          children
        ) : (
          // If cookie does not exist, redirect to login page
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

