import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#e8e5e0]">
      <div className="flex flex-col items-center gap-5 pt-16 px-5 text-center z-10">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none">
          Peek-a-boo!
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-sm">
          Whatever you&apos;re looking for is still hiding from us.
        </p>
        <Button as={Link} href="/" variant="primary" className="mt-1">
          Go back HOME
        </Button>
      </div>
      <div className="relative w-full max-w-2xl mt-auto">
        <Image
          src="/assets/sui-hide-and-seek.png"
          alt="Sui hide and seek"
          width={900}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  )
}
