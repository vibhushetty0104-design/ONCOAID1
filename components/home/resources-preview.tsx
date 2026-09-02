import Link from "next/link";
import { resources } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function ResourcesPreview() {
  const featured = resources.find((r) => r.featured) ?? resources[0];
  const rest = resources.filter((r) => r.slug !== featured.slug);

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <p className="label text-teal">Patient Resources</p>
          <h2 className="editorial-serif mt-3 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] text-forest">
            Information you can use.
          </h2>
          <p className="mt-3 text-[16px] text-blue-gray max-w-2xl">
            Clear explanations, practical guides and resources for navigating cancer care in India.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <Link
            href={`/resources/${featured.slug}`}
            className="group flex min-h-[420px] flex-col justify-between rounded-[32px] bg-forest p-8 text-white-soft transition-all duration-320 hover:shadow-2xl md:p-12"
          >
            <div className="flex items-center justify-between">
              <span className="label text-mint">01 · Featured Guide</span>
              <span className="rounded-full bg-white-soft/10 px-3 py-1 text-[12px] text-mint">
                {featured.readTime || "6 min read"}
              </span>
            </div>

            <div>
              <p className="text-[13px] text-mint-deep">{featured.author} · {featured.date}</p>
              <h3 className="editorial-serif mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-tight group-hover:text-cyan transition-colors">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white-soft/78">
                {featured.excerpt}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-cyan group-hover:translate-x-1 transition-transform">
                Read guide article →
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-6">
            {rest.map((item, index) => (
              <Link
                key={item.slug}
                href={`/resources/${item.slug}`}
                className="group flex flex-1 flex-col justify-between rounded-[28px] border border-forest/8 bg-white-soft p-7 shadow-[var(--shadow-card)] transition-all duration-320 hover:border-cobalt/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="label text-warm-gray">
                    {String(index + 2).padStart(2, "0")} · {item.kind}
                  </p>
                  <span className="text-[12px] text-warm-gray">{item.readTime}</span>
                </div>

                <div className="my-4">
                  <h3 className="font-serif text-[1.8rem] leading-snug text-forest group-hover:text-cobalt transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-blue-gray line-clamp-2">{item.excerpt}</p>
                </div>

                <div className="flex items-center justify-between border-t border-forest/5 pt-3">
                  <span className="text-[12px] text-warm-gray">{item.author}</span>
                  <span className="text-[13px] font-medium text-teal group-hover:translate-x-1 transition-transform">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
