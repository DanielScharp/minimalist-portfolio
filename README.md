<div align="center">

<img src="https://github.com/DanielScharp.png" width="110" style="border-radius: 50%" alt="Daniel Scharp" />

# Daniel Scharp · Portfólio Pessoal

**Um portfólio minimalista que funciona como currículo, vitrine de projetos e blog técnico, tudo em uma única aplicação.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Ver site no ar](https://danielscharp.com.br) · [LinkedIn](https://www.linkedin.com/in/daniel-scharp/) · [Entrar em contato](mailto:contato@danielscharp.com.br)

</div>

---

## 📌 Sobre o projeto

Este repositório contém o meu portfólio pessoal: o lugar onde quem está avaliando o meu trabalho (recrutadores, líderes técnicos ou possíveis clientes) encontra, em poucos cliques, **quem eu sou, o que já construí, como eu penso e como falar comigo**.

A proposta foi fugir do "site estático de uma página só" e criar algo que se comporte como um **produto real**:

- uma interface limpa e minimalista, que coloca o conteúdo em primeiro lugar;
- um **blog técnico** com páginas próprias, otimizadas para compartilhamento e buscadores;
- um **formulário de contato que realmente envia e-mails**, com um back-end próprio;
- conteúdo totalmente separado do código, para que atualizar o currículo seja tão simples quanto editar um arquivo.

Além de apresentar meus projetos, o próprio portfólio é uma demonstração prática de como eu organizo código, cuido da experiência do usuário e coloco uma aplicação em produção.

---

## ✨ Funcionalidades

| | Funcionalidade | O que faz |
|---|---|---|
| 👤 | **Cartão de perfil fixo** | Barra lateral com foto, cargo, contato e redes sociais, que acompanha a rolagem no desktop e vira um cabeçalho compacto no celular. |
| 🧭 | **Navegação por abas** | Seções *Sobre*, *Resumo*, *Portfólio*, *Blog* e *Contato* trocam instantaneamente, sem recarregar a página. Também é possível abrir uma aba direto pelo link (`/#blog` ou `?section=contato`). |
| 🛠️ | **Habilidades técnicas** | Linguagens, frameworks e ferramentas agrupados por categoria, em badges fáceis de escanear. |
| 💬 | **Carrossel de depoimentos** | Rolagem infinita e automática que também pode ser **arrastada com o mouse ou com o dedo**, componente feito do zero. |
| 📄 | **Linha do tempo profissional** | Experiência e formação apresentadas em formato de timeline. |
| 🗂️ | **Portfólio com filtros** | Projetos filtráveis por categoria, com prévia ao passar o mouse e links para a versão no ar e para o código. |
| 📝 | **Blog técnico completo** | Listagem de artigos e página dedicada para cada post, com sumário clicável, blocos de código com botão "copiar", caixas de destaque (dica, aviso, informação), tags, navegação entre posts e botão de compartilhar. |
| 🕒 | **Datas amigáveis** | Cada post mostra a data de publicação e há quanto tempo foi publicado ("3 dias", "2 meses"). |
| 📬 | **Contato funcional** | Formulário com validação e feedback visual que envia a mensagem direto para a minha caixa de e-mail, já com "responder para" apontando para quem escreveu. |
| 🗺️ | **Mapa integrado** | Localização exibida com Google Maps incorporado. |
| 🌗 | **Tema claro e escuro** | Alternância com um clique, e a preferência fica salva para a próxima visita. |
| 📱 | **Totalmente responsivo** | Layout pensado para celular, tablet e desktop. |

---

## 🧰 Tecnologias

**Base da aplicação**
- **[Next.js 16](https://nextjs.org/) (App Router)**: renderização no servidor, geração estática das páginas do blog e rotas de API.
- **[React 19](https://react.dev/)** e **[TypeScript](https://www.typescriptlang.org/)**: componentes tipados e reutilizáveis.

**Interface**
- **[Tailwind CSS 4](https://tailwindcss.com/)** com variáveis de cor em OKLCH para os temas claro e escuro.
- **[shadcn/ui](https://ui.shadcn.com/)** + **[Radix UI](https://www.radix-ui.com/)**: base de componentes acessíveis.
- **[Lucide](https://lucide.dev/)** e **[React Icons](https://react-icons.github.io/react-icons/)** para ícones.
- Fonte **Poppins** carregada via `next/font`, sem impacto no carregamento.

**Back-end e serviços**
- **Route Handler do Next.js** (`/api/contact`) como endpoint do formulário.
- **[Nodemailer](https://nodemailer.com/)** para envio de e-mails via SMTP.
- **[Vercel Analytics](https://vercel.com/analytics)** para métricas de acesso.

**Ferramentas**
- **pnpm** como gerenciador de pacotes.
- **ESLint** para padronização do código.
- Hospedagem em **Hostinger**, com domínio próprio.

---

## 🧠 Decisões e diferenciais

**Conteúdo separado do código.**
Todos os textos do site (perfil, experiências, formação, projetos, depoimentos e posts do blog) ficam em um único arquivo tipado, `lib/portfolio-data.ts`. Os componentes apenas recebem esses dados e os exibem. Na prática, isso funciona como um "CMS sem servidor": para adicionar um projeto ou publicar um artigo, basta editar esse arquivo, sem mexer em nenhuma tela.

**Blog pensado para ser encontrado e compartilhado.**
Cada artigo é gerado como página estática (`generateStaticParams`) e recebe metadados próprios, incluindo título, descrição e Open Graph. Isso significa carregamento rápido e uma prévia bonita quando o link é colado no LinkedIn ou no WhatsApp. Os posts são estruturados por seções, o que permite montar o sumário automaticamente.

**Formulário de contato com back-end de verdade.**
Em vez de depender de um serviço de terceiros, o envio passa por uma rota de API própria que valida os campos, monta o e-mail em HTML e texto puro e define o remetente como destinatário de resposta. As credenciais ficam em variáveis de ambiente, fora do código, e o usuário sempre recebe uma mensagem clara de sucesso ou erro.

**Componentes construídos sob medida.**
O carrossel de depoimentos não usa biblioteca: ele combina animação contínua com `requestAnimationFrame` e arraste por mouse e toque, com "loop infinito" sem saltos visuais. Datas também são formatadas por funções próprias, que exibem o tempo relativo em português.

**Links que levam direto ao ponto.**
A navegação entre seções é feita no próprio cliente, por isso é instantânea, mas a aba ativa também pode ser definida pela URL. Assim, um link pode abrir o portfólio já na seção de contato ou no blog.

**Cuidado com segurança e manutenção.**
O histórico do repositório mostra atualizações frequentes de dependências para corrigir vulnerabilidades conhecidas e ajustes de build específicos para o ambiente de hospedagem em produção.

---

## 🗂️ Estrutura do projeto

```text
minimalist-portfolio/
├── app/
│   ├── page.tsx              # Página principal com navegação por abas
│   ├── layout.tsx            # Layout raiz, fonte, ícones e analytics
│   ├── globals.css           # Tema claro/escuro e tokens de cor
│   ├── blog/
│   │   ├── page.tsx          # Listagem de artigos
│   │   └── [slug]/page.tsx   # Página de cada artigo (gerada estaticamente)
│   └── api/
│       └── contact/route.ts  # Endpoint que envia o e-mail do formulário
├── components/
│   ├── profile-sidebar.tsx   # Cartão de perfil
│   ├── about-section.tsx     # Sobre, serviços, skills e depoimentos
│   ├── resume-section.tsx    # Experiência e formação
│   ├── portfolio-section.tsx # Projetos com filtro por categoria
│   ├── blog-*.tsx            # Listagem, bloco de código e compartilhamento
│   ├── contact-section-new.tsx
│   ├── draggable-marquee.tsx # Carrossel infinito arrastável
│   ├── theme-toggle.tsx      # Alternância de tema
│   └── ui/                   # Componentes base (shadcn/ui)
├── lib/
│   ├── portfolio-data.ts     # Todo o conteúdo do site
│   └── utils.ts              # Formatação de datas e utilitários
├── hooks/                    # Hooks reutilizáveis
└── public/                   # Imagens e ícones
```

---

## 🚀 Como rodar localmente

**Pré-requisitos:** [Node.js](https://nodejs.org/) 20 ou superior e [pnpm](https://pnpm.io/).

```bash
# 1. Clone o repositório
git clone https://github.com/DanielScharp/minimalist-portfolio.git
cd minimalist-portfolio

# 2. Instale as dependências
pnpm install

# 3. Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse **http://localhost:3000**.

### Formulário de contato (opcional)

Para o envio de e-mails funcionar, crie um arquivo `.env.local` na raiz com as credenciais SMTP:

```env
SMTP_HOST=smtp.seuprovedor.com   # padrão: smtp.hostinger.com
SMTP_PORT=465                    # 465 usa conexão segura (SSL)
SMTP_USER=seu-email@dominio.com
SMTP_PASS=sua-senha
CONTACT_TO=para-onde-enviar@dominio.com
```

Sem essas variáveis, o restante do site funciona normalmente e o formulário apenas avisa que o envio não está configurado.

### Outros comandos

| Comando | Descrição |
|---|---|
| `pnpm build` | Gera a versão otimizada para produção |
| `pnpm start` | Executa a versão de produção |
| `pnpm lint` | Verifica o padrão do código |

---

## ✏️ Personalizando o conteúdo

Quer adaptar o portfólio? Todo o conteúdo está em [`lib/portfolio-data.ts`](lib/portfolio-data.ts):

- **`profileData`**: nome, cargo, foto, contatos e redes sociais;
- **`aboutData`**: texto de apresentação, serviços, habilidades e depoimentos;
- **`resumeData`**: experiências e formação;
- **`portfolioData`**: categorias e projetos;
- **`blogData`**: artigos do blog, com seções, blocos de código e destaques;
- **`contactData`**: e-mail, telefone, localização e mapa.

Um novo post no blog, por exemplo, é só um novo objeto na lista `blogData.posts`: a página, o sumário e os metadados são criados automaticamente.

---

## 🛣️ Próximos passos

- [ ] Adicionar mais projetos à vitrine
- [ ] Ampliar os artigos do blog
- [ ] Mover os posts para arquivos Markdown/MDX
- [ ] Internacionalização (português e inglês)

---

## 📫 Contato

<div align="center">

Gostou do projeto ou quer conversar sobre uma oportunidade? Vou adorar ouvir você.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-daniel--scharp-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-scharp/)
[![E-mail](https://img.shields.io/badge/E--mail-contato@danielscharp.com.br-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contato@danielscharp.com.br)
[![GitHub](https://img.shields.io/badge/GitHub-DanielScharp-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DanielScharp)

Feito com dedicação por **Daniel Scharp**

</div>
