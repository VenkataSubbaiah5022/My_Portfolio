type SystemDesignIllustrationProps = {
  slug: string;
  className?: string;
};

export function SystemDesignIllustration({ slug, className = "" }: SystemDesignIllustrationProps) {
  if (slug === "iot-telemetry-pipeline") {
    return (
      <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden>
        <rect x="30" y="100" width="56" height="56" rx="10" fill="url(#iotDev)" stroke="rgba(34,211,238,0.45)" strokeWidth="2" />
        <circle cx="58" cy="118" r="6" fill="rgba(255,255,255,0.5)" />
        <rect x="48" y="132" width="20" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x="120" y="88" width="72" height="80" rx="12" fill="url(#iotMqtt)" stroke="rgba(6,182,212,0.5)" strokeWidth="2" />
        <text x="132" y="118" fill="white" fontSize="10" fontWeight="bold">MQTT</text>
        <text x="128" y="136" fill="rgba(255,255,255,0.6)" fontSize="8">EMQX broker</text>
        <rect x="220" y="72" width="80" height="48" rx="10" fill="url(#iotKafka)" stroke="rgba(59,130,246,0.45)" strokeWidth="2" />
        <text x="238" y="102" fill="white" fontSize="10" fontWeight="bold">Kafka</text>
        <rect x="220" y="138" width="80" height="56" rx="10" fill="url(#iotSvc)" stroke="rgba(16,185,129,0.4)" strokeWidth="2" />
        <text x="232" y="170" fill="white" fontSize="9" fontWeight="bold">Flask µsvc</text>
        <ellipse cx="340" cy="128" rx="44" ry="52" fill="url(#iotDb)" stroke="rgba(34,197,94,0.4)" strokeWidth="2" />
        <text x="340" y="132" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Mongo</text>
        <path d="M86 128 H120 M192 108 H220 M192 166 H220 M300 128 H296" stroke="rgba(34,211,238,0.7)" strokeWidth="2" strokeDasharray="4 3" />
        <defs>
          <linearGradient id="iotDev" x1="30" y1="100" x2="86" y2="156" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0e7490" /><stop offset="1" stopColor="#164e63" />
          </linearGradient>
          <linearGradient id="iotMqtt" x1="120" y1="88" x2="192" y2="168" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0891b2" /><stop offset="1" stopColor="#0e7490" />
          </linearGradient>
          <linearGradient id="iotKafka" x1="220" y1="72" x2="300" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" /><stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="iotSvc" x1="220" y1="138" x2="300" y2="194" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" /><stop offset="1" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="iotDb" x1="296" y1="76" x2="384" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#16a34a" /><stop offset="1" stopColor="#14532d" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (slug === "platform-microservices") {
    return (
      <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden>
        <rect x="24" y="40" width="70" height="44" rx="8" fill="url(#platApp)" stroke="rgba(99,102,241,0.45)" strokeWidth="2" />
        <rect x="24" y="96" width="70" height="44" rx="8" fill="url(#platApp)" stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <rect x="24" y="152" width="70" height="44" rx="8" fill="url(#platApp)" stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
        <text x="38" y="68" fill="white" fontSize="8" fontWeight="bold">Clients</text>
        <rect x="130" y="72" width="88" height="96" rx="12" fill="url(#platApi)" stroke="rgba(99,102,241,0.5)" strokeWidth="2" />
        <text x="148" y="108" fill="white" fontSize="9" fontWeight="bold">Product</text>
        <text x="142" y="124" fill="white" fontSize="9" fontWeight="bold">APIs</text>
        <rect x="250" y="56" width="96" height="56" rx="10" fill="url(#platIam)" stroke="rgba(168,85,247,0.45)" strokeWidth="2" />
        <text x="268" y="90" fill="white" fontSize="9" fontWeight="bold">Keycloak</text>
        <rect x="250" y="132" width="96" height="56" rx="10" fill="url(#platUser)" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
        <text x="262" y="166" fill="white" fontSize="8" fontWeight="bold">User Mgmt API</text>
        <ellipse cx="200" cy="220" rx="52" ry="28" fill="url(#platPg)" stroke="rgba(148,163,184,0.4)" strokeWidth="2" />
        <text x="200" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PostgreSQL</text>
        <ellipse cx="330" cy="220" rx="48" ry="28" fill="url(#platMongo)" stroke="rgba(34,197,94,0.35)" strokeWidth="2" />
        <text x="330" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MongoDB</text>
        <path d="M94 62 H130 M94 118 H130 M94 174 H130 M218 100 H250 M218 160 H250" stroke="rgba(99,102,241,0.6)" strokeWidth="2" />
        <defs>
          <linearGradient id="platApp" x1="24" y1="40" x2="94" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" /><stop offset="1" stopColor="#4338ca" />
          </linearGradient>
          <linearGradient id="platApi" x1="130" y1="72" x2="218" y2="168" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f46e5" /><stop offset="1" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="platIam" x1="250" y1="56" x2="346" y2="112" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#5b21b6" />
          </linearGradient>
          <linearGradient id="platUser" x1="250" y1="132" x2="346" y2="188" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="platPg" x1="148" y1="192" x2="252" y2="248" gradientUnits="userSpaceOnUse">
            <stop stopColor="#64748b" /><stop offset="1" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="platMongo" x1="282" y1="192" x2="378" y2="248" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22c55e" /><stop offset="1" stopColor="#15803d" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 280" fill="none" className={className} aria-hidden>
      <rect x="60" y="60" width="120" height="80" rx="12" fill="url(#genA)" stroke="rgba(99,102,241,0.4)" strokeWidth="2" />
      <rect x="220" y="40" width="120" height="60" rx="12" fill="url(#genB)" stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
      <rect x="220" y="120" width="120" height="60" rx="12" fill="url(#genB)" stroke="rgba(99,102,241,0.35)" strokeWidth="2" />
      <rect x="140" y="170" width="120" height="70" rx="12" fill="url(#genC)" stroke="rgba(139,92,246,0.4)" strokeWidth="2" />
      <path d="M180 100 H220 M280 100 V120 M180 200 H220" stroke="rgba(99,102,241,0.5)" strokeWidth="2" strokeDasharray="5 4" />
      <defs>
        <linearGradient id="genA" x1="60" y1="60" x2="180" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" /><stop offset="1" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient id="genB" x1="220" y1="40" x2="340" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" /><stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="genC" x1="140" y1="170" x2="260" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
