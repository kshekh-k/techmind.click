import Link from "next/link";
import FAQAccordion from "@/app/components/faq-accordion";
import TextFormatter from "@/app/components/text-format";
import type { LongTailPage } from "@/app/content/long-tail-pages";

type SolutionPageTemplateProps = {
  page: LongTailPage;
};

function InfoCards({
  title,
  cards,
}: {
  title: string;
  cards: Array<{ title: string; href?: string; description: string }>;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article
            key={`${title}-${card.title}`}
            className="rounded-2xl border border-purple-200/70 bg-white/80 p-5 shadow-sm backdrop-blur"
          >
            <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
            {card.href ? (
              <Link
                href={card.href}
                className="mt-4 inline-flex text-sm font-semibold text-purple-700 underline underline-offset-4"
              >
                Open page
              </Link>
            ) : (
              <p className="mt-4 inline-flex rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Coming soon
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function SolutionPageTemplate({ page }: SolutionPageTemplateProps) {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-5 px-3 md:px-4 xl:space-y-10">
      <section id="tool">
        <TextFormatter />
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-purple-200/50 bg-gradient-to-br from-purple-700 via-violet-600 to-fuchsia-600 p-6 text-white shadow-2xl sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-fuchsia-200/20 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
              {page.intent.replace("-", " ")}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-sm text-purple-50 sm:text-base">{page.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={page.ctaHref}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-lg transition hover:-translate-y-0.5"
              >
                {page.ctaLabel}
              </Link>
              <Link
                href="/contact-us"
                className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Contact Support
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-xl sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span className="ml-2 text-xs text-purple-100">workflow preview</span>
            </div>

            <div className="rounded-xl border border-white/20 bg-slate-950/35 p-4 ring-1 ring-white/10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-100">Quick Definition</p>
              <p className="mt-2 text-sm text-fuchsia-100">{page.conciseDefinition}</p>

              <div className="mt-4 rounded-lg bg-white/10 p-3">
                <p className="text-[11px] text-purple-100">Priority</p>
                <p className="text-sm font-semibold text-white">{page.priority}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-purple-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quick Answer</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700">{page.quickAnswer}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-purple-200/70 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Problem Explanation</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{page.problemExplanation}</p>
        </article>

        <article className="rounded-2xl border border-purple-200/70 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Why It Happens</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {page.whyItHappens.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="space-y-4" aria-label="Step by step solution">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Step-by-Step Solution</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {page.steps.map((step, index) => (
            <article
              key={step.title}
              className="group rounded-2xl border border-purple-200/70 bg-gradient-to-b from-white/95 to-purple-50/80 p-5 shadow-md transition hover:-translate-y-0.5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-purple-200/70 bg-white/80 p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tool Integration</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Use TechMind tools directly in this workflow to solve the issue quickly with minimal manual editing.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {page.relatedTools.map((tool) => (
            tool.href ? (
              <Link
                key={tool.title}
                href={tool.href}
                className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
              >
                {tool.title}
              </Link>
            ) : (
              <span
                key={tool.title}
                className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700"
              >
                {tool.title} (Coming soon)
              </span>
            )
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Before and After Examples</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {page.examples.map((example) => (
            <article
              key={example.label}
              className="rounded-2xl border border-purple-200/70 bg-white/80 p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{example.label}</h3>

              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Before</p>
                <pre className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-rose-900">
                  {example.before}
                </pre>
              </div>

              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">After</p>
                <pre className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-emerald-900">
                  {example.after}
                </pre>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-purple-200/70 bg-white/80 p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Comparison Table</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-purple-200">
                <th className="px-3 py-3 font-semibold text-slate-900">Criteria</th>
                <th className="px-3 py-3 font-semibold text-slate-900">TechMind</th>
                <th className="px-3 py-3 font-semibold text-slate-900">Alternative</th>
                <th className="px-3 py-3 font-semibold text-slate-900">Notes</th>
              </tr>
            </thead>
            <tbody>
              {page.comparisonRows.map((row) => (
                <tr key={row.criteria} className="border-b border-purple-100">
                  <td className="px-3 py-3 font-medium text-slate-900">{row.criteria}</td>
                  <td className="px-3 py-3 text-slate-700">{row.techmind}</td>
                  <td className="px-3 py-3 text-slate-700">{row.alternative}</td>
                  <td className="px-3 py-3 text-slate-700">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ</h2>
        <FAQAccordion items={page.faqs} />
      </section>

      <InfoCards title="Related Articles" cards={page.relatedArticles} />
      <InfoCards title="Related Tools" cards={page.relatedTools} />
      <InfoCards title="Internal Links" cards={page.internalLinks} />
      <InfoCards title="Glossary Links" cards={page.glossaryLinks} />

      <section className="rounded-2xl border border-purple-200/70 bg-gradient-to-r from-white to-purple-50 p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Trust Indicators</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {page.trustIndicators.map((indicator) => (
            <li
              key={indicator}
              className="rounded-xl border border-purple-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700"
            >
              {indicator}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-purple-200/60 bg-gradient-to-br from-purple-800 via-violet-700 to-fuchsia-700 p-8 text-white shadow-2xl">
        <h2 className="text-2xl font-extrabold tracking-tight">Ready to Solve This in Under 2 Minutes?</h2>
        <p className="mt-3 max-w-2xl text-sm text-purple-100">
          Use TechMind&apos;s solution workflow to complete this task faster with clean output, better readability,
          and no unnecessary steps.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={page.ctaHref}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-700"
          >
            {page.ctaLabel}
          </Link>
          <Link
            href="/contact-us"
            className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            Ask a Workflow Question
          </Link>
        </div>
      </section>
    </main>
  );
}