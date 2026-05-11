"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={item.question}
            className="rounded-xl border border-purple-200/70 bg-purple-50/40 p-4"
          >
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-slate-900"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className={`inline-flex h-6 w-6 items-center justify-center rounded-md border border-purple-200 text-purple-700 transition ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="mt-3">
                <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
