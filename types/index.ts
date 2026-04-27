export type WorkPost = {
  id: string
  title: string
  slug: string
  status: 'Draft' | 'Published'
  publishedAt: string
  coverUrl: string
  iconUrl: string
  tags: string[]
  category: string
  summary: string
  client: string
  year: number
  featured: boolean
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  status: 'Draft' | 'Published'
  publishedAt: string
  coverUrl: string
  tags: string[]
  category: string
  summary: string
  featured: boolean
}

export type AssetPost = {
  id: string
  title: string
  slug: string
  status: 'Draft' | 'Published'
  publishedAt: string
  coverUrl: string
  tags: string[]
  category: string
  summary: string
  price: number
  fileUrl: string
  previewUrls: string[]
  downloads: number
}

export type NavItem = {
  label: string
  href: string
}
