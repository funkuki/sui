'use client'

import { useState, useMemo } from 'react'
import type { WorkPost, BlogPost, AssetPost } from '@/types'
import Card from './Card'
import FilterBar from './FilterBar'

type PostGridProps =
  | { type: 'work'; posts: WorkPost[]; allTags: string[] }
  | { type: 'blog'; posts: BlogPost[]; allTags: string[] }
  | { type: 'assets'; posts: AssetPost[]; allTags: string[] }

export default function PostGrid(props: PostGridProps) {
  const { type, posts, allTags } = props
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.category === activeTag) : posts),
    [activeTag, posts]
  )

  const cols =
    type === 'blog'
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <>
      {allTags.length > 0 && (
        <FilterBar tags={allTags} active={activeTag} onChange={setActiveTag} />
      )}

      {filtered.length === 0 ? (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 22,
            color: '#8f8a8a',
            padding: 60,
            textAlign: 'center',
          }}
        >
          No items match — try another filter.
        </p>
      ) : (
        <div className={`grid ${cols} gap-9`}>
          {type === 'work' &&
            (filtered as WorkPost[]).map((post) => (
              <Card key={post.id} type="work" post={post} />
            ))}
          {type === 'blog' &&
            (filtered as BlogPost[]).map((post) => (
              <Card key={post.id} type="blog" post={post} />
            ))}
          {type === 'assets' &&
            (filtered as AssetPost[]).map((post) => (
              <Card key={post.id} type="assets" post={post} />
            ))}
        </div>
      )}
    </>
  )
}
