import React from 'react'

import PageTitle from "components/Typography/PageTitle";

import ParentStepper from 'components/KYC/ParentStepper';

import { useLocation } from 'react-router-dom';

const Kyc = () => {
    const location = useLocation();
    const initialStep = location.state?.initialStep ?? 0; // Use 0 as default if not provided
    const data = location.state?.data ?? {}; // Default to an empty object if not provided
    return (
        <div>
            <PageTitle>Create Strategy</PageTitle>

     
            <ParentStepper initialStep={initialStep} stepperData={data}/>
     
            
        </div>
    )
}

export default Kyc