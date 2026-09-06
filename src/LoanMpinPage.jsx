import React, { useState } from "react";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoanApplication } from "./useLoanApplication";
import { StepNavigation, StepShell } from "./LoanStepShell";
import { postLoanStep } from "./loanApi";

export default function LoanMpinPage() {
  const { docId, mpin, setMpin } = useLoanApplication();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const continueToDetails = async () => {
    setLoading(true);
    setError("");
    try {
      await postLoanStep("pin", { documentId: docId.trim(), pin: mpin });
      navigate("/loan/details");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <StepShell icon={<KeyRound size={18} className="text-teal-600" />} title="Set MPIN" subtitle="Choose any 4-digit PIN for this preview">
        <label className="text-[11px] font-semibold text-slate-400 tracking-wide">4-digit MPIN</label>
        <div className="mt-1.5 flex gap-2.5">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-center text-lg font-bold text-slate-700">
              {mpin[index] ? "•" : ""}
            </div>
          ))}
        </div>
        <input
          autoFocus
          inputMode="numeric"
          value={mpin}
          onChange={(event) => setMpin(event.target.value.replace(/\D/g, "").slice(0, 4))}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm text-slate-700 outline-none tracking-[0.5em]"
          placeholder="Type PIN here"
        />
      </StepShell>
      {error && <p className="px-5 pt-3 text-xs text-red-500">{error}</p>}
      <StepNavigation backPath="/loan/doc-id" nextPath="/loan/details" nextLabel="Continue to Details" disabled={mpin.length !== 4} onNext={continueToDetails} loading={loading} />
    </>
  );
}
