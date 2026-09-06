import React from "react";
import { Check, Clock3, FileCheck2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoanApplication } from "./useLoanApplication";

export default function LoanSuccessPage() {
  const navigate = useNavigate();
  const { docId, fullName, submittedAt, reset } = useLoanApplication();
  const reviewDate = new Date(submittedAt || Date.now());
  const referenceNumber = `DK${docId.replace(/\D/g, "").slice(-7).padStart(7, "0")}`;
  const formattedDate = reviewDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = reviewDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const startOver = () => {
    reset();
    navigate("/loan/details");
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-600 text-lg font-extrabold text-white">DK</div>
            <div className="min-w-0 leading-tight">
              <h1 className="truncate text-lg font-extrabold text-slate-900">Digital Kidu Bank</h1>
              <p className="text-xs font-medium text-slate-500">Loan Application Portal</p>
            </div>
          </div>
          <div className="shrink-0 text-right text-xs text-slate-400">
            <div>{formattedDate}</div>
            <div className="font-bold text-slate-700">{formattedTime}</div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-5 py-6 sm:px-8 sm:py-8">
        <section className="flex items-center gap-4 rounded-[20px] bg-emerald-700 px-5 py-5 text-white shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 ring-8 ring-emerald-600/50">
            <Check size={25} strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold leading-tight">Application Received</h2>
            <p className="mt-1 text-sm font-semibold text-emerald-50">Your loan request is under review</p>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-extrabold tracking-wide text-slate-500">APPLICATION SUMMARY</h2>
            <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">UNDER REVIEW</span>
          </div>
          <SummaryRow label="Reference No." value={referenceNumber} />
          <SummaryRow label="Applicant Name" value={fullName || "Not provided"} />
          <SummaryRow label="Submitted" value={`${formattedDate}, ${formattedTime}`} />
          <SummaryRow label="Status" value="Verification Complete" last />
        </section>

        <section className="mt-5 rounded-[20px] bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-extrabold tracking-wide text-slate-500">WHAT HAPPENS NEXT</h2>
          <div className="mt-5">
            <TimelineItem icon={<Check size={15} strokeWidth={3} />} title="Application submitted" detail="All details received" complete />
            <TimelineItem icon={<ShieldCheck size={15} strokeWidth={3} />} title="Identity verification" detail="Documents checked" complete />
            <TimelineItem icon={<Clock3 size={15} />} title="Credit assessment" detail="In progress - 1-2 business days" />
            <TimelineItem icon={<FileCheck2 size={15} />} title="Loan offer sent to mobile" detail="You will be notified by SMS" last />
          </div>
        </section>

        <p className="px-4 py-5 text-center text-xs leading-relaxed text-slate-400">We will notify you once your application has been reviewed.</p>
        <button type="button" onClick={startOver} className="mx-auto block text-sm font-semibold text-cyan-700">Start over</button>
      </main>
    </div>
  );
}

function SummaryRow({ label, value, last = false }) {
  return (
    <div className={`flex items-center justify-between gap-4 px-5 py-4 ${last ? "" : "border-b border-slate-100"}`}>
      <span className="text-sm text-slate-400">{label}</span>
      <span className="max-w-[62%] break-words text-right text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

function TimelineItem({ icon, title, detail, complete = false, last = false }) {
  return (
    <div className="relative flex gap-4">
      {!last && <div className={`absolute left-[13px] top-7 h-[calc(100%-4px)] w-px ${complete ? "bg-emerald-600" : "bg-slate-200"}`} />}
      <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${complete ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-400 ring-1 ring-slate-200"}`}>{icon}</div>
      <div className="pb-5">
        <h3 className={`text-sm font-bold ${complete ? "text-emerald-700" : "text-slate-600"}`}>{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{detail}</p>
      </div>
    </div>
  );
}
