"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"

interface DraggableMarqueeProps {
  children: React.ReactNode
  speed?: number // pixels per second
  className?: string
  gap?: string
}

export function DraggableMarquee({
  children,
  speed = 50,
  className = "",
  gap = "gap-3 md:gap-4",
}: DraggableMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const contentWidthRef = useRef<number>(0)

  // Calculate content width
  useEffect(() => {
    if (contentRef.current) {
      contentWidthRef.current = contentRef.current.scrollWidth / 2
    }
  }, [children])

  // Animation loop
  const animate = useCallback(
    (currentTime: number) => {
      if (!isDragging && contentWidthRef.current > 0) {
        if (lastTimeRef.current === 0) {
          lastTimeRef.current = currentTime
        }

        const deltaTime = (currentTime - lastTimeRef.current) / 1000
        lastTimeRef.current = currentTime

        setTranslateX((prev) => {
          let newX = prev - speed * deltaTime
          // Reset when we've scrolled through half the content (the duplicated part)
          if (Math.abs(newX) >= contentWidthRef.current) {
            newX = newX + contentWidthRef.current
          }
          return newX
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [isDragging, speed],
  )

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(translateX)
    lastTimeRef.current = 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX
    const walk = x - startX
    let newX = scrollLeft + walk

    // Wrap around
    if (contentWidthRef.current > 0) {
      while (newX > 0) {
        newX -= contentWidthRef.current
      }
      while (Math.abs(newX) >= contentWidthRef.current) {
        newX += contentWidthRef.current
      }
    }

    setTranslateX(newX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    lastTimeRef.current = 0
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      lastTimeRef.current = 0
    }
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollLeft(translateX)
    lastTimeRef.current = 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX
    const walk = x - startX
    let newX = scrollLeft + walk

    // Wrap around
    if (contentWidthRef.current > 0) {
      while (newX > 0) {
        newX -= contentWidthRef.current
      }
      while (Math.abs(newX) >= contentWidthRef.current) {
        newX += contentWidthRef.current
      }
    }

    setTranslateX(newX)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    lastTimeRef.current = 0
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={handleDragStart}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        ref={contentRef}
        className={`flex ${gap}`}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? "none" : undefined,
        }}
      >
        <div className="flex [&_img]:pointer-events-none [&_img]:select-none" style={{ gap: "inherit" }}>
          {children}
        </div>
        <div className="flex [&_img]:pointer-events-none [&_img]:select-none" style={{ gap: "inherit" }}>
          {children}
        </div>
      </div>
    </div>
  )
}
