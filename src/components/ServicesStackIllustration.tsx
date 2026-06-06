export function ServicesStackIllustration() {
  return (
    <div className="relative w-full max-w-[340px] overflow-hidden pt-3 lg:pb-4">
      <div
        className="relative w-full overflow-hidden pt-2 pb-2 motion-safe:rotate-[1.1deg] motion-safe:translate-y-1"
        style={{ aspectRatio: "4 / 3" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-2.5 left-1/2 h-[60px] w-[220px] -translate-x-1/2 blur-[20px]"
          style={{
            background:
              "radial-gradient(rgba(79, 70, 229, 0.28) 0%, transparent 70%)",
          }}
        />

        <svg
          viewBox="0 -46 340 308"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="sl1top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="sl1left" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="sl1right" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
            <linearGradient id="sl2top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <linearGradient id="sl2left" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
            <linearGradient id="sl2right" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="sl3top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="sl3left" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="sl3right" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          <g className="services-float-3">
            <polygon points="170,170 90,128 170,86 250,128" fill="url(#sl3top)" opacity="0.92" />
            <polygon points="90,128 90,158 170,200 170,170" fill="url(#sl3left)" />
            <polygon points="170,170 170,200 250,158 250,128" fill="url(#sl3right)" />
            <polygon
              points="170,170 90,128 170,86 250,128"
              fill="none"
              stroke="rgba(100,116,139,0.4)"
              strokeWidth="0.5"
            />
            <text
              x="170"
              y="132"
              textAnchor="middle"
              fill="rgba(71,85,105,0.8)"
              fontSize="18"
              fontFamily="monospace"
            >
              ⬡
            </text>
            <text
              x="170"
              y="118"
              textAnchor="middle"
              fill="rgba(71,85,105,0.55)"
              fontSize="9"
              fontWeight="700"
              letterSpacing="1"
            >
              MongoDB
            </text>
          </g>

          <g className="services-float-2">
            <polygon points="170,120 90,78 170,36 250,78" fill="url(#sl2top)" opacity="0.93" />
            <polygon points="90,78 90,108 170,150 170,120" fill="url(#sl2left)" />
            <polygon points="170,120 170,150 250,108 250,78" fill="url(#sl2right)" />
            <polygon
              points="170,120 90,78 170,36 250,78"
              fill="none"
              stroke="rgba(79,70,229,0.5)"
              strokeWidth="0.5"
            />
            <text
              x="170"
              y="82"
              textAnchor="middle"
              fill="rgba(79,70,229,0.85)"
              fontSize="18"
              fontFamily="monospace"
            >
              ⚙
            </text>
            <text
              x="170"
              y="68"
              textAnchor="middle"
              fill="rgba(67,56,202,0.65)"
              fontSize="9"
              fontWeight="700"
              letterSpacing="1"
            >
              Node.js
            </text>
          </g>

          <g className="services-float-1">
            <polygon points="170,70 90,28 170,-14 250,28" fill="url(#sl1top)" opacity="0.94" />
            <polygon points="90,28 90,58 170,100 170,70" fill="url(#sl1left)" />
            <polygon points="170,70 170,100 250,58 250,28" fill="url(#sl1right)" />
            <polygon
              points="170,70 90,28 170,-14 250,28"
              fill="none"
              stroke="rgba(99,102,241,0.5)"
              strokeWidth="0.5"
            />
            <text
              x="170"
              y="32"
              textAnchor="middle"
              fill="rgba(129,140,248,0.9)"
              fontSize="16"
              fontFamily="monospace"
            >
              ⚛
            </text>
            <text
              x="170"
              y="19"
              textAnchor="middle"
              fill="rgba(67,56,202,0.65)"
              fontSize="9"
              fontWeight="700"
              letterSpacing="1"
            >
              React
            </text>
          </g>

          <line x1="170" y1="70" x2="170" y2="120" stroke="rgba(129,140,248,0.35)" strokeWidth="0.8" />
          <line x1="170" y1="120" x2="170" y2="170" stroke="rgba(79,70,229,0.35)" strokeWidth="0.8" />

          <circle cx="60" cy="100" r="2" fill="#6366f1" opacity="0.5">
            <animate attributeName="cy" values="100;90;100" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="290" cy="130" r="1.5" fill="#818cf8" opacity="0.4">
            <animate attributeName="cy" values="130;120;130" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="170" r="1.5" fill="#4338ca" opacity="0.3">
            <animate attributeName="cy" values="170;162;170" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="310" cy="80" r="1" fill="#22d3ee" opacity="0.4">
            <animate attributeName="cy" values="80;72;80" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </svg>

        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold text-muted-foreground">Frontend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span className="text-xs font-semibold text-muted-foreground">Backend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-500" />
            <span className="text-xs font-semibold text-muted-foreground">Database</span>
          </div>
        </div>
      </div>
    </div>
  );
}
