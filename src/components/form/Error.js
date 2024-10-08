// import React from "react";
// import { notifyError } from "utils/toast";

// const Error = ({ errorName }) => {
//   return (
//     <>
//       {errorName && (
//         <span className="text-red-400 text-sm mt-2">{errorName.message}</span>
  
//       )}
//     </>
//   );
// };

// export default Error;


import React, { useEffect } from "react";
import { notifyError } from "utils/toast";

const Error = ({ errorName }) => {
  useEffect(() => {
    if (errorName) {
      notifyError(errorName.message);
    }
  }, [errorName]);

  return null;
};

export default Error;

