type CaseStudyIllustrationProps = {
  slug: string;
  className?: string;
};

export function CaseStudyIllustration({ slug, className = "" }: CaseStudyIllustrationProps) {
  if (slug === "talentvault-ai") {
    return (
      <svg
        viewBox="0 0 400 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <rect x="40" y="30" width="140" height="180" rx="16" fill="url(#tvDoc)" stroke="rgba(139,92,246,0.4)" strokeWidth="2" />
        <rect x="58" y="55" width="90" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
        <rect x="58" y="72" width="104" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
        <rect x="58" y="86" width="96" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
        <rect x="58" y="100" width="80" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="300" cy="90" r="52" fill="url(#tvAi)" stroke="rgba(167,139,250,0.5)" strokeWidth="2" />
        <path d="M285 90 L295 100 L315 78" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M180 120 C210 100, 240 100, 248 90" stroke="rgba(167,139,250,0.8)" strokeWidth="2" strokeDasharray="6 4" />
        <rect x="210" y="150" width="150" height="90" rx="14" fill="url(#tvDash)" stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="225" y="168" width="50" height="28" rx="6" fill="rgba(139,92,246,0.35)" />
        <rect x="285" y="168" width="60" height="28" rx="6" fill="rgba(99,102,241,0.2)" />
        <rect x="225" y="206" width="120" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="225" y="220" width="90" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
        <defs>
          <linearGradient id="tvDoc" x1="40" y1="30" x2="180" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="tvAi" x1="248" y1="38" x2="352" y2="142" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="tvDash" x1="210" y1="150" x2="360" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#312e81" />
            <stop offset="1" stopColor="#1e1b4b" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (slug === "jobsprint") {
    return (
      <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden>
        <rect x="30" y="40" width="160" height="110" rx="12" fill="#0f172a" stroke="rgba(249,115,22,0.45)" strokeWidth="2" />
        <rect x="45" y="58" width="10" height="10" rx="2" fill="#ef4444" />
        <rect x="60" y="58" width="10" height="10" rx="2" fill="#f59e0b" />
        <rect x="75" y="58" width="10" height="10" rx="2" fill="#22c55e" />
        <text x="50" y="88" fill="#22d3ee" fontFamily="monospace" fontSize="11">{">"} jobsprint run</text>
        <text x="50" y="108" fill="#a5f3fc" fontFamily="monospace" fontSize="10">matching 62 roles...</text>
        <text x="50" y="128" fill="#86efac" fontFamily="monospace" fontSize="10">applied: Sr. React Dev</text>
        <rect x="220" y="50" width="150" height="170" rx="14" fill="url(#jsBrowser)" stroke="rgba(34,211,238,0.35)" strokeWidth="2" />
        <rect x="235" y="68" width="120" height="12" rx="4" fill="rgba(255,255,255,0.15)" />
        <rect x="235" y="92" width="90" height="8" rx="3" fill="rgba(255,255,255,0.2)" />
        <rect x="235" y="110" width="110" height="8" rx="3" fill="rgba(255,255,255,0.15)" />
        <rect x="235" y="140" width="70" height="24" rx="6" fill="rgba(249,115,22,0.5)" />
        <path d="M190 95 H220" stroke="rgba(249,115,22,0.7)" strokeWidth="2" markerEnd="url(#arrow)" />
        <circle cx="200" cy="180" r="28" fill="url(#jsAi)" />
        <text x="200" y="186" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">AI</text>
        <defs>
          <linearGradient id="jsBrowser" x1="220" y1="50" x2="370" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="jsAi" x1="172" y1="152" x2="228" y2="208" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (slug === "flowboard") {
    return (
      <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden>
        {[
          { x: 40, color: "#10b981" },
          { x: 150, color: "#06b6d4" },
          { x: 260, color: "#6366f1" },
        ].map((col) => (
          <g key={col.x}>
            <rect x={col.x} y="40" width="90" height="200" rx="12" fill="rgba(15,23,42,0.6)" stroke={`${col.color}66`} strokeWidth="2" />
            <rect x={col.x + 12} y="58" width="66" height="36" rx="8" fill={`${col.color}44`} stroke={`${col.color}88`} />
            <rect x={col.x + 12} y="102" width="66" height="36" rx="8" fill={`${col.color}33`} />
            <rect x={col.x + 12} y="146" width="66" height="36" rx="8" fill={`${col.color}22`} />
          </g>
        ))}
        <path d="M128 76 C140 60, 150 60, 162 76" stroke="#22d3ee" strokeWidth="2" fill="none" strokeDasharray="4 3" />
        <circle cx="350" cy="70" r="18" fill="#10b981" opacity="0.8" />
        <circle cx="350" cy="110" r="18" fill="#06b6d4" opacity="0.7" />
        <path d="M338 70 L310 76 M338 110 L310 120" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" />
      </svg>
    );
  }

  if (slug === "duel-dots") {
    return (
      <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden>
        <rect x="95" y="35" width="210" height="210" rx="16" fill="#0f172a" stroke="rgba(239,68,68,0.35)" strokeWidth="2" />
        {Array.from({ length: 25 }).map((_, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          const cx = 120 + col * 38;
          const cy = 60 + row * 38;
          const isRed = (row + col) % 2 === 0;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="12"
              fill={isRed ? "rgba(239,68,68,0.75)" : "rgba(59,130,246,0.75)"}
              stroke="rgba(255,255,255,0.2)"
            />
          );
        })}
        <rect x="30" y="100" width="50" height="80" rx="10" fill="url(#ddP1)" />
        <rect x="320" y="100" width="50" height="80" rx="10" fill="url(#ddP2)" />
        <defs>
          <linearGradient id="ddP1" x1="30" y1="100" x2="80" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ef4444" />
            <stop offset="1" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="ddP2" x1="320" y1="100" x2="370" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return null;
}
