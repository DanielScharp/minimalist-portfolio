import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { profileData, blogData } from '@/lib/portfolio-data'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { BlogSection } from '@/components/blog-section'

export const metadata: Metadata = {
  title: 'Blog | Daniel Scharp',
  description: 'Artigos sobre desenvolvimento web, Next.js, React, C#, arquitetura de software e tecnologia.',
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
          <ProfileSidebar data={profileData} />

          {/* Main Content */}
          <main className="flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="mb-6 pb-4 border-b border-border flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform" />
                <span>Voltar ao Portfólio</span>
              </Link>
            </div>

            <BlogSection data={blogData} />
          </main>
        </div>
      </div>
    </div>
  )
}
