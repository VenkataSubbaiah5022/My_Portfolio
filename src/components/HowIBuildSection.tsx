const steps = [
  "Requirement Analysis",
  "System Design",
  "API Architecture",
  "Deployment & Monitoring",
  "Optimization & Iteration",
];

export function HowIBuildSection() {
  return (
    <section id="build-process" className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
      <h2 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">
        How I Build Products
      </h2>
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm leading-7 text-muted-foreground">
          I approach projects with product thinking first: define clear business goals,
          design maintainable systems, ship iteratively, and continuously optimize
          performance, reliability, and developer experience.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => (
            <div key={step} className="rounded-xl border border-border px-3 py-2 text-xs">
              {idx + 1}. {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
