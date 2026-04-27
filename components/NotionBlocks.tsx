import Image from 'next/image'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import BookmarkCard from './BookmarkCard'

type Props = { blocks: BlockObjectResponse[] }

function richText(rt: any[]): React.ReactNode {
  if (!Array.isArray(rt)) return null
  return rt.map((r: any, i: number) => {
    const text = r.plain_text ?? ''
    const { bold, italic, code, strikethrough } = r.annotations ?? {}
    let node: React.ReactNode = text
    if (code) node = <code key={i} style={{ fontFamily: 'monospace', background: '#f1eeea', padding: '2px 6px', borderRadius: 4, fontSize: '0.9em' }}>{text}</code>
    if (bold) node = <strong key={i}>{node}</strong>
    if (italic) node = <em key={i}>{node}</em>
    if (strikethrough) node = <s key={i}>{node}</s>
    if (r.href) node = <a key={i} href={r.href} style={{ color: '#0c0c0c', borderBottom: '1px solid #2e2e2e' }} target="_blank" rel="noopener noreferrer">{node}</a>
    return <span key={i}>{node}</span>
  })
}

const proseBase: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 20,
  lineHeight: 1.95,
  color: '#0c0c0c',
  maxWidth: 760,
  margin: '0 auto',
}

export default function NotionBlocks({ blocks }: Props) {
  return (
    <div style={proseBase}>
      {blocks.map((block: any) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id} style={{ margin: '0 0 22px' }}>
                {richText(block.paragraph.rich_text)}
              </p>
            )
          case 'heading_1':
            return (
              <h1 key={block.id} style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 40,
                marginTop: 64,
                marginBottom: 16,
                color: '#0c0c0c',
                borderTop: '1px solid #e6e6e6',
                paddingTop: 40,
              }}>
                {richText(block.heading_1.rich_text)}
              </h1>
            )
          case 'heading_2':
            return (
              <h2 key={block.id} style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 36,
                marginTop: 56,
                marginBottom: 12,
                color: '#0c0c0c',
                borderTop: '1px solid #e6e6e6',
                paddingTop: 36,
              }}>
                {richText(block.heading_2.rich_text)}
              </h2>
            )
          case 'heading_3':
            return (
              <h3 key={block.id} style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 32,
                marginTop: 48,
                marginBottom: 16,
                color: '#0c0c0c',
              }}>
                {richText(block.heading_3.rich_text)}
              </h3>
            )
          case 'bulleted_list_item':
            return (
              <ul key={block.id} style={{ paddingLeft: 22, margin: '0 0 8px' }}>
                <li style={{ marginBottom: 8 }}>
                  {richText(block.bulleted_list_item.rich_text)}
                </li>
              </ul>
            )
          case 'numbered_list_item':
            return (
              <ol key={block.id} style={{ paddingLeft: 22, margin: '0 0 8px' }}>
                <li style={{ marginBottom: 8 }}>
                  {richText(block.numbered_list_item.rich_text)}
                </li>
              </ol>
            )
          case 'quote':
            return (
              <blockquote key={block.id} style={{
                borderLeft: '3px solid #e6e6e6',
                paddingLeft: 24,
                fontStyle: 'italic',
                color: '#8f8a8a',
                margin: '32px 0',
              }}>
                {richText(block.quote.rich_text)}
              </blockquote>
            )
          case 'divider':
            return <hr key={block.id} style={{ border: 'none', borderTop: '1px solid #e6e6e6', margin: '48px 0' }} />
          case 'callout':
            return (
              <div key={block.id} style={{
                border: '1px solid #e6e6e6',
                borderRadius: 12,
                padding: '20px 24px',
                margin: '24px 0',
                display: 'flex',
                gap: 16,
                background: '#fff',
              }}>
                {block.callout.icon?.emoji && (
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{block.callout.icon.emoji}</span>
                )}
                <div>{richText(block.callout.rich_text)}</div>
              </div>
            )
          case 'image': {
            const src =
              block.image.type === 'external'
                ? block.image.external.url
                : block.image.file.url
            const caption = block.image.caption?.map((r: any) => r.plain_text).join('') ?? ''
            return (
              <figure key={block.id} style={{ margin: '40px 0' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid #e6e6e6',
                }}>
                  <Image
                    src={src}
                    alt={caption}
                    width={760}
                    height={480}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                {caption && (
                  <figcaption style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#8f8a8a',
                    marginTop: 10,
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {caption}
                  </figcaption>
                )}
              </figure>
            )
          }
          case 'code':
            return (
              <pre key={block.id} style={{
                background: '#f1eeea',
                borderRadius: 12,
                padding: '20px 24px',
                margin: '24px 0',
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: 15,
                lineHeight: 1.7,
                color: '#2e2e2e',
              }}>
                <code>
                  {block.code.rich_text?.map((r: any) => r.plain_text).join('')}
                </code>
              </pre>
            )
          case 'bookmark':
            return (
              <div key={block.id} style={{ margin: '24px 0' }}>
                <BookmarkCard url={block.bookmark.url} />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
