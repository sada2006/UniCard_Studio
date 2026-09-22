import React, { useState, useRef, useEffect } from 'react';

// ==========================================
// 1. CAMPUS ROLES & AUTHORITY CONFIGURATION
// ==========================================
const CAMPUS_ROLES = [
  {
    id: 'student',
    label: 'Student',
    badgeTitle: 'STUDENT PASS',
    authorityTitle: 'Registrar',
    authorityName: 'E. Vance',
    idPrefix: '24CS',
    pillBg: '#e0f2fe',
    pillText: '#0369a1'
  },
  {
    id: 'faculty',
    label: 'Faculty / Professor',
    badgeTitle: 'FACULTY CREDENTIAL',
    authorityTitle: 'Vice-Chancellor',
    authorityName: 'Prof. A. Hawthorne',
    idPrefix: 'FAC',
    pillBg: '#fee2e2',
    pillText: '#991b1b'
  },
  {
    id: 'scholar',
    label: 'Research Scholar (Ph.D.)',
    badgeTitle: 'DOCTORAL FELLOW',
    authorityTitle: 'Dean of Research',
    authorityName: 'Dr. Evelyn Reed',
    idPrefix: 'PHD',
    pillBg: '#d1fae5',
    pillText: '#065f46'
  },
  {
    id: 'trainee',
    label: 'Research Intern / Trainee',
    badgeTitle: 'RESEARCH INTERN',
    authorityTitle: 'Lab Director',
    authorityName: 'M. Sterling',
    idPrefix: 'INT',
    pillBg: '#fef3c7',
    pillText: '#92400e'
  },
  {
    id: 'staff',
    label: 'Administrative Staff',
    badgeTitle: 'CAMPUS OPERATIONS',
    authorityTitle: 'Head of Operations',
    authorityName: 'R. K. Sharma',
    idPrefix: 'ADM',
    pillBg: '#f1f5f9',
    pillText: '#334155'
  }
];

// Academic Department Theme Palettes
const DEPARTMENT_THEMES = [
  {
    id: 'cse',
    name: 'CSE (Sapphire & Azure)',
    shortName: 'CSE',
    dept: 'Computer Science & Engineering',
    primary: '#1e3a8a',
    secondary: '#0284c7',
    accent: '#38bdf8',
    pillBg: '#e0f2fe',
    pillText: '#0369a1',
    badge: 'CSE MATRIX'
  },
  {
    id: 'aids',
    name: 'AI & DS (Indigo & Violet)',
    shortName: 'AI & DS',
    dept: 'Artificial Intelligence & Data Science',
    primary: '#312e81',
    secondary: '#7c3aed',
    accent: '#a78bfa',
    pillBg: '#ede9fe',
    pillText: '#5b21b6',
    badge: 'NEURAL LABS'
  },
  {
    id: 'ece',
    name: 'ECE (Teal & Cyan)',
    shortName: 'ECE',
    dept: 'Electronics & Communication',
    primary: '#134e4a',
    secondary: '#0d9488',
    accent: '#2dd4bf',
    pillBg: '#ccfbf1',
    pillText: '#0f766e',
    badge: 'CIRCUIT VLSI'
  },
  {
    id: 'mech',
    name: 'Mechanical (Titanium & Ember)',
    shortName: 'Mechanical',
    dept: 'Mechanical & Robotics Engg.',
    primary: '#292524',
    secondary: '#ea580c',
    accent: '#fb923c',
    pillBg: '#ffedd5',
    pillText: '#c2410c',
    badge: 'KINETIC LAB'
  },
  {
    id: 'civil',
    name: 'Civil (Bronze & Terracotta)',
    shortName: 'Civil',
    dept: 'Civil & Architectural Engineering',
    primary: '#78350f',
    secondary: '#b45309',
    accent: '#f59e0b',
    pillBg: '#fef3c7',
    pillText: '#92400e',
    badge: 'STRUCTURAL'
  },
  {
    id: 'biotech',
    name: 'BioTech (Forest & Mint)',
    shortName: 'BioTech',
    dept: 'Biotechnology & Biomedical',
    primary: '#064e3b',
    secondary: '#059669',
    accent: '#34d399',
    pillBg: '#d1fae5',
    pillText: '#047857',
    badge: 'GENOMICS LAB'
  }
];

const SPECTRUM_SWATCHES = [
  '#1e3a8a', '#2563eb', '#0284c7', '#0d9488', '#059669', 
  '#15803d', '#65a30d', '#b45309', '#ea580c', '#e11d48', 
  '#be123c', '#7c3aed', '#4f46e5', '#334155', '#0f172a'
];

// Sample Cohort for Batch Mode
const SAMPLE_BATCH_STUDENTS = [
  {
    collegeName: 'Apex Institute of Technology',
    tagline: 'Excellence in Innovation & Research',
    fullName: 'Aditya Sharma',
    rollNo: '24CS-1089',
    role: 'student',
    course: 'B.Tech - Computer Science',
    department: 'Dept. of Computing & Intelligence',
    bloodGroup: 'B+',
    validTill: '2028-06-30',
    phone: '+1 (555) 349-2810',
    address: '42 University Boulevard, Campus Hall B',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    themeId: 'cse'
  },
  {
    collegeName: 'Apex Institute of Technology',
    tagline: 'Excellence in Innovation & Research',
    fullName: 'Dr. Rajesh Kulkarni',
    rollNo: 'FAC-9012',
    role: 'faculty',
    course: 'Senior Professor of Computing',
    department: 'Artificial Intelligence & Data Science',
    bloodGroup: 'O+',
    validTill: '2030-12-31',
    phone: '+1 (555) 234-5678',
    address: 'Staff Enclave, Suite 402',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    themeId: 'aids'
  },
  {
    collegeName: 'Apex Institute of Technology',
    tagline: 'Excellence in Innovation & Research',
    fullName: 'Sarah Jenkins',
    rollNo: 'PHD-4050',
    role: 'scholar',
    course: 'Post-Doctoral Fellow (Genomics)',
    department: 'Center for Bio-Innovation',
    bloodGroup: 'A-',
    validTill: '2027-06-30',
    phone: '+1 (555) 901-2345',
    address: 'Research Annex, Lab 12B',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    themeId: 'biotech'
  },
  {
    collegeName: 'Apex Institute of Technology',
    tagline: 'Excellence in Innovation & Research',
    fullName: 'Vikramaditya Rao',
    rollNo: 'INT-1102',
    role: 'trainee',
    course: 'Robotics Summer Intern',
    department: 'Mechanical & Robotics Engg.',
    bloodGroup: 'AB+',
    validTill: '2026-12-31',
    phone: '+1 (555) 345-6789',
    address: 'Westgate Residential Hall 3',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    themeId: 'mech'
  }
];

// Helper: Format valid dates cleanly without awkward hyphenation
const formatValidDate = (dateStr) => {
  if (!dateStr) return 'JUN 2028';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    const month = months[parseInt(parts[1], 10) - 1] || parts[1];
    return `${month} ${parts[0]}`;
  }
  return dateStr;
};

// Web Audio API Synthesizer for Metro Turnstile Beeper
const playMetroBeep = (type = 'success') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    }
  } catch (e) {
    console.log('Audio disabled by browser', e);
  }
};

// Simple visual image hasher for active face deduplication
const computeSimpleImageHash = (str) => {
  let hash = 0;
  for (let i = 0; i < Math.min(str.length, 500); i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase();
};

// ==========================================
// 2. VECTOR ICONS & GRAPHICS
// ==========================================
const Icons = {
  AcademicCap: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Print: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Shuffle: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Palette: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4 11.956 11.956 0 011.758-6.155A12.012 12.012 0 0112 3a12.012 12.012 0 017.242 7.845A11.956 11.956 0 0121 17a4 4 0 01-4 4h-1.5a2.5 2.5 0 01-2.5-2.5 1 1 0 00-1-1h-1a1 1 0 00-1 1A2.5 2.5 0 017.5 21H7z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
  ),
  Check: () => (
    <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  NfcWave: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
};

const UniversitySeal = ({ color = '#ffffff', opacity = 0.95 }) => (
  <svg viewBox="0 0 100 100" className="w-9 h-9 shrink-0" style={{ opacity }}>
    <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M50 20 L58 35 L75 38 L62 50 L65 67 L50 59 L35 67 L38 50 L25 38 L42 35 Z" fill={color} opacity="0.85" />
    <circle cx="50" cy="50" r="8" fill={color} />
  </svg>
);

const SmartRFIDChip = () => (
  <div className="relative w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-500/80 shadow-xs overflow-hidden flex items-center justify-center shrink-0">
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
    <div className="w-full h-px bg-amber-800/50 absolute top-1.5" />
    <div className="w-full h-px bg-amber-800/50 absolute bottom-1.5" />
    <div className="h-full w-px bg-amber-800/50 absolute left-2" />
    <div className="h-full w-px bg-amber-800/50 absolute right-2" />
    <div className="w-3 h-2.5 border border-amber-800/60 rounded-xs bg-amber-300/60 z-10 flex items-center justify-center">
      <div className="w-1.5 h-1 bg-amber-600/60 rounded-full" />
    </div>
  </div>
);

const HolographicSeal = ({ tilt }) => {
  const gradientAngle = 135 + (tilt?.x || 0) * 4 + (tilt?.y || 0) * 4;
  return (
    <div 
      className="relative w-7 h-7 rounded-full p-0.5 shadow-xs border border-white/60 flex items-center justify-center overflow-hidden shrink-0 transition-all duration-75"
      style={{
        background: `linear-gradient(${gradientAngle}deg, rgba(254,240,138,0.9), rgba(244,114,182,0.85), rgba(56,189,248,0.85), rgba(52,211,153,0.85))`
      }}
    >
      <div className="w-full h-full rounded-full border border-amber-900/30 flex items-center justify-center bg-white/20 backdrop-blur-[0.5px]">
        <span className="text-[6px] font-black tracking-tighter text-stone-900 uppercase text-center leading-none">
          SECURE
        </span>
      </div>
    </div>
  );
};

const BarcodeSvg = ({ code = 'STU-2024-8849', widthClass = 'w-24' }) => (
  <div className="flex flex-col items-center">
    <svg className={`${widthClass} h-6`} viewBox="0 0 200 32" preserveAspectRatio="none">
      <rect x="0" y="0" width="200" height="32" fill="transparent" />
      {[...Array(44)].map((_, i) => {
        const width = (i * 11) % 5 === 0 ? 3.5 : (i * 7) % 3 === 0 ? 2 : 1.2;
        const x = i * 4.4 + 3;
        return <rect key={i} x={x} y="0" width={width} height="28" fill="#1e293b" />;
      })}
    </svg>
    <span className="text-[7.5px] font-mono tracking-widest text-stone-600 uppercase font-bold mt-0.5">
      *{code}*
    </span>
  </div>
);

const DynamicQRCodeSvg = ({ value = 'STU-24CS-1089' }) => {
  const seed = (value || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (
    <svg className="w-12 h-12 bg-white p-1 rounded-md border border-stone-200 shadow-2xs" viewBox="0 0 29 29">
      <rect x="2" y="2" width="7" height="7" fill="#0f172a" />
      <rect x="3" y="3" width="5" height="5" fill="#ffffff" />
      <rect x="4" y="4" width="3" height="3" fill="#0f172a" />
      <rect x="20" y="2" width="7" height="7" fill="#0f172a" />
      <rect x="21" y="3" width="5" height="5" fill="#ffffff" />
      <rect x="22" y="4" width="3" height="3" fill="#0f172a" />
      <rect x="2" y="20" width="7" height="7" fill="#0f172a" />
      <rect x="3" y="21" width="5" height="5" fill="#ffffff" />
      <rect x="4" y="22" width="3" height="3" fill="#0f172a" />
      <rect x="11" y="3" width="2" height="2" fill="#0f172a" />
      <rect x="15" y="3" width="3" height="1.5" fill="#0f172a" />
      <rect x="11" y="7" width="1.5" height="4" fill="#0f172a" />
      <rect x="14" y="6" width="3" height="2" fill="#0f172a" />
      <rect x="11" y="13" width="3" height="3" fill="#0f172a" />
      <rect x="16" y="11" width="2" height="4" fill="#0f172a" />
      <rect x="6" y="11" width="3" height="2" fill="#0f172a" />
      <rect x="3" y="14" width="2" height="3" fill="#0f172a" />
      <rect x="20" y="11" width="2" height="2" fill="#0f172a" />
      <rect x="24" y="12" width="3" height="3" fill="#0f172a" />
      <rect x="11" y="18" width="4" height="2" fill="#0f172a" />
      <rect x="11" y="22" width="2" height="4" fill="#0f172a" />
      <rect x="15" y="20" width="4" height="2" fill="#0f172a" />
      <rect x="16" y="24" width="3" height="2.5" fill="#0f172a" />
      <rect x="21" y="17" width="2" height="5" fill="#0f172a" />
      <rect x="25" y="22" width="2" height="3" fill="#0f172a" />
      <rect x="24" y="18" width="3" height="2" fill="#0f172a" />
      {seed % 2 === 0 && <rect x="13" y="10" width="2" height="2" fill="#0f172a" />}
      {seed % 3 === 0 && <rect x="18" y="15" width="2" height="2" fill="#0f172a" />}
    </svg>
  );
};

const FormInput = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition"
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value || opt.id || opt} value={opt.value || opt.id || opt}>
          {opt.label || opt.name || opt}
        </option>
      ))}
    </select>
  </div>
);

// ==========================================
// 3. ID CARD FRONT & REVERSE RENDERERS
// ==========================================
const IDCardFront = ({ student, theme, roleConfig, isLandscape, tilt }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xl flex select-none transition-all duration-300 font-sans ${
        isLandscape ? 'w-[465px] h-[295px] flex-row' : 'w-[325px] h-[510px] flex-col'
      }`}
      style={{
        boxShadow: '0 16px 36px -12px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-rose-300 via-sky-300 to-emerald-300 z-20 opacity-90" />

      {isLandscape ? (
        <>
          {/* Landscape Sidebar (Width adjusted to w-32 to give ample room on right) */}
          <div
            className="w-32 p-3 flex flex-col justify-between items-center text-center text-white relative z-10 shrink-0"
            style={{ background: `linear-gradient(165deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}
          >
            <div className="flex flex-col items-center gap-1 mt-1">
              <UniversitySeal color="#ffffff" />
              <span className="text-[10px] font-black uppercase tracking-tight leading-tight mt-1 px-1">
                {student.collegeName || 'National University'}
              </span>
              <span className="text-[7.5px] text-white/70 tracking-wider">ESTD. 1894</span>
            </div>

            <div className="flex flex-col items-center gap-1 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[7.5px] font-black tracking-wider uppercase border border-white/20">
                {roleConfig.badgeTitle}
              </span>
              <span className="text-[8px] font-mono text-white/80">
                VAL: {formatValidDate(student.validTill)}
              </span>
            </div>
          </div>

          {/* Landscape Body */}
          <div className="relative flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-white to-stone-50/70 min-w-0">
            <div className="flex gap-2.5 h-full items-center">
              <div className="relative shrink-0">
                <img
                  src={student.photoUrl}
                  alt={student.fullName}
                  className="w-20 h-24 object-cover rounded-xl border-2 border-white shadow-sm bg-stone-100"
                />
                <div className="absolute -bottom-1.5 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[7.5px] font-bold uppercase tracking-wider shadow-2xs">
                  Active
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-[13.5px] font-black text-stone-900 leading-tight truncate">
                      {student.fullName || 'Name'}
                    </h4>
                    <span
                      className="inline-block mt-0.5 px-2 py-0.5 text-[8px] font-bold rounded-md truncate max-w-[155px]"
                      style={{ backgroundColor: roleConfig.pillBg, color: roleConfig.pillText }}
                    >
                      {student.course || 'Degree / Major'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <HolographicSeal tilt={tilt} />
                    <SmartRFIDChip />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 bg-white p-1.5 rounded-lg border border-stone-200 text-left text-[8px]">
                  <div>
                    <span className="text-stone-400 font-bold uppercase block text-[7px] tracking-wider">ID NO</span>
                    <span className="font-mono font-bold text-stone-800 truncate block text-[8px]">{student.rollNo || '24CS101'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold uppercase block text-[7px] tracking-wider">BLOOD</span>
                    <span className="font-bold text-rose-600 block text-[8px]">{student.bloodGroup || 'O+'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-bold uppercase block text-[7px] tracking-wider">EXPIRES</span>
                    <span className="font-bold text-stone-700 block text-[8px] truncate">{formatValidDate(student.validTill)}</span>
                  </div>
                </div>

                {/* Bottom row: Barcode + Authority block with zero right-clipping */}
                <div className="flex items-end justify-between pt-1 border-t border-stone-200 gap-2 pr-1">
                  <BarcodeSvg code={student.rollNo || '24CS101'} widthClass="w-24" />
                  <div className="text-right shrink-0 min-w-[75px] max-w-[125px]">
                    <div className="font-serif italic text-xs text-stone-800 font-bold leading-none truncate">
                      {roleConfig.authorityName}
                    </div>
                    <span className="text-[6.5px] uppercase tracking-tight text-stone-500 font-bold block mt-0.5 leading-tight truncate">
                      {roleConfig.authorityTitle}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Portrait Header */}
          <div
            className="px-4 pt-3 pb-2.5 text-white relative z-10"
            style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <UniversitySeal color="#ffffff" />
                <div className="min-w-0">
                  <h3 className="text-xs font-black uppercase tracking-tight leading-tight line-clamp-1">
                    {student.collegeName || 'Apex University'}
                  </h3>
                  <p className="text-[8px] text-white/80 font-medium tracking-wide truncate">
                    {student.tagline || 'Excellence in Research'}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/20 text-[7px] font-black uppercase tracking-widest border border-white/20 shrink-0">
                {roleConfig.badgeTitle}
              </span>
            </div>
          </div>

          {/* Portrait Body */}
          <div className="relative flex-1 p-3 flex flex-col justify-between bg-gradient-to-b from-white to-stone-50/70">
            <div className="flex items-start justify-between gap-2 mt-0.5">
              <div className="flex flex-col gap-1.5">
                <SmartRFIDChip />
                <div className="flex items-center gap-1 text-[8px] font-semibold text-stone-500">
                  <Icons.Shield />
                  <span>DESFire NFC Encrypted</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <HolographicSeal tilt={tilt} />
                  <span className="text-[7.5px] font-mono text-stone-400 font-bold">AUTH</span>
                </div>
              </div>

              <div className="relative">
                <div className="w-20 h-22 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-2 ring-stone-200 bg-stone-100">
                  <img
                    src={student.photoUrl}
                    alt={student.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[7px] font-bold shadow uppercase tracking-wider flex items-center gap-0.5">
                  <Icons.Check /> Active
                </div>
              </div>
            </div>

            <div className="text-center my-1">
              <h4 className="text-[15px] font-black text-stone-900 tracking-tight leading-tight">
                {student.fullName || 'Member Name'}
              </h4>
              <p
                className="text-[9.5px] font-bold mt-0.5 inline-block px-2.5 py-0.5 rounded-full truncate max-w-[260px]"
                style={{ backgroundColor: roleConfig.pillBg, color: roleConfig.pillText }}
              >
                {student.course || 'Degree / Designation'}
              </p>
              <p className="text-[8.5px] text-stone-500 font-medium mt-0.5 truncate">
                {student.department || 'Department of Technology'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 bg-white p-2 rounded-xl border border-stone-200 text-left text-xs">
              <div>
                <span className="text-[7.5px] font-bold uppercase text-stone-400 block tracking-wider">
                  Roll / ID
                </span>
                <span className="font-mono font-bold text-stone-800 text-[9.5px]">
                  {student.rollNo || '24CS1092'}
                </span>
              </div>
              <div>
                <span className="text-[7.5px] font-bold uppercase text-stone-400 block tracking-wider">
                  Blood Group
                </span>
                <span className="font-bold text-rose-600 text-[9.5px]">
                  {student.bloodGroup || 'O+'}
                </span>
              </div>
              <div>
                <span className="text-[7.5px] font-bold uppercase text-stone-400 block tracking-wider">
                  Valid Thru
                </span>
                <span className="font-semibold text-stone-700 text-[9.5px]">
                  {formatValidDate(student.validTill)}
                </span>
              </div>
              <div>
                <span className="text-[7.5px] font-bold uppercase text-stone-400 block tracking-wider">
                  Emergency Phone
                </span>
                <span className="font-medium text-stone-700 text-[9px] truncate block">
                  {student.phone || '+1 555-0192'}
                </span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-stone-200 flex flex-col items-center gap-0.5">
              <BarcodeSvg code={student.rollNo || '24CS1092'} widthClass="w-32" />
              <div className="w-full flex items-center justify-between text-[7px] text-stone-400 font-semibold px-2">
                <span>{roleConfig.badgeTitle}</span>
                <span>{roleConfig.authorityTitle.toUpperCase()}: <span className="font-serif italic text-stone-700 text-[8.5px]">{roleConfig.authorityName}</span></span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const IDCardBack = ({ student, theme, isLandscape }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xl flex flex-col select-none transition-all duration-300 font-sans ${
        isLandscape ? 'w-[465px] h-[295px]' : 'w-[325px] h-[510px]'
      }`}
      style={{
        boxShadow: '0 16px 36px -12px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <div className="w-full h-8 bg-stone-900 mt-3 relative flex items-center justify-between px-3 shrink-0">
        <span className="text-[6.5px] font-mono tracking-widest text-stone-400 uppercase">
          STANDARD ENCODED MAGNETIC MEDIA • TRACK 1/2 • ISO 7810
        </span>
        <div className="w-2.5 h-2.5 rounded-full bg-stone-700/60" />
      </div>

      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h5 className="text-[9px] font-bold uppercase tracking-wider text-stone-800 pb-1 border-b border-stone-200">
            Terms of Use & Security Protocol
          </h5>
          <ul className="mt-1.5 space-y-1 text-[8px] text-stone-600 leading-relaxed list-disc pl-4">
            <li>This official card remains the property of {student.collegeName || 'the University'}.</li>
            <li>Contactless 13.56 MHz RFID protocol enabled. Report lost cards immediately.</li>
            <li>Anti-Passback security active: passing badge to another person is strictly prohibited.</li>
          </ul>
        </div>

        <div className="bg-stone-50 p-2 rounded-xl border border-stone-200 text-left space-y-1">
          <div className="text-[8px]">
            <span className="text-stone-400 font-bold uppercase tracking-wide">Emergency Hotline: </span>
            <span className="font-semibold text-stone-800">{student.phone || '+1 (555) 349-2810'}</span>
          </div>
          <div className="text-[8px]">
            <span className="text-stone-400 font-bold uppercase tracking-wide">Campus Location: </span>
            <span className="text-stone-700 truncate block">{student.address || '42 Academic Avenue, Cambridge, MA'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <DynamicQRCodeSvg value={student.rollNo} />
            <div className="text-[7.5px] font-mono text-stone-500 leading-tight">
              <span>SCAN FOR SECURE</span>
              <br />
              <strong className="text-stone-800 font-bold">NFC VERIFICATION</strong>
            </div>
          </div>

          <div className="text-center">
            <div className="font-serif italic text-sm text-stone-800 select-none">
              Franklin V. Miller
            </div>
            <div className="w-20 h-px bg-stone-300 mx-auto" />
            <span className="text-[7px] uppercase tracking-wider font-bold text-stone-400 mt-0.5 block">
              Dean of Academic Affairs
            </span>
          </div>
        </div>

        <div className="text-center text-[7px] text-stone-400 pt-0.5 font-mono">
          NON-TRANSFERABLE • SECURE RFID NFC PROTOCOL ENABLED
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. WEBCAM PORTRAIT CAPTURE MODAL
// ==========================================
const WebcamCaptureModal = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [camError, setCamError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCameraReady(false);
      setCamError('');
      navigator.mediaDevices?.getUserMedia({ video: { width: 640, height: 480 } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setCameraReady(true);
          }
        })
        .catch((err) => {
          setCamError('Unable to access webcam. Please verify browser permissions.');
        });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const handleSnap = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    
    const video = videoRef.current;
    const sx = (video.videoWidth - (video.videoHeight * (300 / 360))) / 2;
    ctx.drawImage(video, sx, 0, video.videoHeight * (300 / 360), video.videoHeight, 0, 0, 300, 360);
    
    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onCapture(photoDataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="bg-stone-900 px-4 py-3 text-white flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider">
            Live Member Portrait Capture
          </span>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-xs">✕</button>
        </div>

        <div className="p-4 flex flex-col items-center">
          {camError ? (
            <div className="p-4 text-center text-xs text-rose-600 bg-rose-50 rounded-xl w-full">
              {camError}
            </div>
          ) : (
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden bg-stone-900 border-2 border-stone-300">
              <video
                ref={videoRef}
                className="w-full h-full object-cover transform -scale-x-100"
                playsInline
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-52 border-2 border-dashed border-white/70 rounded-full" />
              </div>
              <span className="absolute bottom-2 inset-x-0 text-center text-[10px] text-white/80 font-medium">
                Align face inside oval guide
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSnap}
              disabled={!cameraReady}
              className="px-5 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <Icons.Camera /> Capture Portrait
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. METRO-STYLE CONTACTLESS NFC TURNSTILE
// ==========================================
const MetroTurnstileModal = ({ isOpen, onClose, student, roleConfig }) => {
  const [turnstileState, setTurnstileState] = useState('ready');
  const [tapTimestamp, setTapTimestamp] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setTurnstileState('ready');
      setTapTimestamp(new Date().toLocaleTimeString());
    }
  }, [isOpen]);

  const handleNormalTap = () => {
    setTurnstileState('tapping');
    setTapTimestamp(new Date().toLocaleTimeString());
    setTimeout(() => {
      playMetroBeep('success');
      setTurnstileState('granted');
    }, 350);
  };

  const handleProxyFraudTest = () => {
    setTurnstileState('tapping');
    setTapTimestamp(new Date().toLocaleTimeString());
    setTimeout(() => {
      playMetroBeep('error');
      setTurnstileState('fraud');
    }, 350);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-stone-900 px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${
              turnstileState === 'granted' ? 'bg-emerald-400' : turnstileState === 'fraud' ? 'bg-rose-500 animate-ping' : 'bg-sky-400 animate-pulse'
            }`} />
            <span className="text-xs font-black uppercase tracking-wider font-mono">
              APEX TRANSIT TURNSTILE • GATE-04 (NORTH ENTRANCE)
            </span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-xs font-bold px-2 py-1 rounded-lg">✕</button>
        </div>

        <div className="p-6 flex flex-col items-center space-y-4 text-center">
          
          <div
            onClick={handleNormalTap}
            className={`relative w-44 h-44 rounded-3xl border-4 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer select-none group shadow-inner ${
              turnstileState === 'granted'
                ? 'border-emerald-500 bg-emerald-50 ring-8 ring-emerald-500/20'
                : turnstileState === 'fraud'
                ? 'border-rose-500 bg-rose-50 ring-8 ring-rose-500/20'
                : 'border-stone-800 bg-stone-900 hover:border-sky-500 ring-4 ring-stone-200'
            }`}
          >
            <div className="text-white mb-2">
              <svg className={`w-14 h-14 mx-auto transition-transform ${
                turnstileState === 'granted' ? 'text-emerald-600 scale-110' : turnstileState === 'fraud' ? 'text-rose-600 scale-110' : 'text-sky-400 group-hover:scale-110'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <span className={`text-[11px] font-black uppercase tracking-widest ${
              turnstileState === 'granted' ? 'text-emerald-800' : turnstileState === 'fraud' ? 'text-rose-800' : 'text-white'
            }`}>
              {turnstileState === 'granted' ? 'GATE UNLOCKED' : turnstileState === 'fraud' ? 'ACCESS BLOCKED' : 'TAP CARD HERE'}
            </span>
            <span className={`text-[9px] font-mono mt-1 ${
              turnstileState === 'granted' ? 'text-emerald-600' : turnstileState === 'fraud' ? 'text-rose-600' : 'text-stone-400'
            }`}>
              13.56 MHz RFID / NFC
            </span>
          </div>

          <div className="w-full bg-stone-100 p-3 rounded-xl border border-stone-200 font-mono text-left text-xs space-y-1">
            <div className="flex items-center justify-between text-stone-500 text-[10px]">
              <span>TERMINAL: NXP-GATE-04</span>
              <span>TIME: {tapTimestamp || '19:42:00'}</span>
            </div>
            
            {turnstileState === 'ready' && (
              <div className="py-2 text-center text-stone-600">
                <span className="font-bold block">Terminal Ready for Smart Card Tap</span>
                <span className="text-[10px] text-stone-400">Hold PVC Smart Badge within 4 cm of sensor</span>
              </div>
            )}

            {turnstileState === 'granted' && (
              <div className="p-2 bg-emerald-100/70 border border-emerald-300 rounded-lg text-emerald-900">
                <div className="flex items-center justify-between font-black text-xs">
                  <span>🟢 ACCESS GRANTED (BEEP!)</span>
                  <span>TURNSTILE UNLOCKED</span>
                </div>
                <div className="mt-1 text-[10px] text-emerald-800 flex justify-between">
                  <span>{student.fullName || 'Authorized Member'} ({roleConfig.badgeTitle})</span>
                  <span>ID: {student.rollNo || 'ID-ACTIVE'}</span>
                </div>
                <div className="text-[9px] text-emerald-700">Mifare DESFire UID: 04:A2:8B:19:3F • Entry Logged</div>
              </div>
            )}

            {turnstileState === 'fraud' && (
              <div className="p-2 bg-rose-100 border border-rose-300 rounded-lg text-rose-900">
                <div className="flex items-center justify-between font-black text-xs">
                  <span>🔴 ACCESS DENIED: ANTI-PASSBACK</span>
                  <span>GATE LOCKED</span>
                </div>
                <div className="mt-1 text-[10px] text-rose-800">
                  Card was tapped 14s ago at this entrance. Passing badge to another person is prohibited!
                </div>
                <div className="text-[9px] text-rose-700 font-bold">15-minute re-entry lockout initiated. Incident recorded.</div>
              </div>
            )}
          </div>

          <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
            <button
              onClick={handleNormalTap}
              className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Icons.Check />
              <span>Simulate Normal Tap</span>
            </button>
            <button
              onClick={handleProxyFraudTest}
              className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>🚨 Test Proxy / Double Tap</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. CAMPUS SSO PORTAL AUTH MODAL
// ==========================================
const CampusAuthModal = ({ isOpen, onClose, currentRole, onSwitchRole }) => {
  const [email, setEmail] = useState('admin@apex.edu');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccess('');
      setPassword('');
      setEmail('admin@apex.edu');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdminLogin = (e) => {
    e?.preventDefault();
    if (email.trim().toLowerCase() === 'admin@apex.edu' && password === 'admin123') {
      setError('');
      setSuccess('✓ Access Granted: Registrar Authority Confirmed!');
      setTimeout(() => {
        onSwitchRole('admin');
        onClose();
      }, 500);
    } else {
      setError('Invalid passkey! Use demo: admin@apex.edu / admin123');
    }
  };

  const handleQuickAutoFill = () => {
    setEmail('admin@apex.edu');
    setPassword('admin123');
    setError('');
    setSuccess('✓ Auto-Filled Demo Credentials! Unlocking...');
    setTimeout(() => {
      onSwitchRole('admin');
      onClose();
    }, 450);
  };

  const handleSwitchToStudent = () => {
    onSwitchRole('student');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-stone-900 px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.AcademicCap />
            <span className="text-xs font-black uppercase tracking-wider font-mono">
              Apex Campus Single Sign-On (SSO)
            </span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-xs font-bold px-2 py-1 rounded-lg cursor-pointer">✕</button>
        </div>

        <div className="p-5 space-y-4 text-left">
          
          {/* Active Session Status */}
          <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Current Session</span>
              <span className="text-xs font-black text-stone-800">
                {currentRole === 'admin' ? '🛡️ Registrar Admin Portal (Full Access)' : '👤 Student / Member Portal (Restricted)'}
              </span>
            </div>
            {currentRole === 'admin' ? (
              <button
                onClick={handleSwitchToStudent}
                className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold rounded-lg transition shadow-2xs cursor-pointer"
              >
                Logout to Student
              </button>
            ) : (
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">
                Student Mode
              </span>
            )}
          </div>

          {/* Admin Credentials Form */}
          {currentRole !== 'admin' ? (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-stone-900 block">
                    Registrar & Admin Authentication
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Required to unlock Batch CSV generation & authority signatures
                  </span>
                </div>
              </div>

              {/* Fast 1-Click Auto Fill Demo Chip */}
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold block">
                    DEMO: admin@apex.edu • PASS: admin123
                  </span>
                  <span className="text-[9px] text-amber-600">Quick-fill for live competition presentation</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickAutoFill}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition cursor-pointer shadow-2xs shrink-0"
                >
                  ⚡ Auto-Fill Demo
                </button>
              </div>

              {error && (
                <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-bold">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-bold">
                  {success}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    University Admin ID / Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@apex.edu"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Security Passkey / Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passkey (demo: admin123)"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Icons.Lock /> Authenticate Admin
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-4 text-center space-y-2 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <h4 className="text-xs font-black text-emerald-900 uppercase">
                Admin Privileges Active
              </h4>
              <p className="text-[11px] text-emerald-700">
                You have full clearance for Batch CSV Generation, Role Assignment, and Authority Signatures.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition cursor-pointer"
              >
                Close & Return to Studio
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. MAIN APPLICATION WORKSPACE
// ==========================================
export default function App() {
  const [student, setStudent] = useState({
    collegeName: 'Apex Institute of Technology',
    tagline: 'Excellence in Innovation & Research',
    fullName: '',
    rollNo: '',
    role: 'student',
    course: '',
    department: 'Dept. of Computing & Intelligence',
    bloodGroup: 'B+',
    validTill: '2028-06-30',
    phone: '',
    address: '',
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
  });

  const [authRole, setAuthRole] = useState('admin');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState('cse');
  const [customPrimary, setCustomPrimary] = useState('');
  const [showColorWheel, setShowColorWheel] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [activeSide, setActiveSide] = useState('front');
  const [mode, setMode] = useState('single');
  const [batchStudents, setBatchStudents] = useState([]);
  const [batchIndex, setBatchIndex] = useState(0);

  // Admin Issued IDs Registry Database State (Initially empty for deployment)
  const [issuedRegistry, setIssuedRegistry] = useState([]);
  const [registrySearch, setRegistrySearch] = useState('');
  const [registryRoleFilter, setRegistryRoleFilter] = useState('all');
  const [registryDeptFilter, setRegistryDeptFilter] = useState('all');
  const [registrySavedToast, setRegistrySavedToast] = useState('');

  // Active Face Deduplication State (Initially empty)
  const [registeredFaceMap, setRegisteredFaceMap] = useState({});
  const [dedupWarning, setDedupWarning] = useState('');

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTurnstileOpen, setIsTurnstileOpen] = useState(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);

  const fileInputRef = useRef(null);
  const batchFileInputRef = useRef(null);
  const cardContainerRef = useRef(null);

  const activeRoleConfig = CAMPUS_ROLES.find((r) => r.id === student.role) || CAMPUS_ROLES[0];
  const activeDeptTheme = DEPARTMENT_THEMES.find((t) => t.id === selectedThemeId) || DEPARTMENT_THEMES[0];
  const activeTheme = customPrimary
    ? {
        ...activeDeptTheme,
        primary: customPrimary,
        secondary: customPrimary,
        pillBg: '#f0fdf4',
        pillText: '#15803d'
      }
    : activeDeptTheme;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    const roleConfig = CAMPUS_ROLES.find((r) => r.id === roleId) || CAMPUS_ROLES[0];
    setStudent((prev) => ({
      ...prev,
      role: roleId,
      course: roleId === 'faculty' ? 'Senior Professor' : roleId === 'scholar' ? 'Doctoral Fellow' : prev.course
    }));
  };

  // Active Face Deduplication Checker
  const handlePhotoRegistration = (newPhotoUrl) => {
    const photoHash = computeSimpleImageHash(newPhotoUrl);
    
    if (registeredFaceMap[photoHash] && registeredFaceMap[photoHash].rollNo !== student.rollNo) {
      setDedupWarning(`Biometric Alert: This face is already assigned to ${registeredFaceMap[photoHash].fullName} (${registeredFaceMap[photoHash].rollNo}). Duplicate ID blocked!`);
      return;
    }

    setDedupWarning('');
    setRegisteredFaceMap((prev) => ({
      ...prev,
      [photoHash]: { fullName: student.fullName, rollNo: student.rollNo }
    }));
    setStudent((prev) => ({ ...prev, photoUrl: newPhotoUrl }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        handlePhotoRegistration(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    handlePhotoRegistration(newAvatar);
  };

  const handleMouseMove = (e) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // High-Precision Color Print Sheet with Individual Scissor Cut Markings
  const handleDownloadColorSheet = () => {
    const frontEl = document.querySelector('#card-front-render');
    const backEl = document.querySelector('#card-back-render');
    if (!frontEl && !backEl) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export the print sheet.');
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${student.fullName} - ISO CR-80 High-Precision Cutout Sheet</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: A4;
              margin: 10mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body {
              font-family: system-ui, sans-serif;
              background: #ffffff !important;
              padding: 10px;
              text-align: center;
              margin: 0;
            }
            .cards-layout {
              display: flex;
              flex-direction: ${orientation === 'portrait' ? 'row' : 'column'};
              align-items: center;
              justify-content: center;
              gap: 20px;
              margin-top: 15px;
            }
            .single-card-cutout {
              display: flex;
              flex-direction: column;
              align-items: center;
              border: 1.5px dashed #475569;
              border-radius: 20px;
              padding: 10px;
              background: #ffffff !important;
              position: relative;
            }
            .cut-label {
              font-size: 9px;
              font-family: monospace;
              font-weight: 800;
              letter-spacing: 0.05em;
              color: #475569;
              margin-bottom: 6px;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div style="margin-bottom: 12px;">
            <h2 style="font-size: 16px; font-weight: 900; color: #0f172a; margin: 0;">
              ISO 7810 CR-80 Precision Card Cutout Sheet
            </h2>
            <p style="font-size: 11px; color: #64748b; margin-top: 2px;">
              Dimensions: 85.60 mm × 53.98 mm • Full Color Gradients Guaranteed
            </p>
          </div>

          <div class="cards-layout">
            ${frontEl ? `
              <div class="single-card-cutout">
                <span class="cut-label">✂ CUT ALONG DASHED LINE • FRONT FACE</span>
                ${frontEl.outerHTML}
              </div>
            ` : ''}

            ${backEl ? `
              <div class="single-card-cutout">
                <span class="cut-label">✂ CUT ALONG DASHED LINE • REVERSE FACE</span>
                ${backEl.outerHTML}
              </div>
            ` : ''}
          </div>

          <div style="margin-top: 20px;" class="no-print">
            <button onclick="window.print()" style="padding: 9px 22px; background: #0f172a; color: white; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 12px;">
              🖨️ Print Vibrant Colors (PDF / Cardstock)
            </button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const selectBatchStudent = (index) => {
    setBatchIndex(index);
    const selected = batchStudents[index];
    if (selected) {
      setStudent(selected);
      if (selected.themeId) {
        setSelectedThemeId(selected.themeId);
        setCustomPrimary('');
      }
    }
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length <= 1) return;

      const parsed = lines.slice(1).map((line, idx) => {
        const [fullName, rollNo, course, dept, bloodGroup, phone, validTill] = line.split(',').map((c) => c.trim());
        const themeId = DEPARTMENT_THEMES[idx % DEPARTMENT_THEMES.length].id;
        const role = rollNo?.startsWith('FAC') ? 'faculty' : rollNo?.startsWith('PHD') ? 'scholar' : 'student';
        return {
          collegeName: student.collegeName,
          tagline: student.tagline,
          fullName: fullName || `Member ${idx + 1}`,
          rollNo: rollNo || `24CS-${2000 + idx}`,
          role,
          course: course || 'Academic Member',
          department: dept || 'Dept. of Computing',
          bloodGroup: bloodGroup || 'O+',
          validTill: validTill || '2028-06-30',
          phone: phone || '+1 (555) 000-0000',
          address: 'University Campus, Hall A',
          photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=member-${idx}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
          themeId
        };
      });

      if (parsed.length > 0) {
        setBatchStudents(parsed);
        setBatchIndex(0);
        setStudent(parsed[0]);
        if (parsed[0].themeId) setSelectedThemeId(parsed[0].themeId);
        setIssuedRegistry((prev) => {
          const existingIds = new Set(prev.map((p) => p.rollNo));
          const newEntries = parsed.filter((p) => !existingIds.has(p.rollNo));
          return [...prev, ...newEntries];
        });
      }
    };
    reader.readAsText(file);
  };

  // Registry Management Handlers
  const handleSaveActiveToRegistry = () => {
    const name = student.fullName.trim() || 'New Member';
    const roll = student.rollNo.trim() || `ID-${Math.floor(1000 + Math.random() * 9000)}`;
    const studentToSave = { ...student, fullName: name, rollNo: roll, themeId: selectedThemeId };

    setIssuedRegistry((prev) => {
      const idx = prev.findIndex((p) => p.rollNo === roll);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = studentToSave;
        return updated;
      }
      return [studentToSave, ...prev];
    });
    setRegistrySavedToast(`✓ Saved ${name} (${roll}) to Database!`);
    setTimeout(() => setRegistrySavedToast(''), 3000);
  };

  const handleLoadFromRegistry = (item) => {
    setStudent(item);
    if (item.themeId) {
      setSelectedThemeId(item.themeId);
      setCustomPrimary('');
    }
  };

  const handleRevokeFromRegistry = (rollNo) => {
    if (window.confirm(`Revoke and remove credential record ${rollNo}?`)) {
      setIssuedRegistry((prev) => {
        const deletedIndex = prev.findIndex((p) => p.rollNo === rollNo);
        const updated = prev.filter((p) => p.rollNo !== rollNo);

        // If the card currently previewed in 3D matches the revoked ID, auto-switch to next available
        if (student.rollNo === rollNo) {
          if (updated.length > 0) {
            const nextIdx =
              deletedIndex >= 0 && deletedIndex < updated.length
                ? deletedIndex
                : Math.max(0, updated.length - 1);
            const nextStudent = updated[nextIdx];
            setStudent(nextStudent);
            if (nextStudent.themeId) {
              setSelectedThemeId(nextStudent.themeId);
              setCustomPrimary('');
            }
          } else {
            // All records revoked, provide fresh template
            setStudent({
              collegeName: 'Apex Institute of Technology',
              tagline: 'Excellence in Innovation & Research',
              fullName: 'New Member',
              rollNo: '24XX-0000',
              role: 'student',
              course: 'Campus Credential Candidate',
              department: 'Dept. of Computing & Intelligence',
              bloodGroup: 'O+',
              validTill: '2028-06-30',
              phone: '+1 (555) 000-0000',
              address: 'Campus Main Reception',
              photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
            });
            setSelectedThemeId('cse');
            setCustomPrimary('');
          }
        }
        return updated;
      });
    }
  };

  // Live Multi-Field Filter Query
  const filteredRegistry = issuedRegistry.filter((item) => {
    const q = registrySearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.fullName?.toLowerCase().includes(q) ||
      item.rollNo?.toLowerCase().includes(q) ||
      item.department?.toLowerCase().includes(q) ||
      item.course?.toLowerCase().includes(q) ||
      item.phone?.toLowerCase().includes(q) ||
      item.bloodGroup?.toLowerCase().includes(q);

    const matchesRole = registryRoleFilter === 'all' || item.role === registryRoleFilter;
    const matchesDept = registryDeptFilter === 'all' || item.themeId === registryDeptFilter;

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="no-print sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-6 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white shadow-sm">
              <Icons.AcademicCap />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black tracking-tight text-stone-900 uppercase">
                  UniCard Studio
                </h1>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black tracking-wider ${
                  authRole === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-sky-100 text-sky-900'
                }`}>
                  {authRole === 'admin' ? 'REGISTRAR ADMIN' : 'STUDENT PORTAL'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                Enterprise Multi-Role Credential & Smart Metro Transit Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTurnstileOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Icons.NfcWave />
              <span>Simulate NFC Metro Tap</span>
            </button>

            <button
              onClick={handleDownloadColorSheet}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Icons.Download />
              <span>Color Cutout Sheet</span>
            </button>

            <button
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition border border-stone-200 cursor-pointer"
            >
              <Icons.Lock />
              <span>Portal: {authRole === 'admin' ? 'Admin' : 'Student'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="no-print lg:col-span-7 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-5">
          
          {/* Active Face Deduplication Alert Banner */}
          {dedupWarning && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold flex items-center justify-between">
              <span>⚠️ {dedupWarning}</span>
              <button
                onClick={() => setDedupWarning('')}
                className="text-rose-500 hover:text-rose-700 ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Mode Switcher: Single vs Batch vs Registry (Gated by Admin) */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => setMode('single')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  mode === 'single' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Single Member
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (authRole !== 'admin') {
                    alert('Access Restricted: Batch CSV creation is an administrative privilege. Please switch portal session to Registrar Admin!');
                    setShowAuthModal(true);
                    return;
                  }
                  setMode('batch');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                  mode === 'batch' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {authRole !== 'admin' && <Icons.Lock />}
                <span>Batch CSV</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (authRole !== 'admin') {
                    alert('Access Restricted: University Issued Registry is restricted to Registrar Admin!');
                    setShowAuthModal(true);
                    return;
                  }
                  setMode('registry');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                  mode === 'registry' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {authRole !== 'admin' && <Icons.Lock />}
                <span>🗂️ Issued Registry ({issuedRegistry.length})</span>
              </button>
            </div>

            {/* University Role Picker & Save Button */}
            {mode === 'single' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveActiveToRegistry}
                  className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <span>💾 Save to Registry</span>
                </button>
                <select
                  value={student.role}
                  onChange={handleRoleChange}
                  className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 font-bold text-stone-800 cursor-pointer"
                >
                  {CAMPUS_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Toast Notification when saved */}
          {registrySavedToast && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center justify-between">
              <span>{registrySavedToast}</span>
              <button
                onClick={() => setRegistrySavedToast('')}
                className="text-emerald-500 hover:text-emerald-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* ================= REGISTRY MODE PANEL ================= */}
          {mode === 'registry' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-stone-900">
                    University Issued IDs Registry
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Central institutional database • Search, filter, and audit active credentials
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMode('single')}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  + Issue New Card
                </button>
              </div>

              {/* Search & Multi-Field Filters */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={registrySearch}
                    onChange={(e) => setRegistrySearch(e.target.value)}
                    placeholder="Search by Name, Roll / ID, Department, Designation, Phone, or Blood Group..."
                    className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition"
                  />
                  <div className="absolute left-3 top-2.5 text-stone-400 pointer-events-none text-xs">
                    🔍
                  </div>
                  {registrySearch && (
                    <button
                      onClick={() => setRegistrySearch('')}
                      className="absolute right-3 top-2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Controls Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[9.5px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                      Filter by Role:
                    </label>
                    <select
                      value={registryRoleFilter}
                      onChange={(e) => setRegistryRoleFilter(e.target.value)}
                      className="w-full text-xs bg-white border border-stone-200 rounded-lg px-2 py-1.5 font-semibold text-stone-700 cursor-pointer"
                    >
                      <option value="all">All Roles (All)</option>
                      {CAMPUS_ROLES.map((r) => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[9.5px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                      Filter by Branch:
                    </label>
                    <select
                      value={registryDeptFilter}
                      onChange={(e) => setRegistryDeptFilter(e.target.value)}
                      className="w-full text-xs bg-white border border-stone-200 rounded-lg px-2 py-1.5 font-semibold text-stone-700 cursor-pointer"
                    >
                      <option value="all">All Branches (All)</option>
                      {DEPARTMENT_THEMES.map((t) => (
                        <option key={t.id} value={t.id}>{t.shortName} ({t.dept.split(' ')[0]})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        setRegistrySearch('');
                        setRegistryRoleFilter('all');
                        setRegistryDeptFilter('all');
                      }}
                      className="w-full py-1.5 px-3 bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Status & Stats bar */}
              <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                <span>
                  Showing <strong className="text-stone-900 font-black">{filteredRegistry.length}</strong> of {issuedRegistry.length} credentials
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  ACTIVE DATABASE
                </span>
              </div>

              {/* Registry Records List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {issuedRegistry.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
                    <span className="text-2xl mb-1.5 block">🗂️</span>
                    <span className="text-sm font-bold text-stone-700 block">No Credentials Issued Yet</span>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                      The university database is currently empty. Issue a card in Single Member mode or upload a cohort roster in Batch CSV mode.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMode('single')}
                      className="mt-3 px-3.5 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 transition cursor-pointer"
                    >
                      + Issue First ID Card
                    </button>
                  </div>
                ) : filteredRegistry.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
                    <span className="text-sm font-bold text-stone-600 block">No matching credentials found</span>
                    <span className="text-xs text-stone-400">Try changing your search keywords or resetting filters.</span>
                  </div>
                ) : (
                  filteredRegistry.map((item) => {
                    const itemRole = CAMPUS_ROLES.find((r) => r.id === item.role) || CAMPUS_ROLES[0];
                    const isCurrentlyActive = student.rollNo === item.rollNo;
                    return (
                      <div
                        key={item.rollNo}
                        className={`p-3 rounded-xl border transition flex items-center justify-between gap-3 ${
                          isCurrentlyActive
                            ? 'border-sky-600 bg-sky-50/60 ring-1 ring-sky-500'
                            : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/70'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.photoUrl}
                            alt={item.fullName}
                            className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-black text-stone-900 truncate">
                                {item.fullName}
                              </h4>
                              <span
                                className="px-1.5 py-0.2 rounded text-[7.5px] font-black uppercase tracking-wider shrink-0"
                                style={{ backgroundColor: itemRole.pillBg, color: itemRole.pillText }}
                              >
                                {itemRole.badgeTitle}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10.5px] text-stone-500 font-medium truncate mt-0.5">
                              <span className="font-mono font-bold text-stone-700">{item.rollNo}</span>
                              <span>•</span>
                              <span className="truncate">{item.course}</span>
                              <span>•</span>
                              <span className="text-rose-600 font-bold">{item.bloodGroup}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleLoadFromRegistry(item)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer ${
                              isCurrentlyActive
                                ? 'bg-sky-600 text-white shadow-2xs'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                            }`}
                          >
                            <span>{isCurrentlyActive ? 'Loaded in 3D' : 'Load in 3D'}</span>
                            <span>→</span>
                          </button>

                          {isCurrentlyActive && (
                            <button
                              type="button"
                              onClick={() => setMode('single')}
                              className="px-2 py-1 text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 rounded-lg transition cursor-pointer"
                              title="Edit this credential in Single Card Editor"
                            >
                              ✏️ Edit
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRevokeFromRegistry(item.rollNo)}
                            className="p-1 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition text-xs cursor-pointer"
                            title="Revoke / Delete Credential"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Batch Mode Panel */}
              {mode === 'batch' && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-stone-800">
                        Cohort Roster ({batchStudents.length} Members Loaded)
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Batch generation with automatic role & branch theme assignment
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="./sample_cohort.csv"
                        download="sample_cohort.csv"
                        className="px-2.5 py-1 bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-bold rounded-lg transition shadow-2xs inline-flex items-center gap-1"
                        title="Download sample CSV template for testing"
                      >
                        <span>📥</span> Template
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setBatchStudents(SAMPLE_BATCH_STUDENTS);
                          selectBatchStudent(0);
                        }}
                        className="px-2.5 py-1 bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-bold rounded-lg transition shadow-2xs"
                      >
                        ⚡ Load Demo
                      </button>
                      <button
                        type="button"
                        onClick={() => batchFileInputRef.current?.click()}
                        className="px-2.5 py-1 bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold rounded-lg transition"
                      >
                        Upload CSV
                      </button>
                      <input
                        ref={batchFileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleCsvUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {batchStudents.length === 0 ? (
                    <div className="p-4 text-center bg-white rounded-xl border border-dashed border-stone-200">
                      <span className="text-xs font-bold text-stone-700 block">No Cohort Roster Loaded</span>
                      <p className="text-[11px] text-stone-400 mt-1">
                        Upload a university CSV file above to bulk process credentials, or click "Template" / "⚡ Load Demo".
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-stone-200">
                      <button
                        type="button"
                        disabled={batchIndex === 0}
                        onClick={() => selectBatchStudent(Math.max(0, batchIndex - 1))}
                        className="px-2 py-1 bg-stone-100 disabled:opacity-40 text-stone-700 text-xs font-bold rounded-lg"
                      >
                        ← Prev
                      </button>
                      <span className="text-xs font-bold text-stone-700">
                        Member {batchIndex + 1} of {batchStudents.length}: <span className="text-sky-700 font-black">{student.fullName || 'Candidate'}</span> ({student.role})
                      </span>
                      <button
                        type="button"
                        disabled={batchIndex === batchStudents.length - 1}
                        onClick={() => selectBatchStudent(Math.min(batchStudents.length - 1, batchIndex + 1))}
                        className="px-2 py-1 bg-stone-100 disabled:opacity-40 text-stone-700 text-xs font-bold rounded-lg"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              )}

          {/* Department Themes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Academic Branch Theme
              </label>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowColorWheel(!showColorWheel)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition"
                >
                  <Icons.Palette />
                  <span>Color Wheel</span>
                </button>

                {showColorWheel && (
                  <div className="absolute right-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-stone-200 z-50 w-56">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Custom Spectrum Hex
                    </span>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {SPECTRUM_SWATCHES.map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => {
                            setCustomPrimary(hex);
                            setShowColorWheel(false);
                          }}
                          className="w-7 h-7 rounded-full border-2 border-white shadow-sm hover:scale-110 transition"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <span className="text-xs text-stone-600 font-medium">Hex Color:</span>
                      <input
                        type="color"
                        value={customPrimary || activeTheme.primary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        className="w-8 h-7 cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DEPARTMENT_THEMES.map((theme) => {
                const isSelected = selectedThemeId === theme.id && !customPrimary;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      setSelectedThemeId(theme.id);
                      setCustomPrimary('');
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
                    <span className="text-xs font-semibold text-stone-800 truncate">
                      {theme.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photograph & Webcam Feature (Restored & Enhanced) */}
          <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={student.photoUrl}
                alt="Member preview"
                className="w-11 h-11 rounded-xl object-cover border border-stone-300 shadow-2xs"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-stone-800 block">Member Photograph</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[8.5px] font-mono font-bold">
                    DEDUP VERIFIED
                  </span>
                </div>
                <span className="text-[10px] text-stone-500">Live camera capture or image upload</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Restored Take Photo via Webcam Button */}
              <button
                type="button"
                onClick={() => setIsWebcamOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold rounded-lg transition"
              >
                <Icons.Camera /> Take Photo
              </button>
              <button
                type="button"
                onClick={generateRandomAvatar}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg transition"
              >
                <Icons.Shuffle /> Random
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition"
              >
                Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Profile Form Details */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Institution & Member Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Institution Name"
                name="collegeName"
                value={student.collegeName}
                onChange={handleInputChange}
                placeholder="e.g. Stanford University"
              />
              <FormInput
                label="Motto / Slogan"
                name="tagline"
                value={student.tagline}
                onChange={handleInputChange}
                placeholder="e.g. Excellence in Research"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Full Legal Name"
                name="fullName"
                value={student.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Aditya Sharma"
              />
              <FormInput
                label="Roll / Registration No."
                name="rollNo"
                value={student.rollNo}
                onChange={handleInputChange}
                placeholder="e.g. 24CS1089"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Designation / Degree"
                name="course"
                value={student.course}
                onChange={handleInputChange}
                placeholder="e.g. B.Tech - Computer Science"
              />
              <FormInput
                label="Department"
                name="department"
                value={student.department}
                onChange={handleInputChange}
                placeholder="e.g. School of Computing"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormSelect
                label="Blood Group"
                name="bloodGroup"
                value={student.bloodGroup}
                onChange={handleInputChange}
                options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
              />
              <FormInput
                label="Valid Until"
                name="validTill"
                value={student.validTill}
                onChange={handleInputChange}
                type="date"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                label="Emergency Phone"
                name="phone"
                value={student.phone}
                onChange={handleInputChange}
                placeholder="+1 555-0192"
              />
              <FormInput
                label="Campus Address"
                name="address"
                value={student.address}
                onChange={handleInputChange}
                placeholder="Campus Hall B, Room 302"
              />
            </div>
          </div>
        </>
      )}
    </div>

        {/* RIGHT COLUMN: LIVE STICKY CARD DISPLAY */}
        <aside className="lg:col-span-5 flex flex-col items-center sticky top-20">
          <div className="no-print w-full flex items-center justify-between bg-white p-2 rounded-xl border border-stone-200/80 shadow-2xs mb-3">
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => setOrientation('portrait')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  orientation === 'portrait' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Portrait
              </button>
              <button
                type="button"
                onClick={() => setOrientation('landscape')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  orientation === 'landscape' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Landscape
              </button>
            </div>

            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveSide('front')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  activeSide === 'front' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Front
              </button>
              <button
                type="button"
                onClick={() => setActiveSide('back')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  activeSide === 'back' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveSide('both')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  activeSide === 'both' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Dual
              </button>
            </div>
          </div>

          <div
            id="print-section"
            ref={cardContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full flex flex-col items-center justify-center gap-5 py-1 transition-transform duration-150 ease-out"
            style={{
              perspective: '1200px',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            }}
          >
            {(activeSide === 'front' || activeSide === 'both') && (
              <div id="card-front-render" className="flex flex-col items-center">
                <span className="no-print text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                  Card Front ({activeRoleConfig.label})
                </span>
                <IDCardFront
                  student={student}
                  theme={activeTheme}
                  roleConfig={activeRoleConfig}
                  isLandscape={orientation === 'landscape'}
                  tilt={tilt}
                />
              </div>
            )}

            {(activeSide === 'back' || activeSide === 'both') && (
              <div id="card-back-render" className="flex flex-col items-center">
                <span className="no-print text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                  Card Reverse
                </span>
                <IDCardBack
                  student={student}
                  theme={activeTheme}
                  isLandscape={orientation === 'landscape'}
                />
              </div>
            )}
          </div>

          <div className="no-print mt-3 text-center">
            <p className="text-[11px] text-stone-400 font-medium">
              ISO 7810 CR-80 Standard • Contactless 13.56 MHz RFID protocol
            </p>
          </div>
        </aside>
      </main>

      {/* Live Webcam Portrait Capture Modal */}
      <WebcamCaptureModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCapture={handlePhotoRegistration}
      />

      {/* Metro Turnstile Tap Simulator Modal */}
      <MetroTurnstileModal
        isOpen={isTurnstileOpen}
        onClose={() => setIsTurnstileOpen(false)}
        student={student}
        roleConfig={activeRoleConfig}
      />

      {/* Campus SSO Auth Switcher Modal */}
      <CampusAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentRole={authRole}
        onSwitchRole={setAuthRole}
      />

    </div>
  );
}
