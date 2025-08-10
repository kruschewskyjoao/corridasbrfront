import Link from "next/link";

export function CallToAction() {
  return (
    <section className="w-full min-h-[50vh] flex items-center justify-center bg-green-500 text-white">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Pronto para Compartilhar Sua Aventura?</h2>
          <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Junte-se à nossa comunidade de aventureiros e comece a compartilhar suas trilhas e corridas favoritas hoje mesmo.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2 mt-4">
          <div className="flex justify-center">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-green-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Compartilhe Sua Corrida Conosco
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
