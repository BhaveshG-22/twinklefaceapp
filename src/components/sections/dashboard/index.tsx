'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import EmblaCarousel from '@/components/ui/embla-carousel'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Define types for the component
interface StyleType {
  id: string
  title: string
  image: string
  variations: string[]
  color: string
  height: string
}

interface StyleCarouselProps {
  style: StyleType
  isHovered: boolean
  index: number
  cardHeight: string
}


// Generate a large array of portrait styles with varying dimensions for infinite masonry
const generatePortraitStyles = (): StyleType[] => {
  const styles: StyleType[] = []
  const heights = ['h-64', 'h-72', 'h-80', 'h-88', 'h-96', 'h-[400px]', 'h-[450px]', 'h-[500px]']
  const colors = [
    'from-blue-500 to-purple-500',
    'from-pink-500 to-red-500',
    'from-green-500 to-teal-500',
    'from-purple-500 to-indigo-500',
    'from-amber-500 to-orange-500',
    'from-cyan-500 to-blue-500',
    'from-red-500 to-pink-500',
    'from-rose-500 to-pink-500',
    'from-yellow-500 to-red-500',
    'from-gray-500 to-slate-600',
    'from-indigo-500 to-purple-600',
    'from-emerald-500 to-green-600'
  ]

  const styleNames = [
    'Professional Headshot', 'Anime Portrait', '3D Avatar', 'Artistic Sketch',
    'Vintage Style', 'Cyberpunk', 'Fantasy Warrior', 'Glamour Shot',
    'Superhero', 'Medieval Knight', 'Noir Detective', 'Renaissance',
    'Corporate Executive', 'Fashion Editorial', 'Watercolor', 'Pop Art',
    'Oil Painting', 'Comic Book', 'Steampunk', 'Gothic Portrait',
    'Pin-up Style', 'Film Noir', 'Retro Future', 'Abstract Art',
    'Impressionist', 'Baroque', 'Art Deco', 'Minimalist',
    'Grunge Style', 'Psychedelic', 'Vintage Hollywood', 'Modern Art',
    'Street Art', 'Digital Art', 'Concept Art', 'Fantasy Art',
    'Sci-Fi Portrait', 'Horror Style', 'Romantic Era', 'Victorian',
    'Edwardian', 'Art Nouveau', 'Cubist', 'Surreal',
    'Photorealistic', 'Hyperrealistic', 'Caricature', 'Silhouette',
    'High Fashion', 'Avant Garde', 'Experimental', 'Futuristic'
  ]

  // Portrait images from Unsplash with different crops and filters
  const imageUrls = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=450&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=650&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=480&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=520&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=580&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=470&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=550&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=650&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=480&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=580&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=450&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=550&fit=crop&crop=face'
  ]

  // Generate variations for each style (3-4 images per style for carousel)
  const generateVariations = (baseIndex: number, count: number = 3): string[] => {
    const variations: string[] = []
    for (let i = 0; i < count; i++) {
      const imageIndex = (baseIndex + i) % imageUrls.length
      variations.push(imageUrls[imageIndex])
    }
    return variations
  }

  // Generate 50+ cards for infinite scroll feeling
  for (let i = 0; i < 60; i++) {
    styles.push({
      id: `S${i + 1}`,
      title: styleNames[i % styleNames.length],
      image: imageUrls[i % imageUrls.length],
      variations: generateVariations(i, 4), // 4 variations per style
      color: colors[i % colors.length],
      height: heights[i % heights.length],
    })
  }

  return styles
}

const allStyles = generatePortraitStyles()

// Carousel component for style variations
const StyleCarousel = ({ style, isHovered, index: cardIndex, cardHeight }: StyleCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Determine if it's a small card (height-64, height-72)
  const isSmallCard = cardHeight === 'h-64' || cardHeight === 'h-72'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % style.variations.length)
    }, 1000) // Change image every 1 second

    return () => clearInterval(interval)
  }, [style.variations.length])

  return (
    <div className="relative w-full h-full">
      <Image
        src={isHovered ? style.variations[currentIndex] : style.image}
        alt={style.title}
        width={400}
        height={600}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:brightness-110"
        loading={cardIndex < 20 ? "eager" : "lazy"}
      />

      {/* Carousel dots - show only on hover and for larger cards */}
      {isHovered && !isSmallCard && (
        <div className="absolute top-3 right-3 flex gap-1 z-10">
          {style.variations.map((_: string, idx: number) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white shadow-lg' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      )}

      {/* For small cards, show minimal progress indicator */}
      {isHovered && isSmallCard && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-4 h-1 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / style.variations.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface DashboardContentProps {
  isCollapsed?: boolean
}

export default function DashboardContent({ isCollapsed = false }: DashboardContentProps) {
  const featuredSlides = [
    <div key="1" className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">AI Portrait Magic</h3>
        <p className="text-purple-100 text-sm">Transform your photos with stunning AI styles</p>
      </div>
    </div>,
    <div key="2" className="h-48 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Professional Headshots</h3>
        <p className="text-pink-100 text-sm">Create stunning professional portraits</p>
      </div>
    </div>,
    <div key="3" className="h-48 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Artistic Styles</h3>
        <p className="text-green-100 text-sm">Explore creative and artistic transformations</p>
      </div>
    </div>,
    <div key="4" className="h-48 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Fantasy & Fiction</h3>
        <p className="text-orange-100 text-sm">Become your favorite fictional character</p>
      </div>
    </div>,
    <div key="5" className="h-48 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Vintage Classic</h3>
        <p className="text-indigo-100 text-sm">Timeless vintage photography styles</p>
      </div>
    </div>,
    <div key="6" className="h-48 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Cyberpunk Future</h3>
        <p className="text-cyan-100 text-sm">Futuristic sci-fi transformations</p>
      </div>
    </div>,
    <div key="7" className="h-48 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Anime Avatar</h3>
        <p className="text-yellow-100 text-sm">Japanese anime character styles</p>
      </div>
    </div>,
    <div key="8" className="h-48 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Nature Portrait</h3>
        <p className="text-emerald-100 text-sm">Outdoor and nature-inspired looks</p>
      </div>
    </div>,
    <div key="9" className="h-48 bg-gradient-to-br from-rose-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Glamour Shot</h3>
        <p className="text-rose-100 text-sm">Hollywood glamour and elegance</p>
      </div>
    </div>,
    <div key="10" className="h-48 bg-gradient-to-br from-slate-600 to-gray-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Black & White</h3>
        <p className="text-slate-100 text-sm">Classic monochrome photography</p>
      </div>
    </div>,
    <div key="11" className="h-48 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Abstract Art</h3>
        <p className="text-violet-100 text-sm">Modern abstract artistic styles</p>
      </div>
    </div>,
    <div key="12" className="h-48 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Watercolor</h3>
        <p className="text-teal-100 text-sm">Soft watercolor painting effects</p>
      </div>
    </div>,
    <div key="13" className="h-48 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Oil Painting</h3>
        <p className="text-amber-100 text-sm">Classical oil painting techniques</p>
      </div>
    </div>,
    <div key="14" className="h-48 bg-gradient-to-br from-red-600 to-rose-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Comic Book</h3>
        <p className="text-red-100 text-sm">Superhero comic book styles</p>
      </div>
    </div>,
    <div key="15" className="h-48 bg-gradient-to-br from-lime-600 to-green-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Sketch Art</h3>
        <p className="text-lime-100 text-sm">Hand-drawn sketch illustrations</p>
      </div>
    </div>,
    <div key="16" className="h-48 bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
      <div className="text-center px-2">
        <h3 className="text-lg font-bold mb-1">Pop Art</h3>
        <p className="text-fuchsia-100 text-sm">Vibrant pop art transformations</p>
      </div>
    </div>
  ]

  return (
    <div className="flex flex-col gap-6 pb-12 w-full">
      {/* Content - With Padding */}
      <div className={`flex flex-col gap-6 transition-all duration-300 ${isCollapsed ? 'px-8' : 'px-6'}`}>
        {/* Debug: Sidebar state indicator */}
       

        {/* Featured Carousel - Top Section */}
        <div className={`w-full mx-auto mt-8 transition-all duration-300 ${isCollapsed ? 'max-w-8xl' : 'max-w-6xl'}`}>
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2">
              <span className="text-purple-400">✨</span>
              <span className="text-purple-300 text-sm font-medium">TRENDING NOW</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Most Popular This Week
            </h2>
            <p className="text-gray-400 text-sm">
              Join thousands transforming their photos with these trending styles
            </p>
          </div>
          <EmblaCarousel
            slides={featuredSlides}
            options={{ loop: true, align: 'center' }}
            className="rounded-lg"
          />
        </div>

        {/* Hero Text Content - Middle Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mt-8">


          <div className="space-y-4">

            <p className="text-gray-400 text-lg leading-relaxed max-w-4xl mx-auto">
              No prompts, no hassle – just pure creative magic. Upload your photo and watch it transform into stunning art.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pb-4">
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">10,000+ transformations today</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2 text-blue-400">
              <span className="text-sm font-medium">⚡ Instant results</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2 text-purple-400">
              <span className="text-sm font-medium">🎨 500+ styles</span>
            </div>
          </div>
        </div>

        {/* Infinite Masonry Grid */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-4 gap-4 space-y-4 w-full">
          {allStyles.map((style, index) => (
            <div
              key={style.id}
              className="break-inside-avoid mb-4 w-full"
            >
              <div className={`group relative ${style.height} rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20`}>
                <StyleCarousel
                  style={style}
                  isHovered={false}
                  index={index}
                  cardHeight={style.height}
                />

                {/* Base gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />

                {/* Animated gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent group-hover:from-purple-900/20 group-hover:via-transparent group-hover:to-transparent transition-all duration-500`} />

                {/* Style ID Badge */}
                <div className="absolute top-3 left-3 transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <Badge className={`bg-gradient-to-r ${style.color} text-white font-bold px-3 py-1 text-xs shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:px-4`}>
                    {style.id}
                  </Badge>
                </div>

                {/* Conditional Hover Overlay based on card size */}
                {(style.height === 'h-64' || style.height === 'h-72') ? (
                  /* Simple overlay for small cards */
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300 pointer-events-auto">
                      <Button className="bg-white/90 text-black hover:bg-white font-semibold shadow-lg px-3 py-1.5 text-xs rounded-full">
                        <span className="text-purple-600">🎨</span> Try
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Full overlay for larger cards */
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 pointer-events-none">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 pointer-events-auto">
                      <Button className="bg-white/95 text-black hover:bg-white font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 border border-black/20 backdrop-blur-sm px-4 py-2 text-sm">
                        <span className="text-purple-600">🎨</span> Try This Style
                      </Button>
                    </div>
                  </div>
                )}

                {/* Enhanced Style Title */}
                <div className="absolute bottom-3 left-3 right-3 transform transition-all duration-300 group-hover:bottom-4">
                  <h3 className="text-white font-bold text-sm drop-shadow-lg transition-all duration-300 group-hover:text-lg group-hover:drop-shadow-2xl">{style.title}</h3>
                  <div className="h-0 group-hover:h-4 transition-all duration-300 overflow-hidden">
                    <p className="text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Click to transform your photo</p>
                  </div>
                </div>

                {/* Enhanced border with glow effect */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/40 transition-all duration-300" />

                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${style.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
                  style={{
                    background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor'
                  }} />

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12" />
              </div>
            </div>
          )
          )}
        </div>

        {/* Browse All Styles Header */}
        <div className="text-center py-8 border-t border-gray-800/50 mt-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
              <span className="text-emerald-400">🎨</span>
              <span className="text-emerald-300 text-sm font-medium">COMPLETE COLLECTION</span>
            </div>
            <h3 className="text-4xl font-bold text-white">
              Explore All Styles
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse our complete library of 500+ professional AI transformations.
              From artistic masterpieces to professional headshots.
            </p>
          </div>
        </div>

        {/* Load More Section */}
        <div className="text-center py-12 space-y-6">
          <div className="space-y-2">
            <p className="text-gray-400 text-lg">
              Discover endless possibilities
            </p>
            <p className="text-gray-500 text-sm">
              New styles added weekly • Over 50 categories • Professional quality
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" className="text-gray-300 border-gray-600 hover:text-white hover:border-white hover:bg-white/5 px-6 py-3">
              <span className="mr-2">🔥</span>
              Popular This Week
            </Button>
            <Button variant="outline" className="text-gray-300 border-gray-600 hover:text-white hover:border-white hover:bg-white/5 px-6 py-3">
              <span className="mr-2">✨</span>
              New Arrivals
            </Button>
            <Button variant="outline" className="text-gray-300 border-gray-600 hover:text-white hover:border-white hover:bg-white/5 px-6 py-3">
              <span className="mr-2">💎</span>
              Premium Styles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}