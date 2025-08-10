function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function LocateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function Features() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tudo o que Você Precisa para sua Aventura</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Da descoberta de trilhas ao planejamento de corridas, nossa plataforma conecta a comunidade de aventura.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="grid gap-1 text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-green-100 rounded-full p-3 dark:bg-green-900">
                <CameraIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Listagens com Fotos</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Faça upload de até 5 fotos de alta qualidade para mostrar suas trilhas e corridas.
            </p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-green-100 rounded-full p-3 dark:bg-green-900">
                <LocateIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Localizações Detalhadas</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dados de localização precisos e informações da trilha para ajudar os aventureiros a se localizarem.
            </p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-green-100 rounded-full p-3 dark:bg-green-900">
                <UsersIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Comunidade Ativa</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Conecte-se com outros aventureiros e compartilhe experiências da trilha.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
