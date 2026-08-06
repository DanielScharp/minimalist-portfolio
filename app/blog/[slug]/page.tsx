import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Tag, Info, Lightbulb, AlertTriangle, ChevronRight, User } from 'lucide-react'
import { blogData, profileData } from '@/lib/portfolio-data'
import { getRelativeTime, formatDate } from '@/lib/utils'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { BlogCodeBlock } from '@/components/blog-code-block'
import { BlogShareButton } from '@/components/blog-share-button'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogData.posts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Post não encontrado | Daniel Scharp',
    }
  }

  return {
    title: `${post.title} | Blog - Daniel Scharp`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.name || 'Daniel Scharp'],
      tags: post.tags,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const postIndex = blogData.posts.findIndex((p) => p.slug === slug)

  if (postIndex === -1) {
    notFound()
  }

  const post = blogData.posts[postIndex]
  const prevPost = postIndex > 0 ? blogData.posts[postIndex - 1] : null
  const nextPost = postIndex < blogData.posts.length - 1 ? blogData.posts[postIndex + 1] : null

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
          {/* Profile Sidebar */}
          <ProfileSidebar data={profileData} />

          {/* Main Article Container */}
          <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden p-4 sm:p-6 lg:p-10">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-border">
              <Link
                href="/#blog"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform" />
                <span>Voltar ao Blog</span>
              </Link>

              <BlogShareButton title={post.title} />
            </div>

            {/* Header Metadata */}
            <header className="space-y-4 mb-8">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {getRelativeTime(post.date)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic border-l-2 border-accent pl-4">
                {post.excerpt}
              </p>

              {/* Author Badge */}
              {post.author && (
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-accent/20"
                  />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{post.author.name}</p>
                    <p className="text-[11px] text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              )}
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden mb-8 border border-border bg-secondary">
              <img
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Table of Contents / Index */}
            {post.content.sections.length > 0 && (
              <div className="p-4 md:p-5 rounded-xl bg-secondary/60 border border-border mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Nesta Leitura
                </h3>
                <ul className="space-y-1.5 text-xs md:text-sm">
                  {post.content.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-foreground/80 hover:text-accent transition-colors flex items-center gap-1.5"
                      >
                        <ChevronRight className="w-3 h-3 text-accent" />
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content */}
            <article className="space-y-8 text-foreground/90 text-sm md:text-base leading-relaxed">
              {/* Intro */}
              <p className="text-base md:text-lg leading-relaxed text-foreground font-normal">
                {post.content.intro}
              </p>

              {/* Sections */}
              {post.content.sections.map((section) => (
                <section key={section.id} id={section.id} className="space-y-4 pt-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight pt-2 border-b border-border/40 pb-2">
                    {section.title}
                  </h2>

                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  {/* Callout Box */}
                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border flex items-start gap-3 my-4 ${
                        section.callout.type === 'tip'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : section.callout.type === 'warning'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : 'bg-accent/10 border-accent/30 text-accent-foreground'
                      }`}
                    >
                      {section.callout.type === 'tip' && <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                      {section.callout.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />}
                      {section.callout.type === 'info' && <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />}

                      <div className="space-y-1 text-xs md:text-sm">
                        <h4 className="font-bold">{section.callout.title}</h4>
                        <p className="text-foreground/90">{section.callout.text}</p>
                      </div>
                    </div>
                  )}

                  {/* Code Block */}
                  {section.codeBlock && (
                    <BlogCodeBlock
                      code={section.codeBlock.code}
                      language={section.codeBlock.language}
                      filename={section.codeBlock.filename}
                    />
                  )}
                </section>
              ))}

              {/* Conclusion */}
              {post.content.conclusion && (
                <div className="pt-6 border-t border-border space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">Conclusão</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {post.content.conclusion}
                  </p>
                </div>
              )}
            </article>

            {/* Tags Footer */}
            <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5 text-accent" />
                Tags:
              </span>
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-secondary rounded-lg text-foreground/80 border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post Navigation Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-6 border-t border-border">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="p-4 rounded-xl bg-secondary hover:border-accent border border-border transition-colors group flex flex-col justify-between"
                >
                  <span className="text-[11px] text-muted-foreground uppercase font-semibold mb-1 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 text-accent group-hover:-translate-x-1 transition-transform" />
                    Post Anterior
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="p-4 rounded-xl bg-secondary hover:border-accent border border-border transition-colors group flex flex-col justify-between text-right"
                >
                  <span className="text-[11px] text-muted-foreground uppercase font-semibold mb-1 flex items-center justify-end gap-1">
                    Próximo Post
                    <ChevronRight className="w-3 h-3 text-accent group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
