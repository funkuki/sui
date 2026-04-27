import Link from 'next/link'
import Button from '@/components/Button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-5 text-center">
      <p className="text-7xl font-bold text-border select-none">404</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-muted">This page doesn't exist or has been moved.</p>
      </div>
      <Button as={Link} href="/" variant="primary">
        Back to home
      </Button>
    </div>
  )
}
