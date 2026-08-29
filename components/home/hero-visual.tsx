export function HeroVisual() {
  return (
    <div className="hero-visual relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:max-w-none">
      <div className="absolute inset-0 overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_38%_28%,rgba(127,212,208,0.22),transparent_42%),radial-gradient(circle_at_72%_70%,rgba(201,184,228,0.18),transparent_46%),linear-gradient(180deg,#0c3331_0%,#071f1f_100%)]">
        <svg
          className="absolute inset-0 h-full w-full opacity-80"
          viewBox="0 0 400 500"
          fill="none"
          aria-hidden="true"
        >
          <ellipse cx="200" cy="250" rx="138" ry="168" stroke="rgba(215,236,227,0.22)" strokeWidth="1" />
          <ellipse cx="200" cy="250" rx="96" ry="118" stroke="rgba(127,212,208,0.28)" strokeWidth="1" />
          <ellipse cx="200" cy="250" rx="52" ry="64" stroke="rgba(227,138,114,0.35)" strokeWidth="1.2" />
          <circle cx="200" cy="250" r="18" fill="rgba(255,253,248,0.08)" stroke="rgba(255,253,248,0.35)" />
          <circle cx="200" cy="132" r="5" fill="#7fd4d0" />
          <circle cx="302" cy="250" r="4" fill="#c9b8e4" />
          <circle cx="128" cy="318" r="4.5" fill="#e38a72" />
          <circle cx="248" cy="360" r="3.5" fill="#d7ece3" />
          <path
            d="M200 148 C 228 188, 248 214, 248 250"
            stroke="rgba(127,212,208,0.45)"
            strokeWidth="1"
          />
          <path
            d="M218 258 C 248 258, 276 254, 298 250"
            stroke="rgba(201,184,228,0.5)"
            strokeWidth="1"
          />
          <path
            d="M188 268 C 164 292, 146 308, 132 318"
            stroke="rgba(227,138,114,0.45)"
            strokeWidth="1"
          />
        </svg>
        <div className="absolute left-1/2 top-[42%] flex h-28 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mint/18 text-center text-[13px] leading-snug text-white-soft/90 backdrop-blur-[2px]">
          01
          <br />
          A clearer
          <br />
          next step
        </div>
      </div>
      <p className="sr-only">
        Abstract cellular diagram suggesting biology and a guided next step — not a clinical image.
      </p>
    </div>
  );
}
