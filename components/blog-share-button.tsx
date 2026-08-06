'use client'

import { useState } from 'react'
import { Link2, Check, Share2 } from 'lucide-react'

interface BlogShareButtonProps {
  title: string
}

export function BlogShareButton({ title }: BlogShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium transition-colors cursor-pointer border border-border"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-500">Link Copiado!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5 text-accent" />
            <span>Compartilhar</span>
          </>
        )}
      </button>
    </div>
  )
}
