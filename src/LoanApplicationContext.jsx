import React, { useRef, useState } from "react";
import { LoanApplicationContext } from "./LoanApplicationContextValue";

export function LoanApplicationProvider({ children }) {
  const [docId, setDocId] = useState("");
  const [mpin, setMpin] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [submittedAt, setSubmittedAt] = useState(null);
  const otpRefs = useRef([]);

  const reset = () => {
    setDocId("");
    setMpin("");
    setFullName("");
    setMobile("");
    setAgreed(true);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError(false);
    setOtpAttempts(0);
    setSubmittedAt(null);
  };

  return (
    <LoanApplicationContext.Provider
      value={{
        docId,
        setDocId,
        mpin,
        setMpin,
        fullName,
        setFullName,
        mobile,
        setMobile,
        agreed,
        setAgreed,
        otpDigits,
        setOtpDigits,
        otpError,
        setOtpError,
        otpAttempts,
        setOtpAttempts,
        submittedAt,
        setSubmittedAt,
        otpRefs,
        reset,
      }}
    >
      {children}
    </LoanApplicationContext.Provider>
  );
}
