import React, { lazy,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from './utils/toast';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import PrivateRoute from './components/login/PrivateRoute';

const Layout = lazy(() => import('./layout/Layout'));
const Login = lazy(() => import('./pages/Login'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const createaccount = lazy(() => import('./pages/SignUp'));
const Admincreateaccount = lazy(() => import('./pages/Admin/AdminSignUp'));
const ExSignUp = lazy(() => import('pages/ExSignUp'));
const ForgetPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const TermsCondition = lazy(() => import('./pages/TermsCondition'));




// import Layout from './layout/Layout';


const App = () => {

  // useEffect(()=>{
    // const AdminMenuString = JSON.stringify(AdminMenu);

    // // Save the string to local storage under the key 'AdminMenu'
    // localStorage.setItem('AdminMenuuuuuuuuuuu', AdminMenuString);
  // },[])

  return (
    <>
      <ToastContainer />
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/adminauth" component={AdminLogin} />
          <Route path="/createaccount" component={createaccount} />
          {/* <Route path="/createadminaccount" component={Admincreateaccount} /> */}
          <Route path="/exsignup" component={ExSignUp} />
          <Route path="/forgot-password" component={ForgetPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/termscoundition" component={TermsCondition} />
    

          <PrivateRoute>
            {' '}
            <Route path="/" component={Layout} />
          </PrivateRoute>
          <Redirect exact from="/" to="/login" />
        </Switch>
      
      </Router>
    </>
  );
};

// const AdminMenu = [
//   {
//   adminId : 1706013125044220,
//   sidebar: [
//   {
//     427038:[5394895,9857547],
//   },
//   {
//     4152227:[2552259,4416159],
//   }
  
//   ]
//   }
//   ]

export default App;
