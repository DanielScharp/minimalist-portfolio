import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogData } from '@/lib/portfolio-data'
import { getRelativeTime, formatDate } from '@/lib/utils'

interface BlogSectionProps {
  data?: typeof blogData
}

export function BlogSection({ data = blogData }: BlogSectionProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Blog</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.posts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index} className="group block h-full">
            <article className="bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/10 transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="aspect-video overflow-hidden bg-background">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground mb-3">
                    <span className="px-2.5 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      {getRelativeTime(post.date)}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 md:py-1 bg-background rounded text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0">
                <span className="inline-flex items-center gap-2 text-xs md:text-sm text-accent group-hover:gap-3 transition-all font-medium">
                  Ler mais
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
