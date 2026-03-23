import { useEffect, useState } from "react";
import SectionShell from "../components/SectionShell";
import GlassCard from "../components/GlassCard";

const stats = [
  { label: "Downtime Reduction", value: 70, suffix: "%" },
  { label: "REST APIs Delivered", value: 20, suffix: "+" },
  { label: "Microservices Deployed", value: 19, suffix: "+" },
  { label: "Average API Latency", value: 100, suffix: "ms", prefix: "<" }
];

function CountUp({ target, prefix = "", suffix = "" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    let start;
    const duration = 1100;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <SectionShell id="impact" eyebrow="Impact" title="Results delivered at production scale">
      <div className="stats-grid">
        {stats.map((item) => (
          <GlassCard key={item.label}>
            <div className="stat-card">
              <h3>
                <CountUp target={item.value} prefix={item.prefix} suffix={item.suffix} />
              </h3>
              <p>{item.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  );
}
