import Link from 'next/link'
import Button from '@/components/Button'
import PageClass from '@/components/PageClass'

export default function NotFound() {
  return (
    <>
      <PageClass className="page-404" />
      <div className="relative -mt-[var(--header-h)] h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_60%] md:object-center"
        >
          <source src="/assets/hero-404.webm" type="video/webm" />
          <source src="/assets/hero-404.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col items-center gap-5 px-5 text-center pt-[calc(var(--header-h)+4rem)] z-10">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none">
            Peek-a-boo!
          </h1>
          <p className="text-[20px] md:text-[32px] md:whitespace-nowrap text-neutral-600">
            Whatever you&apos;re looking for is still hiding from us.
          </p>
          <Button
            as={Link}
            href="/"
            variant="primary"
            className="mt-1 !text-[24px] !py-[10px] !px-7 !bg-[rgba(46,46,46,0.8)] !border-[rgba(46,46,46,0.8)] hover:!bg-[rgba(46,46,46,0.8)] hover:!border-[rgba(46,46,46,0.8)] hover:!text-white"
          >
            Go back HOME
          </Button>
        </div>
      </div>
    </>
  )
}
