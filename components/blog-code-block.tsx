'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface BlogCodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function BlogCodeBlock({ code, language = 'tsx', filename }: BlogCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code: ', err)
    }
  }

  return (
    <div className="my-6 rounded-xl border border-border bg-black/90 overflow-hidden shadow-xl font-mono text-xs md:text-sm">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-border/40 text-muted-foreground text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          {filename && <span className="ml-2 font-sans font-medium text-foreground/80">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          {language && <span className="uppercase text-[10px] tracking-wider font-semibold text-accent/80">{language}</span>}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/50 hover:bg-secondary text-foreground transition-colors text-xs cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-emerald-400/90 leading-relaxed font-mono">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
