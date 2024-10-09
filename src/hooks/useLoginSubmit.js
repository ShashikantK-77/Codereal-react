import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { AdminContext } from 'context/AdminContext';
import AdminServices from 'services/AdminServices';
import { notifyError, notifySuccess } from 'utils/toast';
import useEncryption from './useEncryption';
// import {jwt_decode} from "jwt-decode";
import { jwtDecode } from "jwt-decode";



const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const { encrypt, decrypt } = useEncryption();


  const history = useHistory();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = ({ name, email, verifyEmail, password, Account_Type,Mobile_No,Gender }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

   
    
    if (location.pathname === '/login') {
      setLoading(true);
    
      AdminServices.loginUser({ email, password })
        .then((res) => {
          setLoading(false);
          if (res.success) {
            // notifySuccess('Login Success!');
    
            dispatch({ type: 'USER_LOGIN', payload: res.token });

            const decodedToken = jwtDecode(res.token);

            console.log("decodedToken:",decodedToken);
            const exp = decodedToken.exp;
            
            // Calculate expiration date
            const expirationDate = new Date(exp * 1000)
            console.log("expirationDate:",expirationDate);
            const encryptedAdminInfo = encrypt(res.token);
            Cookies.set('zenithQuark', encryptedAdminInfo, {
              expires: expirationDate,
            });
    
            // console.log("in success blk");
            history.replace('/masterdashboard'); // Redirect to master dashboard
          } else {
            notifyError(res.message || 'Invalid email or password');
          }
        })
        .catch((err) => {
          setLoading(false);
          const errorMessage = err ? err.response.data.message : 'An error occurred';
          notifyError(err.message);
        });
    }
    


    // if (location.pathname === '/adminauth') {
    //   setLoading(true);
    
    //   AdminServices.loginAdmin({ email, password })
    //     .then((res) => {
    //       console.log("res in loginAdmin:",res);
    //       setLoading(false);
    //       if (res.success) {
    //         notifySuccess('Login Success!');
    //         dispatch({ type: 'USER_LOGIN', payload: res.admin });
    //         // Cookies.set('adminInfo', JSON.stringify(res.admin), {
    //         //   expires: cookieTimeOut,
    //         // });

    //         const encryptedAdminInfo = encrypt(res.admin);
    //         Cookies.set('zenithQuark', encryptedAdminInfo, {
    //           expires: cookieTimeOut,
    //         });
    
    //         // Retrieve admin data from local storage
    //         const adminData = JSON.parse(localStorage.getItem('Admin_Master'));
    
    //         // Find the admin based on email
    //         const loggedInAdmin = adminData.find(admin => admin.email === email);
    //           console.log("loggedInAdmin:",loggedInAdmin);
    //         if (loggedInAdmin && !loggedInAdmin.Issuperadmin) {
    //           history.replace('/admndashboard'); // Redirect to master dashboard
    //         } else if (loggedInAdmin && loggedInAdmin.Issuperadmin) {
    //           history.replace('/masterdashboard');
    //         }
    //       } else {
    //         notifyError(res.message || 'Invalid email or password');
    //       }
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       const errorMessage = err ? err.response.data.message : 'An error occurred';
    //       notifyError(errorMessage);
    //     });
    // }

    if (location.pathname === '/adminauth') {
      setLoading(true);
    
      AdminServices.loginAdmin({ email, password })
        .then((res) => {
          console.log("res in loginAdmin:", res);
          setLoading(false);
          if (res.success) {
            notifySuccess('Login Success!');
            dispatch({ type: 'USER_LOGIN', payload: res.admin });

            const decodedToken = jwtDecode(res.admin.token);
            const exp = decodedToken.exp;

            // Calculate expiration date
            const expirationDate = new Date(exp * 1000)

            const encryptedAdminInfo = encrypt(res.admin);
            Cookies.set('zenithQuark', encryptedAdminInfo, {
              expires: expirationDate,
            });
    
            if (res.admin && !res.admin.Issuperadmin) {
              history.replace('/admndashboard'); // Redirect to master dashboard
            } else if (res.admin && res.admin.Issuperadmin) {
              history.replace('/masterdashboard');
            }
          } else {
            notifyError(res.message || 'Invalid email or password');
          }
        })
        .catch((err) => {
          setLoading(false);
          const errorMessage = err ? err.response.data.message : 'An error occurred';
          notifyError(errorMessage);
        });
    }
    
    

    // if (location.pathname === '/login') {
    //   // Simulating a successful login response with a dummy user object
    //   const dummyUser = {
    //     id: 123,
    //     name: 'John Doe',
    //     token: 'dummyToken',
    //     email: 'shashikantkamthe77@gmail.com',
    //   };
    
    //   setLoading(false);
    //   notifySuccess('Login Success!');
    //   dispatch({ type: 'USER_LOGIN', payload: dummyUser });
    //   Cookies.set('adminInfo', JSON.stringify(dummyUser), {
    //     expires: cookieTimeOut,
    //   });
    //   history.replace('/');
    // }
    

    if (location.pathname === '/createaccount') {
      // console.log("name, email, Mobile_No, role:",name, email, Account_Type, Mobile_No);
      AdminServices.registerUser({ name, email,password,Mobile_No,Gender })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Registration Successful!');
            // dispatch({ type: 'USER_LOGIN', payload: res });
            // Cookies.set('adminInfo', JSON.stringify(res), {
            //   expires: cookieTimeOut,
            // });
            history.replace('/login');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === '/createadmin') {
      // console.log("name, email, Mobile_No, role:",name, email, Account_Type, Mobile_No);
      AdminServices.registerAdmin({ name, email,password,Mobile_No })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Registration Successful!');
            // dispatch({ type: 'USER_LOGIN', payload: res });
            // Cookies.set('adminInfo', JSON.stringify(res), {
            //   expires: cookieTimeOut,
            // });
            history.replace('/adminlist');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === '/createadminaccount') {
      // console.log("name, email, Mobile_No, role:",name, email, Account_Type, Mobile_No);
      AdminServices.registerAdmin({ name, email,password,Mobile_No })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Registration Successful!');
            // dispatch({ type: 'USER_LOGIN', payload: res });
            // Cookies.set('adminInfo', JSON.stringify(res), {
            //   expires: cookieTimeOut,
            // });
            history.replace('/adminlist');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === '/forgot-password') {
      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
    watch
  };
};

export default useLoginSubmit;
