import { SectionHeading } from "@/components/SectionHeading";

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
      <SectionHeading
        badge="My process"
        titleBefore="How I"
        titleHighlight="build"
        description="I approach projects with product thinking first: define clear business goals, design maintainable systems, ship iteratively, and continuously optimize performance, reliability, and developer experience."
      />
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
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
