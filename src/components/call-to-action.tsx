import Link from "next/link";

export function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-500 text-white">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Share Your Adventure?</h2>
          <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join our community of adventurers and start sharing your favorite trails and races today.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <div className="flex justify-center">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-green-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Share Your Trail
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
