import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-indigo py-28 text-white-soft md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(47,91,255,0.18),transparent_36%),radial-gradient(circle_at_10%_80%,rgba(127,212,208,0.12),transparent_40%)]" />
      <div className="container-page relative">
        <Reveal>
          <h2 className="editorial-serif max-w-3xl text-[clamp(2.4rem,6vw,5.2rem)]">
            You don&apos;t have to navigate it alone.
          </h2>
          <p className="mt-6 max-w-lg text-[17px] text-white-soft/72">
            Start with a specialist search, or ask ONCO-AID to help you name the next useful question.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/appointments" variant="coral">
              Find Care
            </Button>
            <Button href="/ai" variant="ghost" className="text-white-soft">
              Ask ONCO-AID AI
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
