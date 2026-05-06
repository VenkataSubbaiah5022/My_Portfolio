const challenges = [
  {
    title: "Latency Optimization",
    detail:
      "Reduced API response paths to sub-100ms by optimizing MongoDB schema design and aggregation queries.",
  },
  {
    title: "Realtime System Reliability",
    detail:
      "Implemented socket-driven event flows with reconnect-safe behaviors and scalable message persistence patterns.",
  },
  {
    title: "Production Quality Engineering",
    detail:
      "Improved release confidence with 80%+ test coverage, CI/CD automation, and robust API validation controls.",
  },
];

export function EngineeringChallengesSection() {
  return (
    <section id="challenges" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">
        Featured Engineering Challenges
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {challenges.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
