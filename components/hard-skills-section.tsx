"use client"

import { Code2, Boxes, Wrench } from "lucide-react"
import type React from "react"

interface Skill {
  name: string
  icon?: string
}

interface HardSkillsProps {
  skills: {
    languages: Skill[]
    frameworks: Skill[]
    tools: Skill[]
  }
}

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-secondary hover:bg-accent/10 border border-border hover:border-accent/30 rounded-full text-sm font-medium text-foreground transition-all duration-200 cursor-default">
      {skill.name}
    </span>
  )
}

function SkillCategory({
  title,
  icon: Icon,
  skills,
}: {
  title: string
  icon: React.ElementType
  skills: Skill[]
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-accent" />
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <SkillBadge key={index} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export function HardSkillsSection({ skills }: HardSkillsProps) {
  return (
    <div className="p-4 md:p-6 bg-secondary/50 rounded-xl md:rounded-2xl border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Technical Skills</h3>
      <div className="space-y-6">
        <SkillCategory title="Languages" icon={Code2} skills={skills.languages} />
        <SkillCategory title="Frameworks & Libraries" icon={Boxes} skills={skills.frameworks} />
        <SkillCategory title="Tools & Platforms" icon={Wrench} skills={skills.tools} />
      </div>
    </div>
  )
}
