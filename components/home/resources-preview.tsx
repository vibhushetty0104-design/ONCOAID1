import Link from "next/link";
import { resources } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function ResourcesPreview() {
  const featured = resources.find((r) => r.featured) ?? resources[0];
  const rest = resources.filter((r) => r.slug !== featured.slug);

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="label text-teal">Patient Resources</p>
          <h2 className="heading-serif-section mt-3 text-forest">
            Information you can use.
          </h2>
          <p className="mt-2.5 text-[15px] text-blue-gray max-w-2xl">
            Clear explanations, practical guides and resources for navigating cancer care in India.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
          <Link
            href={`/resources/${featured.slug}`}
            className="group flex min-h-[380px] flex-col justify-between rounded-2xl bg-forest p-7 text-white-soft transition-all duration-200 hover:border-forest/40 md:p-9 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="label text-mint">01 · Featured Guide</span>
              <span className="rounded-md bg-white-soft/10 px-2.5 py-0.5 text-[11px] text-mint">
                {featured.readTime || "6 min read"}
              </span>
            </div>

            <div>
              <p className="text-meta-ui text-mint-deep">{featured.author} · {featured.date}</p>
              <h3 className="editorial-serif mt-2 text-[2.2rem] leading-tight group-hover:text-cyan transition-colors">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white-soft/80">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-cyan group-hover:translate-x-1 transition-transform">
                Read guide article →
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-4">
            {rest.map((item, index) => (
              <Link
                key={item.slug}
                href={`/resources/${item.slug}`}
                className="group flex flex-1 flex-col justify-between rounded-xl border border-forest/8 bg-white-soft p-5 shadow-xs transition-all duration-200 hover:border-forest/20"
              >
                <div className="flex items-center justify-between">
                  <p className="text-meta-ui text-warm-gray">
                    {String(index + 2).padStart(2, "0")} · {item.kind}
                  </p>
                  <span className="text-[11.5px] text-warm-gray">{item.readTime}</span>
                </div>

                <div className="my-3">
                  <h3 className="heading-sans-ui text-[17px] text-forest group-hover:text-teal transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-blue-gray line-clamp-2">{item.excerpt}</p>
                </div>

                <div className="flex items-center justify-between border-t border-forest/6 pt-2.5">
                  <span className="text-[11.5px] text-warm-gray">{item.author}</span>
                  <span className="text-[12.5px] font-medium text-teal group-hover:translate-x-0.5 transition-transform">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
