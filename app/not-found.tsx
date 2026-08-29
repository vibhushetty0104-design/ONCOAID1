import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-page py-36">
      <p className="label text-teal">Missing page</p>
      <h1 className="editorial-serif mt-4 text-[3.5rem] text-forest">This path isn&apos;t here.</h1>
      <p className="mt-4 text-blue-gray">Return to ONCO-AID and choose a clearer next step.</p>
      <Link href="/" className="mt-8 inline-block text-teal">
        Go home →
      </Link>
    </main>
  );
}
