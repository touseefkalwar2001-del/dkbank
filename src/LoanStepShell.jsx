import React from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StepShell({ icon, title, subtitle, children }) {
  return (
    <div>
      <div className="flex items-start gap-3 px-4 pt-5 pb-4 border-b border-slate-100 sm:px-5">
        <div className="w-10 h-10 rounded-xl bg-[#edf7fc] flex items-center justify-center shrink-0">{icon}</div>
        <div>
          <h2 className="font-bold text-slate-800 text-base leading-tight">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-5">{children}</div>
    </div>
  );
}

export function Field({ label, icon, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-400 tracking-wide">{label}</label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[#dfe8f1] bg-[#f9fbfd] px-3.5 py-3">
        {icon}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>
    </div>
  );
}

export function StepNavigation({ backPath, nextPath, nextLabel, disabled, onNext, loading = false }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-4 mt-5 flex gap-2 sm:gap-3 sm:px-6">
        {backPath && (
          <button
            type="button"
            onClick={() => navigate(backPath)}
            aria-label="Go back"
            className="flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 font-semibold py-3.5 px-3 text-sm sm:px-4 sm:text-[15px]"
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={() => (onNext ? onNext() : navigate(nextPath))}
          disabled={disabled || loading}
          className="min-w-0 flex-1 flex items-center justify-center gap-1.5 rounded-[22px] bg-gradient-to-r from-[#075d8b] to-[#299ab3] text-white font-bold py-4 px-2 text-sm shadow-[0_12px_24px_rgba(20,126,159,0.22)] disabled:opacity-40 transition-opacity sm:gap-2 sm:text-[15px]"
        >
          {loading ? "Please wait..." : nextLabel}
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-3 pb-6">
        <ShieldCheck size={13} className="text-slate-400" />
        <span className="text-[11px] text-slate-400">Your data is encrypted and secure</span>
      </div>
    </>
  );
}
