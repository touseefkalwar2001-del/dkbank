import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Check, Sparkles, Zap } from "lucide-react";

const STEPS = [
  { label: "Doc ID", path: "/loan/doc-id" },
  { label: "MPIN", path: "/loan/mpin" },
  { label: "Details", path: "/loan/details" },
  { label: "OTP", path: "/loan/otp" },
];

export default function LoanApplicationScreen() {
  return <LoanLayout />;
}

function LoanLayout() {
  const location = useLocation();
  if (location.pathname === "/loan/success") {
    return <Outlet />;
  }
  const stepIndex = STEPS.findIndex((step) => location.pathname === step.path);
  const currentStep = stepIndex === -1 ? 0 : stepIndex;

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-[#196EA6] sm:flex sm:items-start sm:justify-center sm:py-6">
      <div className="relative w-full max-w-sm overflow-hidden bg-white shadow-xl sm:rounded-3xl">
        <div className="relative bg-gradient-to-br from-[#075b88] via-[#137aa4] to-[#2a98b1] px-4 pt-6 pb-14 overflow-hidden sm:px-6 sm:pt-7 sm:pb-16">
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full border border-white/10" />
          <div className="absolute top-10 right-[-40px] w-40 h-40 rounded-full border border-white/10" />

          <div className="relative flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm">
              DK
            </div>
            <span className="text-slate-200 text-xs font-semibold tracking-wide">
              Digital Kidu Bank
            </span>
          </div>

          <div className="relative mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-amber-300/40 px-3 py-1">
            <Sparkles size={12} className="text-amber-300" />
            <span className="text-[11px] font-semibold text-amber-300 tracking-wide">New feature</span>
          </div>

          <div className="relative mt-3 flex items-center gap-2">
            <Zap className="text-amber-300 fill-amber-300" size={26} />
            <h1 className="text-white text-2xl font-extrabold leading-none sm:text-[26px]">Instant Loan</h1>
          </div>
          <p className="relative mt-2 text-slate-300 text-sm">Apply in 2 minutes, get approved fast</p>

          <div className="relative mt-6 flex items-center">
            {STEPS.map((step, index) => {
              const state = index < currentStep ? "done" : index === currentStep ? "active" : "upcoming";
              return (
                <div key={step.path} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={
                        "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 " +
                        (state === "done"
                          ? "bg-white text-teal-700"
                          : state === "active"
                          ? "bg-amber-400 text-white"
                          : "bg-white/15 text-white/50")
                      }
                    >
                      {state === "done" ? <Check size={14} /> : index + 1}
                    </div>
                    <span
                      className={
                        "text-[10px] font-medium whitespace-nowrap " +
                        (state === "active" ? "text-amber-300" : "text-slate-300/80")
                      }
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={
                        "flex-1 h-px mx-1 -translate-y-2.5 " +
                        (index < currentStep ? "bg-amber-300/70" : "bg-white/20")
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative -mt-8 mx-2 rounded-2xl bg-white shadow-lg border border-slate-100 sm:-mt-9 sm:mx-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
