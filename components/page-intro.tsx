import { Button } from "@/components/ui/button";

export function PageIntro({
  eyebrow,
  title,
  children,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <header className="max-w-3xl pt-28 md:pt-32">
      <p className={`label ${invert ? "text-mint-deep" : "text-teal"}`}>{eyebrow}</p>
      <h1 className={`editorial-serif mt-4 text-[clamp(2.4rem,6vw,5rem)] ${invert ? "text-white-soft" : "text-forest"}`}>
        {title}
      </h1>
      {children ? (
        <div className={`mt-6 max-w-2xl text-[17px] leading-relaxed ${invert ? "text-white-soft/72" : "text-blue-gray"}`}>
          {children}
        </div>
      ) : null}
    </header>
  );
}

export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[13px] text-warm-gray">{children}</p>;
}

export function BackHome() {
  return (
    <div className="mt-10">
      <Button href="/" variant="link" className="text-teal">
        ← Back to ONCO-AID
      </Button>
    </div>
  );
}
