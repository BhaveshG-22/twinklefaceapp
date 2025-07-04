'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

interface EmblaCarouselProps {
  slides: React.ReactNode[]
  options?: object
  className?: string
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides, options, className = '' }) => {
  const [emblaRef] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false })
  ])

  return (
    <div className={`relative ${className} rounded-lg overflow-hidden`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_20%] min-w-0 pl-2" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-10 -ml-5 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-10 -mr-5 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  )
}

export default EmblaCarousel