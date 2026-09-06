import React, { useState } from "react";
import { Check, Smartphone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoanApplication } from "./useLoanApplication";
import { Field, StepNavigation, StepShell } from "./LoanStepShell";
import { postLoanStep } from "./loanApi";

export default function LoanDetailsPage() {
  const { docId, mpin, fullName, setFullName, mobile, setMobile, agreed, setAgreed } = useLoanApplication();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const valid = Boolean(fullName.trim()) && Boolean(mobile.trim()) && agreed;
  const continueToOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await postLoanStep("personalDetails", {
        documentId: docId.trim(),
        pin: mpin,
        fullName: fullName.trim(),
        mobileNumber: mobile.trim(),
      });
      navigate("/loan/otp");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <StepShell icon={<User size={18} className="text-teal-600" />} title="Personal information" subtitle="As per your official documents">
        <div className="space-y-4">
          <Field label="Full name" icon={<User size={16} className="text-slate-400 shrink-0" />} value={fullName} onChange={setFullName} placeholder="As per your documents" />
          <Field label="Mobile number" icon={<Smartphone size={16} className="text-slate-400 shrink-0" />} value={mobile} onChange={setMobile} placeholder="e.g. 17XXXXXX" />
        </div>
      </StepShell>
      <div className="px-4 mt-4 flex items-start gap-2.5 sm:px-6">
        <button type="button" onClick={() => setAgreed((value) => !value)} aria-pressed={agreed} aria-label="Agree to terms and conditions" className={"mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors " + (agreed ? "bg-teal-600 border-teal-600" : "border-slate-300 bg-white")}>
          {agreed && <Check size={13} className="text-white" strokeWidth={3} />}
        </button>
        <p className="text-[13px] text-slate-500 leading-snug">I agree to the <span className="text-[#288da5] font-semibold">Terms &amp; conditions</span> and <span className="text-[#288da5] font-semibold">privacy policy</span> of Digital Kidu Bank.</p>
      </div>
      {error && <p className="px-5 pt-3 text-xs text-red-500">{error}</p>}
      <StepNavigation backPath="/loan/mpin" nextPath="/loan/otp" nextLabel="Continue to OTP" disabled={!valid} onNext={continueToOtp} loading={loading} />
    </>
  );
}
