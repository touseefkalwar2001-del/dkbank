// import React, { useState, useRef } from "react";
// import {
//   User,
//   Smartphone,
//   ShieldCheck,
//   ShieldAlert,
//   Zap,
//   Sparkles,
//   Check,
//   ArrowRight,
//   ArrowLeft,
//   IdCard,
//   KeyRound,
//   Bell,
// } from "lucide-react";

// const STEPS = ["Doc ID", "MPIN", "Details", "OTP"];
// const START_INDEX = 2; // flow opens directly on "Details"
// const DEMO_VALID_OTP = "123456"; // demo-only: this is the only code that passes

// export default function LoanApplicationScreen() {
//   const [stepIndex, setStepIndex] = useState(START_INDEX);

//   const [docId, setDocId] = useState("");
//   const [mpin, setMpin] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [agreed, setAgreed] = useState(true);
//   const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
//   const otpRefs = useRef([]);
//   const [otpError, setOtpError] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const otp = otpDigits.join("");

//   const stepValid = [
//     docId.trim().length >= 4,
//     mpin.length === 4,
//     Boolean(fullName.trim()) && Boolean(mobile.trim()) && agreed,
//     otp.length === 6,
//   ];

//   const goNext = () => {
//     if (!stepValid[stepIndex]) return;
//     if (stepIndex === STEPS.length - 1) {
//       setSubmitted(true);
//       return;
//     }
//     setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
//   };

//   const goBack = () => {
//     setOtpError(false);
//     setStepIndex((i) => Math.max(i - 1, START_INDEX));
//   };

//   const handleVerifyOtp = () => {
//     if (!stepValid[stepIndex]) return;
//     if (otp !== DEMO_VALID_OTP) {
//       setOtpError(true);
//       return;
//     }
//     setOtpError(false);
//     setSubmitted(true);
//   };

//   const handleOtpChange = (i, val) => {
//     const clean = val.replace(/\D/g, "").slice(-1);
//     const next = [...otpDigits];
//     next[i] = clean;
//     setOtpDigits(next);
//     if (otpError) setOtpError(false);
//     if (clean && i < 5) otpRefs.current[i + 1]?.focus();
//   };

//   const handleOtpKeyDown = (i, e) => {
//     if (e.key === "Backspace" && !otpDigits[i] && i > 0) {
//       otpRefs.current[i - 1]?.focus();
//     }
//   };

//   const isOtpStep = stepIndex === 3 && !submitted;

//   return (
//     <div className="min-h-screen w-full flex items-start justify-center bg-slate-100 py-6">
//       <div className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-xl bg-white">
//         {isOtpStep ? (
//           // ---- OTP hero screen ----
//           <>
//             <div className="relative h-72 overflow-hidden bg-gradient-to-br from-amber-800 via-amber-900 to-slate-900">
//               <div
//                 className="absolute inset-0 opacity-40"
//                 style={{
//                   backgroundImage:
//                     "radial-gradient(circle at 75% 60%, rgba(20,184,166,0.35), transparent 55%), radial-gradient(circle at 20% 20%, rgba(217,119,6,0.25), transparent 50%)",
//                 }}
//               />
//               <div
//                 className="absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 14px)",
//                 }}
//               />

//               <div className="relative flex items-center justify-between px-6 pt-6">
//                 <div className="flex items-center gap-2">
//                   <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-xs">
//                     DK
//                   </div>
//                   <span className="text-white text-sm font-semibold tracking-wide">
//                     Digital Kidu Bank
//                   </span>
//                 </div>
//                 <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
//                   <Bell size={15} className="text-white/80" />
//                 </div>
//               </div>

//               <div className="relative px-6 mt-8">
//                 <h1 className="text-white text-[28px] font-extrabold leading-tight">
//                   Kuzuzangpola
//                 </h1>
//                 <p className="mt-2 text-slate-200/80 text-sm max-w-[220px]">
//                   Simple and secure, your smart financial solution
//                 </p>
//               </div>

//               <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-teal-500/20 blur-2xl" />
//             </div>

//             <div className="relative -mt-6 rounded-t-3xl bg-white px-6 pt-6 pb-7">
//               <div className="mx-auto w-10 h-1 rounded-full bg-slate-200 mb-6" />

//               <div className="flex items-start gap-3">
//                 <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
//                   <Smartphone size={19} className="text-teal-600" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-slate-800 text-lg leading-tight">
//                     OTP verification
//                   </h2>
//                   <p className="text-sm text-slate-500 mt-1">
//                     Check your email or mobile number for the 6-digit code
//                   </p>
//                 </div>
//               </div>

//               <div className={"mt-6 flex justify-between gap-2" + (otpError ? " animate-[shake_0.4s]" : "")}>
//                 {otpDigits.map((d, i) => (
//                   <input
//                     key={i}
//                     ref={(el) => (otpRefs.current[i] = el)}
//                     value={d}
//                     onChange={(e) => handleOtpChange(i, e.target.value)}
//                     onKeyDown={(e) => handleOtpKeyDown(i, e)}
//                     inputMode="numeric"
//                     maxLength={1}
//                     className={
//                       "w-11 h-14 rounded-xl border-2 text-center text-xl font-bold text-slate-800 outline-none transition-colors " +
//                       (otpError
//                         ? "border-red-400 bg-red-50/60"
//                         : d
//                         ? "border-teal-500 bg-teal-50/50"
//                         : "border-slate-200 bg-slate-50/60 focus:border-teal-400")
//                     }
//                   />
//                 ))}
//               </div>

//               {otpError && (
//                 <p className="mt-2.5 text-[13px] font-medium text-red-500">
//                   Invalid OTP. Please check the code and try again.
//                 </p>
//               )}

//               <div className="mt-6 flex gap-3">
//                 <button
//                   onClick={goBack}
//                   className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200 text-slate-500 font-semibold py-4 px-4 text-[15px]"
//                 >
//                   <ArrowLeft size={16} />
//                 </button>
//                 <button
//                   onClick={handleVerifyOtp}
//                   disabled={!stepValid[stepIndex]}
//                   className="flex-1 rounded-full bg-gradient-to-r from-slate-900 to-teal-600 text-white font-semibold py-4 text-[15px] disabled:opacity-40 transition-opacity"
//                 >
//                   Verify OTP
//                 </button>
//               </div>

//               <div className="flex items-center justify-center gap-1.5 mt-4">
//                 <ShieldAlert size={13} className="text-amber-500" />
//                 <span className="text-[11px] text-slate-400">
//                   Never share this OTP with anyone, including bank staff.
//                 </span>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             {/* Header */}
//             <div className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-teal-700 px-6 pt-7 pb-16 overflow-hidden">
//               <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full border border-white/10" />
//               <div className="absolute top-10 right-[-40px] w-40 h-40 rounded-full border border-white/10" />

//               <div className="relative flex items-center gap-3">
//                 <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm">
//                   DK
//                 </div>
//                 <span className="text-slate-200 text-xs font-semibold tracking-wide">
//                   Digital Kidu Bank
//                 </span>
//               </div>

//               <div className="relative mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-amber-300/40 px-3 py-1">
//                 <Sparkles size={12} className="text-amber-300" />
//                 <span className="text-[11px] font-semibold text-amber-300 tracking-wide">
//                   New feature
//                 </span>
//               </div>

//               <div className="relative mt-3 flex items-center gap-2">
//                 <Zap className="text-amber-300 fill-amber-300" size={26} />
//                 <h1 className="text-white text-[26px] font-extrabold leading-none">
//                   Instant Loan
//                 </h1>
//               </div>
//               <p className="relative mt-2 text-slate-300 text-sm">
//                 Apply in 2 minutes, get approved fast
//               </p>

//               {/* Stepper */}
//               <div className="relative mt-6 flex items-center">
//                 {STEPS.map((label, i) => {
//                   const state =
//                     i < stepIndex ? "done" : i === stepIndex ? "active" : "upcoming";
//                   return (
//                     <div key={label} className="flex items-center flex-1 last:flex-none">
//                       <button
//                         onClick={() => i < stepIndex && i >= START_INDEX && setStepIndex(i)}
//                         className="flex flex-col items-center gap-1.5"
//                       >
//                         <div
//                           className={
//                             "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors " +
//                             (state === "done"
//                               ? "bg-white text-teal-700"
//                               : state === "active"
//                               ? "bg-amber-400 text-white"
//                               : "bg-white/15 text-white/50")
//                           }
//                         >
//                           {state === "done" ? <Check size={14} /> : i + 1}
//                         </div>
//                         <span
//                           className={
//                             "text-[10px] font-medium whitespace-nowrap " +
//                             (state === "active" ? "text-amber-300" : "text-slate-300/80")
//                           }
//                         >
//                           {label}
//                         </span>
//                       </button>
//                       {i < STEPS.length - 1 && (
//                         <div
//                           className={
//                             "flex-1 h-px mx-1 -translate-y-2.5 transition-colors " +
//                             (i < stepIndex ? "bg-amber-300/70" : "bg-white/20")
//                           }
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Card */}
//             {!submitted ? (
//               <>
//                 <div className="relative -mt-9 mx-4 rounded-2xl bg-white shadow-lg border border-slate-100">
//                   {stepIndex === 0 && (
//                     <StepShell
//                       icon={<IdCard size={18} className="text-teal-600" />}
//                       title="Document ID"
//                       subtitle="Enter your CNIC / national ID number"
//                     >
//                       <Field
//                         label="CNIC number"
//                         icon={<IdCard size={16} className="text-slate-400 shrink-0" />}
//                         value={docId}
//                         onChange={setDocId}
//                         placeholder="e.g. 42101-XXXXXXX-X"
//                       />
//                     </StepShell>
//                   )}

//                   {stepIndex === 1 && (
//                     <StepShell
//                       icon={<KeyRound size={18} className="text-teal-600" />}
//                       title="Set MPIN"
//                       subtitle="Demo only — choose any 4-digit PIN for this preview"
//                     >
//                       <label className="text-[11px] font-semibold text-slate-400 tracking-wide">
//                         4-digit MPIN
//                       </label>
//                       <div className="mt-1.5 flex gap-2.5">
//                         {[0, 1, 2, 3].map((i) => (
//                           <div
//                             key={i}
//                             className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-center text-lg font-bold text-slate-700"
//                           >
//                             {mpin[i] ? "•" : ""}
//                           </div>
//                         ))}
//                       </div>
//                       <input
//                         autoFocus
//                         inputMode="numeric"
//                         value={mpin}
//                         onChange={(e) =>
//                           setMpin(e.target.value.replace(/\D/g, "").slice(0, 4))
//                         }
//                         className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm text-slate-700 outline-none tracking-[0.5em]"
//                         placeholder="Type PIN here"
//                       />
//                     </StepShell>
//                   )}

//                   {stepIndex === 2 && (
//                     <StepShell
//                       icon={<User size={18} className="text-teal-600" />}
//                       title="Personal information"
//                       subtitle="As per your official documents"
//                     >
//                       <div className="space-y-4">
//                         <Field
//                           label="Full name"
//                           icon={<User size={16} className="text-slate-400 shrink-0" />}
//                           value={fullName}
//                           onChange={setFullName}
//                           placeholder="As per your documents"
//                         />
//                         <Field
//                           label="Mobile number"
//                           icon={<Smartphone size={16} className="text-slate-400 shrink-0" />}
//                           value={mobile}
//                           onChange={setMobile}
//                           placeholder="e.g. 17XXXXXX"
//                         />
//                       </div>
//                     </StepShell>
//                   )}
//                 </div>

//                 {/* Consent — only shown on Details step */}
//                 {stepIndex === 2 && (
//                   <div className="px-6 mt-4 flex items-start gap-2.5">
//                     <button
//                       onClick={() => setAgreed((a) => !a)}
//                       className={
//                         "mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors " +
//                         (agreed ? "bg-teal-600 border-teal-600" : "border-slate-300 bg-white")
//                       }
//                       aria-pressed={agreed}
//                       aria-label="Agree to terms and conditions"
//                     >
//                       {agreed && <Check size={13} className="text-white" strokeWidth={3} />}
//                     </button>
//                     <p className="text-[13px] text-slate-500 leading-snug">
//                       I agree to the{" "}
//                       <span className="text-teal-700 font-semibold">Terms &amp; conditions</span>{" "}
//                       and <span className="text-teal-700 font-semibold">privacy policy</span> of
//                       Digital Kidu Bank.
//                     </p>
//                   </div>
//                 )}

//                 {/* Nav buttons */}
//                 <div className="px-6 mt-5 flex gap-3">
//                   {stepIndex > START_INDEX && (
//                     <button
//                       onClick={goBack}
//                       className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-slate-500 font-semibold py-3.5 px-4 text-[15px]"
//                     >
//                       <ArrowLeft size={16} />
//                     </button>
//                   )}
//                   <button
//                     onClick={goNext}
//                     disabled={!stepValid[stepIndex]}
//                     className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 to-teal-600 text-white font-semibold py-3.5 text-[15px] disabled:opacity-40 transition-opacity"
//                   >
//                     Continue to {STEPS[stepIndex + 1]}
//                     <ArrowRight size={17} />
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-center gap-1.5 mt-3 pb-6">
//                   <ShieldCheck size={13} className="text-slate-400" />
//                   <span className="text-[11px] text-slate-400">
//                     Your data is encrypted and secure
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <div className="px-6 py-14 flex flex-col items-center text-center">
//                 <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
//                   <Check size={28} className="text-teal-600" strokeWidth={3} />
//                 </div>
//                 <h2 className="font-bold text-slate-800 text-lg">Application submitted</h2>
//                 <p className="text-sm text-slate-400 mt-1.5 max-w-[220px]">
//                   This is a UI preview — no data was sent anywhere.
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSubmitted(false);
//                     setStepIndex(START_INDEX);
//                     setDocId("");
//                     setMpin("");
//                     setFullName("");
//                     setMobile("");
//                     setOtpDigits(["", "", "", "", "", ""]);
//                     setOtpError(false);
//                   }}
//                   className="mt-6 text-sm font-semibold text-teal-700"
//                 >
//                   Start over
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function StepShell({ icon, title, subtitle, children }) {
//   return (
//     <div>
//       <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-slate-100">
//         <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
//           {icon}
//         </div>
//         <div>
//           <h2 className="font-bold text-slate-800 text-base leading-tight">{title}</h2>
//           <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
//         </div>
//       </div>
//       <div className="px-5 py-4">{children}</div>
//     </div>
//   );
// }

// function Field({ label, icon, value, onChange, placeholder }) {
//   return (
//     <div>
//       <label className="text-[11px] font-semibold text-slate-400 tracking-wide">
//         {label}
//       </label>
//       <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3">
//         {icon}
//         <input
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder}
//           className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
//         />
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef } from "react";
import {
  User,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  IdCard,
  KeyRound,
  Bell,
} from "lucide-react";

const STEPS = ["Doc ID", "MPIN", "Details", "OTP"];
const START_INDEX = 2; // flow opens directly on "Details"
const DEMO_VALID_OTP = "123456"; // demo-only: this is the only code that passes

export default function LoanApplicationScreen() {
  const [stepIndex, setStepIndex] = useState(START_INDEX);

  const [docId, setDocId] = useState("");
  const [mpin, setMpin] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [otpError, setOtpError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const otp = otpDigits.join("");

  const stepValid = [
    docId.trim().length >= 4,
    mpin.length === 4,
    Boolean(fullName.trim()) && Boolean(mobile.trim()) && agreed,
    otp.length === 6,
  ];

  const goNext = () => {
    if (!stepValid[stepIndex]) return;
    if (stepIndex === STEPS.length - 1) {
      setSubmitted(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setOtpError(false);
    setStepIndex((i) => Math.max(i - 1, START_INDEX));
  };

  const handleVerifyOtp = () => {
    if (!stepValid[stepIndex]) return;
    if (otp !== DEMO_VALID_OTP) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setSubmitted(true);
  };

  const handleOtpChange = (i, val) => {
    const clean = val.replace(/\D/g, "").slice(-1);
    const next = [...otpDigits];
    next[i] = clean;
    setOtpDigits(next);
    if (otpError) setOtpError(false);
    if (clean && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otpDigits[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const isOtpStep = stepIndex === 3 && !submitted;

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-slate-100 py-6">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-xl bg-white">
        {isOtpStep ? (
          // ---- OTP hero screen ----
          <>
            <div className="relative h-72 overflow-hidden bg-gradient-to-br from-amber-800 via-amber-900 to-slate-900">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 75% 60%, rgba(20,184,166,0.35), transparent 55%), radial-gradient(circle at 20% 20%, rgba(217,119,6,0.25), transparent 50%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 14px)",
                }}
              />

              <div className="relative flex items-center justify-between px-6 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-xs">
                    DK
                  </div>
                  <span className="text-white text-sm font-semibold tracking-wide">
                    Digital Kidu Bank
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Bell size={15} className="text-white/80" />
                </div>
              </div>

              <div className="relative px-6 mt-8">
                <h1 className="text-white text-[28px] font-extrabold leading-tight">
                  Kuzuzangpola
                </h1>
                <p className="mt-2 text-slate-200/80 text-sm max-w-[220px]">
                  Simple and secure, your smart financial solution
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-teal-500/20 blur-2xl" />
            </div>

            <div className="relative -mt-6 rounded-t-3xl bg-white px-6 pt-6 pb-7">
              <div className="mx-auto w-10 h-1 rounded-full bg-slate-200 mb-6" />

              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Smartphone size={19} className="text-teal-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg leading-tight">
                    OTP verification
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Check your email or mobile number for the 6-digit code
                  </p>
                </div>
              </div>

              <div className={"mt-6 flex justify-between gap-2" + (otpError ? " animate-[shake_0.4s]" : "")}>
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    className={
                      "w-11 h-14 rounded-xl border-2 text-center text-xl font-bold text-slate-800 outline-none transition-colors " +
                      (otpError
                        ? "border-red-400 bg-red-50/60"
                        : d
                        ? "border-teal-500 bg-teal-50/50"
                        : "border-slate-200 bg-slate-50/60 focus:border-teal-400")
                    }
                  />
                ))}
              </div>

              {otpError && (
                <p className="mt-2.5 text-[13px] font-medium text-red-500">
                  Invalid OTP. Please check the code and try again.
                </p>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={goBack}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200 text-slate-500 font-semibold py-4 px-4 text-[15px]"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleVerifyOtp}
                  disabled={!stepValid[stepIndex]}
                  className="flex-1 rounded-full bg-gradient-to-r from-slate-900 to-teal-600 text-white font-semibold py-4 text-[15px] disabled:opacity-40 transition-opacity"
                >
                  Verify OTP
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-4">
                <ShieldAlert size={13} className="text-amber-500" />
                <span className="text-[11px] text-slate-400">
                  Never share this OTP with anyone, including bank staff.
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-teal-700 px-6 pt-7 pb-16 overflow-hidden">
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
                <span className="text-[11px] font-semibold text-amber-300 tracking-wide">
                  New feature
                </span>
              </div>

              <div className="relative mt-3 flex items-center gap-2">
                <Zap className="text-amber-300 fill-amber-300" size={26} />
                <h1 className="text-white text-[26px] font-extrabold leading-none">
                  Instant Loan
                </h1>
              </div>
              <p className="relative mt-2 text-slate-300 text-sm">
                Apply in 2 minutes, get approved fast
              </p>

              {/* Stepper */}
              <div className="relative mt-6 flex items-center">
                {STEPS.map((label, i) => {
                  const state =
                    i < stepIndex ? "done" : i === stepIndex ? "active" : "upcoming";
                  return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <button
                        onClick={() => i < stepIndex && i >= START_INDEX && setStepIndex(i)}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div
                          className={
                            "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors " +
                            (state === "done"
                              ? "bg-white text-teal-700"
                              : state === "active"
                              ? "bg-amber-400 text-white"
                              : "bg-white/15 text-white/50")
                          }
                        >
                          {state === "done" ? <Check size={14} /> : i + 1}
                        </div>
                        <span
                          className={
                            "text-[10px] font-medium whitespace-nowrap " +
                            (state === "active" ? "text-amber-300" : "text-slate-300/80")
                          }
                        >
                          {label}
                        </span>
                      </button>
                      {i < STEPS.length - 1 && (
                        <div
                          className={
                            "flex-1 h-px mx-1 -translate-y-2.5 transition-colors " +
                            (i < stepIndex ? "bg-amber-300/70" : "bg-white/20")
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card */}
            {!submitted ? (
              <>
                <div className="relative -mt-9 mx-4 rounded-2xl bg-white shadow-lg border border-slate-100">
                  {stepIndex === 0 && (
                    <StepShell
                      icon={<IdCard size={18} className="text-teal-600" />}
                      title="Document ID"
                      subtitle="Enter your CNIC / national ID number"
                    >
                      <Field
                        label="CNIC number"
                        icon={<IdCard size={16} className="text-slate-400 shrink-0" />}
                        value={docId}
                        onChange={setDocId}
                        placeholder="e.g. 42101-XXXXXXX-X"
                      />
                    </StepShell>
                  )}

                  {stepIndex === 1 && (
                    <StepShell
                      icon={<KeyRound size={18} className="text-teal-600" />}
                      title="Set MPIN"
                      subtitle="Demo only — choose any 4-digit PIN for this preview"
                    >
                      <label className="text-[11px] font-semibold text-slate-400 tracking-wide">
                        4-digit MPIN
                      </label>
                      <div className="mt-1.5 flex gap-2.5">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-center text-lg font-bold text-slate-700"
                          >
                            {mpin[i] ? "•" : ""}
                          </div>
                        ))}
                      </div>
                      <input
                        autoFocus
                        inputMode="numeric"
                        value={mpin}
                        onChange={(e) =>
                          setMpin(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm text-slate-700 outline-none tracking-[0.5em]"
                        placeholder="Type PIN here"
                      />
                    </StepShell>
                  )}

                  {stepIndex === 2 && (
                    <StepShell
                      icon={<User size={18} className="text-teal-600" />}
                      title="Personal information"
                      subtitle="As per your official documents"
                    >
                      <div className="space-y-4">
                        <Field
                          label="Full name"
                          icon={<User size={16} className="text-slate-400 shrink-0" />}
                          value={fullName}
                          onChange={setFullName}
                          placeholder="As per your documents"
                        />
                        <Field
                          label="Mobile number"
                          icon={<Smartphone size={16} className="text-slate-400 shrink-0" />}
                          value={mobile}
                          onChange={setMobile}
                          placeholder="e.g. 17XXXXXX"
                        />
                      </div>
                    </StepShell>
                  )}
                </div>

                {/* Consent — only shown on Details step */}
                {stepIndex === 2 && (
                  <div className="px-6 mt-4 flex items-start gap-2.5">
                    <button
                      onClick={() => setAgreed((a) => !a)}
                      className={
                        "mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors " +
                        (agreed ? "bg-teal-600 border-teal-600" : "border-slate-300 bg-white")
                      }
                      aria-pressed={agreed}
                      aria-label="Agree to terms and conditions"
                    >
                      {agreed && <Check size={13} className="text-white" strokeWidth={3} />}
                    </button>
                    <p className="text-[13px] text-slate-500 leading-snug">
                      I agree to the{" "}
                      <span className="text-teal-700 font-semibold">Terms &amp; conditions</span>{" "}
                      and <span className="text-teal-700 font-semibold">privacy policy</span> of
                      Digital Kidu Bank.
                    </p>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="px-6 mt-5 flex gap-3">
                  {stepIndex > START_INDEX && (
                    <button
                      onClick={goBack}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-slate-500 font-semibold py-3.5 px-4 text-[15px]"
                    >
                      <ArrowLeft size={16} />
                    </button>
                  )}
                  <button
                    onClick={goNext}
                    disabled={!stepValid[stepIndex]}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 to-teal-600 text-white font-semibold py-3.5 text-[15px] disabled:opacity-40 transition-opacity"
                  >
                    Continue to {STEPS[stepIndex + 1]}
                    <ArrowRight size={17} />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-3 pb-6">
                  <ShieldCheck size={13} className="text-slate-400" />
                  <span className="text-[11px] text-slate-400">
                    Your data is encrypted and secure
                  </span>
                </div>
              </>
            ) : (
              <div className="px-6 py-14 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                  <Check size={28} className="text-teal-600" strokeWidth={3} />
                </div>
                <h2 className="font-bold text-slate-800 text-lg">Application submitted</h2>
                <p className="text-sm text-slate-400 mt-1.5 max-w-[220px]">
                  This is a UI preview — no data was sent anywhere.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStepIndex(START_INDEX);
                    setDocId("");
                    setMpin("");
                    setFullName("");
                    setMobile("");
                    setOtpDigits(["", "", "", "", "", ""]);
                    setOtpError(false);
                  }}
                  className="mt-6 text-sm font-semibold text-teal-700"
                >
                  Start over
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StepShell({ icon, title, subtitle, children }) {
  return (
    <div>
      <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-base leading-tight">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Field({ label, icon, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-400 tracking-wide">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3">
        {icon}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>
    </div>
  );
}