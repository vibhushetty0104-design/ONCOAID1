"use client";

import { useId, useState } from "react";

export function Accordion({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-forest/10 border-y border-forest/10">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`${baseId}-${index}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[18px] font-medium text-forest"
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.title}
                <span className="text-coral">{expanded ? "–" : "+"}</span>
              </button>
            </h3>
            <div
              id={`${baseId}-${index}`}
              hidden={!expanded}
              className="pb-5 text-[16px] leading-relaxed text-blue-gray"
            >
              {item.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
