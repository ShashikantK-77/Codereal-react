import React, { useEffect } from 'react'
import {
    Card,
    CardBody,
    Button,
    Label
} from "@windmill/react-ui";
import Loaderinput from '../form/Loaderinput';
import Error from 'components/form/Error';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from './Inputfields';


const


    IfscDetails = ({ setIfsccode,setBankname }) => {
        const { errors, register, handleSubmit, onSubmit, handlesubmitinkyc, handleifscSubmit, Bankname, Branchname, load, input } = useKycSubmit();

        useEffect(() => {

            setIfsccode(input);
            setBankname(Bankname);

        }, [Bankname])

        return (
            <div>
                <div className='flex flex-row w-full'>
                    <Inputfields register={register} label={"IFSC Code"} name={"IFSCode"} placeholder={"Enter IFS Code "} onChange={handleifscSubmit} />
                    <div className='p-1 my-8'>
                        {load && <Loaderinput className=" mx-auto" />}
                    </div>

                </div>



                {/* <Inputfields register={register} label={"IFSC Code"} name={"IFSCode"} placeholder={"Enter IFS Code "} onChange={handlesubmitinkyc}  /> */}
                <Error errorName={errors.IFSCode} />

                {/* <Button className='w-3/12 mx-auto' onClick={handleifscSubmit}>Verify</Button> */}
                {/* <Label className='m-2  text-base '>Bank Name : <span>{load ? <Loaderinput className="p-4 mx-auto " /> : Bankname}</span> </Label>

            <Label className='m-2  text-base '>Branch Name :<span>{load ? <Loaderinput className="p-4 mx-auto " /> : Branchname}</span></Label> */}

                <Label className='m-2  text-base '>Bank Name : <span> {Bankname}</span> </Label>

                <Label className='m-2  text-base '>Branch Name :<span> {Branchname}</span></Label>

            </div>
        )
    }

export default IfscDetails