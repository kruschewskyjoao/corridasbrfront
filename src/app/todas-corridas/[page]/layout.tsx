import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todas as Corridas - Corridas Brasil',
  description: 'Descubra todas as corridas disponíveis no Brasil. Filtre por tipo, localização e encontre sua próxima aventura.',
  openGraph: {
    title: 'Todas as Corridas - Corridas Brasil',
    description: 'Descubra todas as corridas disponíveis no Brasil',
    type: 'website',
  },
}

export default function TodasCorridasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
