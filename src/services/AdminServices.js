import { notifyError, notifySuccess } from "utils/toast";
import requests from "./httpService";
import logError from "hooks/useErrorLogger";
import CryptoJS from 'crypto-js';
import { BaseUrl } from "utils/Constants";

const generateRandomPassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
};

function generateUserID() {
  const timestamp = Date.now().toString(); // Use the entire timestamp as a string
  const randomNumbers = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  const userID = `${timestamp}${randomNumbers}`.slice(0, 7); // Concatenate timestamp and random number
  return userID;
}

const AdminServices = {
  // registerUser: async (body) => {
  //   const existingData = JSON.parse(localStorage.getItem("User_Master")) || [];

   

    
  //   const res = {
  //     // UserID: generateUserID(),
  //     Name: body.name,
  //     Password: body.password,
  //     Mobile_No: body.Mobile_No,
  //     email: body.email,
  //   };
  
  //   const updatedData = [...existingData, res];
  
  //   if (res.Name && res.Mobile_No && res.email && res.Account_Type) {
  //     localStorage.setItem("User_Master", JSON.stringify(updatedData));
  //   }
  
  //   return res;
  // },

  registerUser: async (body) => {
    console.log("in registerUser body:",body);
    try {
        const response = await fetch(`${BaseUrl}api/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 1f3g2jh4k5l6qw8e7r9ty0uiopasdfghjklzaapaxcvbnm'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        return data;
    } 
    catch (error) {
        console.error('Error registering user:', error.message);
        return { success: false, message: 'Failed to register user' };
    }
},






  registerAdmin: async (body) => {
    try {
      const adminData = {
        AdminID: generateUserID(),
        Name: body.name,
        Password: body.password,
        Mobile_No: body.mobileNo, // Assuming the property is named 'mobileNo' instead of 'Mobile_No'
        email: body.email,
        Account_Type: "Admin",
        IsLocked: false,
        Issuperadmin: false,
        IsDeleted: false,
      };
  
      const response = await fetch('http://localhost:3001/api/registerAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, admin: data.user };
      } else {
        return { success: false, message: data.message || 'Failed to register admin' };
      }
    } catch (error) {
      console.error('An error occurred:', error);
      logError(error.message, 'AdminServices.js');
      return { success: false, message: 'Failed to register admin' };
    }
  },
  


  
  
//   loginUser: async (body) => {
//     console.log("in loginUser");
//     try {
//         const response = await fetch('http://localhost:5000/api/login', {

//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer 1f3g2jh4k5l6qw8e7r9ty0uiopasdfghjklzaapaxcvbnm'

//             },
//             body: JSON.stringify(body)
//         });
//         console.log("response loginUser::",response);

//         if (!response.ok) {
//             throw new Error('Failed to login');
//         }

//         const data = await response.json();
//         console.log("data in responce /api/loginUser:",data);
//         // if (data.token) {
//         //     localStorage.setItem('authToken', data.token); // Store the token in localStorage
//         //     sessionStorage.setItem('authToken', data.token);
//         // }
//         return data;
//     } catch (error) {
//         console.error('Error during login:', error.message);
//         logError(error.message, 'AdminServices.js');
//         return { success: false, message: 'An error occurred during login' };
//     }
// },




// loginUser: async (body) => {
//   console.log("in loginUser");
//   try {
//       const {email, password} = body;

//       // Hash the password
//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       // Create a string with username, hashed password, and additional characters
//       const combinedString = `${email}${hashedPassword}!@#`;
//       const finalHash = await bcrypt.hash(combinedString, saltRounds);
//       console.log("finalHash:",finalHash);
//       // Make the API request
//       const response = await fetch('http://localhost:5000/api/login', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${finalHash}`
//           },
//           body: JSON.stringify({ email }) // Sending only email in the body
//       });

//       console.log("response loginUser::", response);

//       if (!response.ok) {
//           throw new Error('Failed to login');
//       }

//       const data = await response.json();
//       console.log("data in response /api/loginUser:", data);

//       return data;
//   } catch (error) {
//       console.error('Error during login:', error.message);
//       logError(error.message, 'AdminServices.js');
//       return { success: false, message: 'An error occurred during login' };
//   }
// },

loginUser: async (body) => {
  console.log("in loginUser");
  try {
    const { email, password } = body;

    // Hash the password using CryptoJS
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Create a string with email and hashed password
    const combinedString = `${email}${hashedPassword}!@#`;
    const finalHash = CryptoJS.SHA256(combinedString).toString();
    // console.log("finalHash:", finalHash);

    // Make the API request
    const response = await fetch(`${BaseUrl}api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalHash}`
      },
      body: JSON.stringify(body) // Sending only email in the body
    });

    console.log("response loginUser::", response);

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    console.log("data in response /api/loginUser:", data);

    return data;
  } catch (error) {
    console.error('Error during login:', error.message);
    return { success: false, message: 'An error occurred during login' };
  }
},


  
  loginAdmin: async (body) => {
    try {
      // Make a POST request to the server endpoint for admin login
      const response = await fetch('http://localhost:3001/api/loginAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) // Convert the body object to JSON string
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to login admin');
      }
  
      // Parse the JSON response
      const result = await response.json();
  
      // Return the result received from the server
      return result;
    } catch (error) {
      console.error('Error logging in admin:', error);
      logError(error.message, 'AdminServices.js');
      // Handle any errors and return an appropriate response
      return { success: false, message: 'Failed to login admin' };
    }
  },


  forgetPassword: async (body) => {
    const existingData = JSON.parse(localStorage.getItem("Admin")) || [];
    
    // Find the index of the provided email in the existing data
    const matchedEmailIndex = existingData.findIndex((admin) => admin.email === body.verifyEmail);
  
    if (matchedEmailIndex !== -1) {
      // Email exists, proceed with password reset logic
      // You can implement the password reset logic here
      
      console.log(`Email found at index ${matchedEmailIndex}. Proceed with password reset.`);
      console.log(`/reset-password/${matchedEmailIndex}`);
      notifySuccess("Your Password reset link is send to your email");
    } else {
      // Email does not exist in the existing data
      console.log("Email not found. Cannot proceed with password reset.");
     
      notifyError("Email not found. Cannot proceed with password reset.");
    }
    
  },
  

  StrategyMaster: async (body) => {
    const existingData = JSON.parse(localStorage.getItem("StrategyMaster")) || [];
    const res = {
      StrategyID: 1,
      exchange: body.exchange,
      bankniftyOption: body.bankniftyOption,
      finniftyOption: body.finniftyOption,
      futuresOption: body.futuresOption,
      niftyOption: body.niftyOption,
      optionsOption: body.optionsOption,
      selectedOption: body.selectedOption,
      strategyName: body.strategyName,
      ActiveFlag: true,
    };
    const updatedData = [...existingData, res];
  
    // if (res.StrategyName && res.ScriptAssetName) {
      localStorage.setItem("StrategyMaster", JSON.stringify(updatedData));
    // }
  
    return res;
   
  },

  resetPassword: async (body) => {
    const existingData = JSON.parse(localStorage.getItem("Admin")) || [];
    
    // Convert body.token to a numeric index
    const adminIndex = parseInt(body.token, 10);
    
    if (!isNaN(adminIndex) && adminIndex >= 0 && adminIndex < existingData.length) {
      // Update the password of the admin with the new password
      existingData[adminIndex].Password = body.newPassword;
  
      // Save the updated data back to local storage
      localStorage.setItem("Admin", JSON.stringify(existingData));
  
      console.log("Password reset successful.");
      notifySuccess("Password reset successful.");
    } else {
      console.log("Invalid token. Cannot reset password.");
      notifyError("Invalid token. Cannot reset password.");
    }
  },
  
  

  signUpWithProvider: async (body) => {
    return requests.post("/admin/signup", body);
  },

  addStaff: async (body) => {
    return requests.post("/admin/add", body);
  },
  getAllStaff: async (body) => {
    return requests.get("/admin", body);
  },
  getStaffById: async (id, body) => {
    return requests.post(`/admin/${id}`, body);
  },

  updateStaff: async (id, body) => {
    return requests.put(`/admin/${id}`, body);
  },

  updateStaffStatus: async (id, body) => {
    return requests.put(`/admin/update-status/${id}`, body);
  },

  deleteStaff: async (id) => {
    return requests.delete(`/admin/${id}`);
  },
};

export default AdminServices;
