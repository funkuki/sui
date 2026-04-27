'use client'

import TagPill from './TagPill'

type FilterBarProps = {
  tags: string[]
  active: string | null
  onChange: (tag: string | null) => void
}

export default function FilterBar({ tags, active, onChange }: FilterBarProps) {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 30 }}
    >
      <TagPill active={active === null} onClick={() => onChange(null)}>
        all
      </TagPill>
      {tags.map((tag) => (
        <TagPill key={tag} active={active === tag} onClick={() => onChange(tag)}>
          {tag}
        </TagPill>
      ))}
    </div>
  )
}
