import { ArrowLeft } from "lucide-react";
import Link from "@/components/TransitionLink";

export default function NotFound() {
  return (
    <section className="site-shell flex min-h-[70vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="page-title mt-4">Page not found.</h1>
        <p className="section-intro mt-6">
          The page may have moved, or the address may be incorrect.
        </p>
        <Link href="/" className="button mt-8">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back home
        </Link>
      </div>
    </section>
  );
}
