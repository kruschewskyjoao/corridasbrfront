## Corridas Brasil

Aplicação Next.js para listar corridas no Brasil, com página de detalhes para cada prova. Os dados vêm de um arquivo JSON versionado e as imagens são servidas de domínios remotos permitidos na configuração do Next.

### Tecnologias
- **Next.js 15 (App Router)**
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Radix UI (Dialog)** – atualmente não utilizado nas páginas

### Requisitos
- **Node.js >= 18.17**
- Gerenciador de pacotes à sua escolha: **npm**, **yarn**, **pnpm** ou **bun**

### Instalação e execução
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Abrir no navegador
http://localhost:3000
```

### Scripts
- `npm run dev`: inicia o servidor de desenvolvimento (Turbopack)
- `npm run build`: build de produção
- `npm run start`: inicia o servidor em produção (após o build)
- `npm run lint`: verifica lints

### Estrutura principal
```
corridasbrasil/
  src/
    app/
      layout.tsx          # Layout global: Header, Footer e <main/>
      page.tsx            # Página inicial (Hero, Features, Lista de Corridas, CTA)
      corrida/
        [slug]/page.tsx   # Página de detalhes da corrida
    components/
      header.tsx
      footer.tsx
      featured-adventures.tsx  # Lista de corridas
      ui/ ...
    races/
      corridas_detalhadas.json # Fonte de dados das corridas
  next.config.ts          # Domínios de imagens remotas
  package.json
  README.md
```

### Rotas
- `/` – Home com seções: Hero, Features, FeaturedAdventures (lista) e CallToAction
- `/corrida/[slug]` – Detalhe da corrida
  - O `slug` é gerado a partir do `name` (remoção de acentos, lowercase e hífens)
  - A página gera rotas estáticas via `generateStaticParams`

### Dados
Os dados das corridas estão em `src/races/corridas_detalhadas.json`. Campos usados:
- **name**: nome da corrida (base para o slug)
- **type**: tipo (ex.: CORRIDA DE RUA)
- **distances**: lista de distâncias
- **price**: preço exibido
- **images**: URLs de imagens
- **saleStatus**: status de vendas
- **date**: data do evento
- **country**: país
- **description**: descrição longa (renderizada com quebras de linha)
- **whatsapp**: link para contato

### Imagens remotas (next/image)
Este projeto usa imagens de `https://sub4.com.br`. O domínio está autorizado em `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'sub4.com.br', port: '', pathname: '/**' }
  ]
}
```

Se precisar exibir imagens de outros domínios, adicione-os à lista acima e reinicie o servidor de desenvolvimento.

### Build e Deploy
```bash
npm run build
npm run start
```

- Em plataformas como Vercel, o deploy funciona automaticamente a partir do `npm run build`.
- Certifique-se de manter os domínios de imagens atualizados em `next.config.ts` para evitar erros em produção.

### Notas de UI
- `Header` e `Footer` são globais, renderizados em `src/app/layout.tsx`.
- A listagem de corridas fica em `src/components/featured-adventures.tsx`.
- O botão “Mais informações” navega para a página de detalhes.

### Licença
Uso interno/estudo. Ajuste conforme sua necessidade.
