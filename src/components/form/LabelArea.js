// import React from "react";
// import { Label } from "@windmill/react-ui";

// const LabelArea = ({ label }) => {
//   return (
//     <Label className="col-span-4 sm:col-span-2 font-medium text-sm">
//       {label}
//     </Label>
//   );
// };

// export default LabelArea;

import React from "react";
import { Label } from "@windmill/react-ui";

const LabelArea = ({ label, extraClassName }) => {
  // Combine the default class and extraClassName
  const combinedClassName = `col-span-4 sm:col-span-2 font-medium text-sm mt-4 ${extraClassName}`;

  return (
    <Label className={combinedClassName}>
      {label}
    </Label>
  );
};

export default LabelArea;
