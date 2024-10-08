export const formValidationRules = {
    Name: {
      required: 'Full Name is required',
      minLength: {
        value: 5,
        message: 'Please Enter Valid Full Name',
      },
    },
    MobileNo: {
      required: 'Mobile Number is required',
      pattern: {
        value: /^\d{10}$/,
        message: 'Mobile Number must be 10 digits',
      },
    },
    EmailID: {
      required: 'Email ID is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid Email ID',
      },
    },
    pincode: {
      required: 'Pincode is required',
    },
    ReferenceId: {
      validate: (value) => {
        if (!value) {
          return 'Referral Id is required';
        }
        return null;
      }},
    otherArea: {
      required: 'Other Area is required',
    },
    select: {
      required: 'Plz Select the Area',
    },
    forgotUserId: {
      required: 'User Id is required',
    },
    forgotMobile: {
      required: 'Mobile Number is required',
    },
    teamselect: {
      required: 'Please Select Team',
    },
    chkterms:{
      required: 'Please read and agree Terms and Conditions in rules.',
    },
    Username:{
      required: 'User Name is required.',
    },
    Birthdate: {
      required: 'Birthdate is required.',
    },
    pannumber:{
      required: 'Pan Card Number is required.',
      pattern: {
        value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
        message: 'Invalid PAN Card Number.',
      },
    },
    AadharCard:{
      required: 'Aadhaar Card Number is required.',
      // pattern: {
      //   value: /^\d{4}\s\d{4}\s\d{4}$/,
      //   message: 'Invalid Aadhaar Card Number.',
      // }
    },
    BankAccount:{
      required: 'Bank Account Number is required.',
    },
    IFSCode:{
      required: 'IFSCode Number is required.',
    },
    Nomineename:{
      required: 'Nominee Name is required.',
    },
    Nominecontact:{
      required: 'Nominee Contact Number is required.',
    },
    NomineeRel:{
      required: 'Please Select Nominee Relation.',
    },
    NomineeBirthdate:{
      required: 'Please Select Nominee Birthdate.',
    },
    verifyifsc:{
      required: 'Please Verify Ifsc Code.',
    },
    uploadphoto:{
      required: 'Please Upload Photo.',
    },
    verifyid:{
      required: 'Please verify Referral id .',
    },
    Oldpassword:{
      required: 'Please Enter Old Password .',
    },
    ChangePassword:{
      required: 'Please Enter New Password .',
    },
    ChangePassword:{
      required: 'Please Enter New Password .',
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
        message: 'Password must be at least 6 characters long and include at least one uppercase letter and one symbol.',
      },
    },
    VerChangePas:{
      required: 'Please Verify New Password .',
    }
    
    // Add validation rules for other fields
  };
  