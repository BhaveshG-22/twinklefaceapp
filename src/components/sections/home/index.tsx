'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Compare } from "@/components/ui/compare"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, HelpCircle, Eye, Play } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"

// StyleCarousel component for the Pinterest gallery
const StyleCarousel = ({ style, cardHeight }: {
  style: { id: string; title: string; image: string; variations: string[]; color: string; height: string }
  cardHeight: string
}) => {
  return (
    <div className={`relative ${cardHeight} w-full overflow-hidden bg-gray-900`}>
      {/* Main portrait image */}
      <Image
        src={style.image}
        alt={style.title}
        width={400}
        height={500}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Style variations overlay (shows on hover) */}
      {style.variations && style.variations.length > 1 && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="grid grid-cols-2 h-full gap-1 p-1">
            {style.variations.slice(0, 4).map((variation: string, idx: number) => (
              <Image
                key={idx}
                src={variation}
                alt={`${style.title} variation ${idx + 1}`}
                width={200}
                height={250}
                className="w-full h-full object-cover rounded-sm"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



// Infinite carousel images - multiple sets for seamless loop

// Masonry grid images with varied heights for dynamic layout
const MASONRY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    height: 300,
    category: "Professional",
    title: "Business Portrait",
    style: "Corporate Headshot"
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop",
    height: 400,
    category: "Anime",
    title: "Anime Avatar",
    style: "Manga Style"
  },
  {
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
    height: 250,
    category: "Abstract",
    title: "Abstract Art",
    style: "Surreal Portrait"
  },
  {
    src: "https://cdn.pixabay.com/photo/2018/01/03/19/54/fashion-3059143_1280.jpg?w=400&h=700&fit=crop",
    height: 350,
    category: "3D",
    title: "3D Character",
    style: "Realistic Model"
  },
  {
    src: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&h=600&fit=crop",
    height: 300,
    category: "Cartoon",
    title: "Cartoon Avatar",
    style: "Disney Style"
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    height: 250,
    category: "Professional",
    title: "Executive Portrait",
    style: "LinkedIn Ready"
  },
  {
    src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=750&fit=crop",
    height: 375,
    category: "Abstract",
    title: "Digital Art",
    style: "Futuristic"
  },
  {
    src: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
    height: 300,
    category: "Cartoon",
    title: "Character Design",
    style: "Animated"
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=650&fit=crop",
    height: 325,
    category: "Professional",
    title: "Creative Portrait",
    style: "Artistic"
  },
  {
    src: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=550&fit=crop",
    height: 275,
    category: "3D",
    title: "Sci-Fi Character",
    style: "Cyberpunk"
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=700&fit=crop",
    height: 350,
    category: "Portrait",
    title: "Classic Portrait",
    style: "Traditional"
  },
  {
    src: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&h=600&fit=crop",
    height: 300,
    category: "Cartoon",
    title: "Fun Avatar",
    style: "Colorful"
  }
]

const BEFORE_AFTER_EXAMPLES = [
  {
    title: "Professional Headshots",
    before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    category: "Professional"
  },
  {
    title: "Anime Style Avatars",
    before: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    category: "Anime"
  },
  {
    title: "3D Character Models",
    before: "https://cdn.pixabay.com/photo/2018/01/03/19/54/fashion-3059143_1280.jpg?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop",
    category: "3D"
  },
  {
    title: "Cartoon Characters",
    before: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&h=500&fit=crop",
    category: "Cartoon"
  },
  {
    title: "Abstract Art",
    before: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
    category: "Abstract"
  }
]

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    avatar: "https://cdn.pixabay.com/photo/2018/01/03/19/54/fashion-3059143_1280.jpg?w=64&h=64&fit=crop&crop=face",
    content: "TwinkleFace transformed my social media presence! The AI-generated portraits are incredibly realistic and professional.",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    content: "The variety of styles is amazing. From anime to abstract art, TwinkleFace helps me explore different creative directions.",
    rating: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Business Owner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    content: "Perfect for professional headshots! The quality rivals expensive studio photography at a fraction of the cost.",
    rating: 5
  },
  {
    name: "Alex Kim",
    role: "Influencer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    content: "My followers can&apos;t believe these are AI-generated! The cartoon style avatars are my new favorite for Instagram.",
    rating: 5
  }
]

const FAQ_DATA = [
  {
    question: "How does TwinkleFace AI work?",
    answer: "TwinkleFace uses advanced machine learning algorithms to analyze your photos and transform them into various artistic styles. Simply upload your photo, choose a style, and our AI does the rest in minutes."
  },
  {
    question: "What photo formats are supported?",
    answer: "We support JPG, PNG, and WebP formats. For best results, use high-resolution photos with clear facial features and good lighting."
  },
  {
    question: "How long does it take to generate photos?",
    answer: "Most transformations complete within 2-5 minutes. Complex styles like 3D avatars may take up to 10 minutes for optimal quality."
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "Yes! All generated images are yours to use for personal and commercial purposes. We don&apos;t retain any rights to your transformed photos."
  },
  {
    question: "What if I&apos;m not satisfied with the results?",
    answer: "We offer a 30-day money-back guarantee. If you&apos;re not happy with your results, contact our support team for a full refund."
  }
]



// Remove HeroRotatedGalleryGrid and use the new implementation



// Generate portrait styles for masonry background
const generateAllStyles = () => {
  const styles = []
  const heights = ['h-64', 'h-72', 'h-80', 'h-96', 'h-[400px]', 'h-[450px]', 'h-[500px]', 'h-[350px]'] // Bigger heights for Pinterest cards
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
    'Street Art', 'Digital Art', 'Concept Art', 'Fantasy Art'
  ]

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
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=450&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=550&fit=crop&crop=face'
  ]

  // Generate variations for each style (4 images per style for carousel)
  const generateVariations = (baseIndex: number, count: number = 4) => {
    const variations = []
    for (let i = 0; i < count; i++) {
      const imageIndex = (baseIndex + i) % imageUrls.length
      variations.push(imageUrls[imageIndex])
    }
    return variations
  }

  // Generate 60 cards for infinite scroll feeling
  for (let i = 0; i < 60; i++) {
    styles.push({
      id: `S${i + 1}`,
      title: styleNames[i % styleNames.length],
      image: imageUrls[i % imageUrls.length],
      variations: generateVariations(i, 4),
      color: colors[i % colors.length],
      height: heights[i % heights.length],
    })
  }

  return styles
}

const allStyles = generateAllStyles()

// PhotoAI-style Grid Background Component with Continuous Scroll
const HeroInfiniteSliderBg = () => {
  // Create grid of small portrait images similar to PhotoAI
  const createGridImages = () => {
    const gridImages = []
    for (let i = 0; i < 200; i++) { // More images for seamless scroll
      gridImages.push({
        id: i,
        src: allStyles[i % allStyles.length].image,
        alt: `Portrait ${i}`
      })
    }
    return gridImages
  }

  const gridImages = createGridImages()

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Desktop Grid Background - Large screens and up */}
      <div className="absolute inset-0 scale-150 -translate-y-32 hidden lg:block" style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(20deg) rotateY(0deg) skewX(335deg)',
        width: '150%',
        height: '150%',
        top: '-25%',
        left: '-25%'
      }}>
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            className="flex gap-2 h-full"
            animate={{
              x: [0, -1000],
              y: [100, -100]
            }}
            transition={{
              duration: 120,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          >
            {Array.from({ length: 10 }).map((_, sectionIdx) => (
              <div key={sectionIdx} className="flex-shrink-0 w-[2400px] h-full">
                <div className="grid w-full h-full overflow-hidden" style={{
                  gridTemplateColumns: 'repeat(18, 1fr)',
                  gridTemplateRows: 'repeat(8, 1fr)',
                  gap: '4px'
                }}>
                  {gridImages.slice(sectionIdx * 36, (sectionIdx * 36) + 144).map((image) => (
                    <div
                      key={`${sectionIdx}-${image.id}`}
                      className="w-full h-full overflow-hidden"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={100}
                        height={120}
                        className="w-full h-full object-cover rounded-sm opacity-90"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile and Tablet Background - Up to large screens */}
      <div className="absolute inset-0 lg:hidden overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: 'scale(1.1) rotate(6deg)',
            top: '-20%',
            left: '-20%',
            right: '-20%',
            bottom: '-20%'
          }}
        >
          {/* Multiple rows with different speeds for depth */}
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <motion.div
              key={rowIdx}
              className="flex gap-2 w-max"
              animate={{
                x: rowIdx % 2 === 0 ? [0, -1200] : [-1200, 0]
              }}
              transition={{
                duration: 80 + rowIdx * 15,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{
                position: 'absolute',
                top: `${rowIdx * 10}%`,
                left: rowIdx % 2 === 0 ? '0%' : '-50%'
              }}
            >
              {gridImages.slice(rowIdx * 6, (rowIdx * 6) + 12).map((image, imgIdx) => (
                <div
                  key={`mobile-row-${rowIdx}-img-${imgIdx}`}
                  className="flex-shrink-0 w-20 h-28 sm:w-24 sm:h-32 overflow-hidden rounded-xl shadow-sm"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={112}
                    className="w-full h-full object-cover opacity-50"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {gridImages.slice(rowIdx * 6, (rowIdx * 6) + 12).map((image, imgIdx) => (
                <div
                  key={`mobile-row-${rowIdx}-img-dup-${imgIdx}`}
                  className="flex-shrink-0 w-20 h-28 sm:w-24 sm:h-32 overflow-hidden rounded-xl shadow-sm"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={112}
                    className="w-full h-full object-cover opacity-50"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lighter overlay for better background visibility */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
}

// Infinite Masonry Grid Component
// Define a type for masonry items
interface MasonryItem {
  src: string;
  height: number;
  category: string;
  title: string;
  style: string;
  id?: number | string;
}

const InfiniteMasonryGrid = ({ items }: { items: MasonryItem[] }) => {
  const columns = 4

  // Masonry layout calculation
  const calculateMasonryLayout = (items: MasonryItem[], columns: number) => {
    const columnHeights = new Array(columns).fill(0)
    return items.map((item, index) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      const top = columnHeights[shortestColumnIndex]
      columnHeights[shortestColumnIndex] += item.height + 16 // Add gap
      return {
        ...item,
        column: shortestColumnIndex,
        top,
        index
      }
    })
  }

  const layoutItems = calculateMasonryLayout(items, columns)

  return (
    <div className="relative w-full" style={{ height: '800px' }}>
      <div className="grid grid-cols-4 gap-4 h-full overflow-hidden">
        {Array.from({ length: columns }).map((_, columnIndex) => (
          <div key={columnIndex} className="relative">
            <motion.div
              className="space-y-4"
              animate={{ y: columnIndex % 2 === 0 ? [0, -200] : [0, 200] }}
              transition={{
                duration: 20 + columnIndex * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              {layoutItems
                .filter((item: (MasonryItem & { column: number; top: number; index: number })) => item.column === columnIndex)
                .map((item: (MasonryItem & { column: number; top: number; index: number }), index: number) => (
                  <motion.div
                    key={`${item.index}-${columnIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300"
                    style={{ height: `${item.height}px` }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Badge className="mb-2 bg-purple-600/80 text-white border-0">
                          {item.category}
                        </Badge>
                        <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                        <p className="text-gray-300 text-xs">{item.style}</p>
                      </div>

                      {/* View Button */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Category Color Accent */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${item.category === 'Professional' ? 'bg-emerald-500' :
                      item.category === 'Anime' ? 'bg-pink-500' :
                        item.category === '3D' ? 'bg-blue-500' :
                          item.category === 'Cartoon' ? 'bg-orange-500' :
                            item.category === 'Abstract' ? 'bg-purple-500' : 'bg-gray-500'
                      }`} />
                  </motion.div>
                ))
              }
            </motion.div>
          </div>
        ))}
      </div>

      {/* Gradient Fade Overlays */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
    </div>
  )
}

export default function HomeContent(): React.ReactElement {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentExample, setCurrentExample] = useState(0)
  const [masonryItems, setMasonryItems] = useState(MASONRY_IMAGES)
  const [isLoadingMore, setIsLoadingMore] = useState(false)


  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])


  // Auto-load more masonry items
  useEffect(() => {
    const loadMoreItems = () => {
      setIsLoadingMore(true)
      setTimeout(() => {
        const newItems = MASONRY_IMAGES.map((item, index) => ({
          ...item,
          src: item.src + `&t=${Date.now() + index}`, // Add timestamp to make URLs unique
          id: Date.now() + index
        }))
        setMasonryItems(prev => [...prev, ...newItems])
        setIsLoadingMore(false)
      }, 1000)
    }

    const interval = setInterval(loadMoreItems, 8000) // Load more every 8 seconds
    return () => clearInterval(interval)
  }, [])


  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % BEFORE_AFTER_EXAMPLES.length)
  }

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + BEFORE_AFTER_EXAMPLES.length) % BEFORE_AFTER_EXAMPLES.length)
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/pixleGlowLogo.png"
                alt="TwinkleFace Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain scale-125"
              />
              <span className="text-xl font-bold text-white">TwinkleFace</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
                onClick={() => window.location.href = '/dashboard'}
              >
                Dashboard
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => window.location.href = '/dashboard'}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Diagonal Grid Background */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-20">
        {/* Diagonal Grid Background */}
        <HeroInfiniteSliderBg />

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 pt-16 lg:pt-24 px-4 lg:px-8">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Price Badge */}
            <div className="inline-flex items-center gap-2 bg-green-600/95 backdrop-blur-sm text-white font-bold px-4 sm:px-6 py-3 sm:py-3 rounded-full mb-6 lg:mb-8 border border-green-500/40 shadow-2xl drop-shadow-2xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              <span className="text-lg sm:text-2xl">💰</span>
              <span className="text-sm sm:text-lg">
                <span className="block sm:hidden">$0.99 → End Overpriced Photos</span>
                <span className="hidden sm:block">$0.99 → The End of Overpriced Photos</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 lg:mb-6 leading-tight drop-shadow-2xl">
              <span className="text-orange-500 drop-shadow-lg">🔥</span> <span className="bg-gradient-to-r from-black/5 to-black/5 backdrop-blur-[1px] px-1 rounded-lg text-shadow-lg" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>Your Face Deserves AI Glow</span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-xl lg:text-2xl text-gray-300 mb-3 lg:mb-8 leading-relaxed drop-shadow-xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              <span className="font-bold">Skip the shoot.</span> <span className="underline">Upload your pic.</span> Get <em className="text-yellow-300">instant glow-ups</em> in <strong>every style</strong>.
            </p>

            {/* Feature Bullets - PhotoAI style with emojis */}
            <ul className="space-y-2 lg:space-y-4 text-sm sm:text-base lg:text-lg text-white/90 mb-4 lg:mb-8 drop-shadow-xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              <li className="flex items-start gap-2 lg:gap-3">
                <span className="text-green-400 text-xs sm:text-base lg:text-lg">✓</span>
                <span className="lg:hidden">Keep 100% of photos with yourself & get AI photos in minutes ⚡</span>
                <span className="hidden lg:inline">Keep <strong>100%</strong> of photos with yourself & get <span className="text-blue-300 font-semibold">AI photos</span> in <em>minutes</em> ⚡</span>
              </li>
              <li className="flex items-start gap-2 lg:gap-3">
                <span className="text-green-400 text-xs sm:text-base lg:text-lg">✓</span>
                <span className="lg:hidden">14 AI styles: choose a pro, anime, young, boss, place or action 🎨</span>
                <span className="hidden lg:inline"><strong>14 AI styles:</strong> choose a <em>pro</em>, <em>anime</em>, <em>young</em>, <em>boss</em>, <em>place</em> or <em>action</em> 🎨</span>
              </li>
              <li className="flex items-start gap-2 lg:gap-3">
                <span className="text-green-400 text-green-400 text-xs sm:text-base lg:text-lg">✓</span>
                <span className="lg:hidden">Full rights: use photos for professional, business, or Tinder 💼❤️</span>
                <span className="hidden lg:inline"><strong>Full rights:</strong> use photos for <em>professional</em>, <em>business</em>, or <span className="underline">Tinder</span> 💼❤️</span>
              </li>
            </ul>
          </div>

          {/* Right: Signup Form Card */}
          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
            <div className="relative">
              <div className="bg-white border border-gray-300 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                  {/* Header with icon and title */}
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Free Photo Generator*</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Get Started in 30 Seconds</h3>
                  </div>

                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    🎨 Let&apos;s get your first photo for free
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-gray-500 font-medium">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 !border-2 !border-gray-400 text-gray-700 hover:text-gray-800 py-3 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <FcGoogle className="text-lg" />
                    Continue with Google
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-600">
                      Already have an account? We&apos;ll log you in automatically
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinterest-style Gallery Section - Edge to Edge with Overlaid Header */}
      <section className="w-full bg-gray-900 relative">

        {/* Full-width Masonry Grid - Edge to Edge */}
        <div className="w-full px-2 pt-8">
          <div className="columns-2 sm:columns-3 md:columns-5 lg:columns-6 gap-3">
            {allStyles.slice(0, 30).map((style) => {
              return (
                <div
                  key={style.id}
                  className="break-inside-avoid mb-4 w-full"
                >
                  <div className={`group relative ${style.height} rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20`}>
                    <StyleCarousel
                      style={style}
                      cardHeight={style.height}
                    />

                    {/* Base gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />

                    {/* Animated gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent group-hover:from-purple-900/20 group-hover:via-transparent group-hover:to-transparent transition-all duration-500`} />

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
            })}
          </div>
        </div>

        {/* Overlaid Header Section with Enhanced Background */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              {/* Header with Dark Background Box */}
              <div className="inline-block bg-black/80 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/10">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  ✨ AI Photo Gallery
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Let&apos;s give you a makeover
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      {/* Interactive Before/After Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See the magic in action
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform your ordinary photos into extraordinary AI-generated masterpieces
            </p>
          </div>

          {/* Interactive Slider Gallery */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentExample}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid md:grid-cols-3 gap-8"
                >
                  {BEFORE_AFTER_EXAMPLES.slice(currentExample, currentExample + 3).map((example, index) => (
                    <div key={`${currentExample}-${index}`} className="group">
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800 mb-4">
                        <Compare
                          firstImage={example.before}
                          secondImage={example.after}
                          firstImageClassName="object-cover"
                          secondImageClassname="object-cover"
                          className="h-full w-full"
                          slideMode="hover"
                          showHandlebar={true}
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/70 text-white border-0">
                            {example.category}
                          </Badge>
                        </div>
                        {/* Before/After Labels */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">Before</span>
                          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">After</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{example.title}</h3>
                      <p className="text-gray-400 text-sm">
                        Professional AI transformation in minutes
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevExample}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextExample}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What our users say
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of happy creators
            </p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
              >
                <div className="text-center">
                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-gray-300 text-lg mb-6 italic">
                    &ldquo;{TESTIMONIALS[currentTestimonial].content}&rdquo;
                  </p>

                  {/* User Info */}
                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src={TESTIMONIALS[currentTestimonial].avatar}
                      alt={TESTIMONIALS[currentTestimonial].name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full border-2 border-purple-500/50"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {TESTIMONIALS[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {TESTIMONIALS[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to create amazing photos
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our advanced AI technology makes photo transformation simple and accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multiple Art Styles</h3>
              <p className="text-gray-400">
                Choose from professional, anime, 3D, cartoon, abstract, and portrait styles to match your vision
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-400">
                Get your transformed photos in just minutes. No waiting, no hassle, just amazing results
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Studio Quality</h3>
              <p className="text-gray-400">
                Professional-grade results that are perfect for social media, business, or personal use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Masonry Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                <span className="text-purple-300 text-sm font-medium">LIVE GALLERY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                See what others are creating
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Watch as new AI-generated photos appear in real-time from our global community
              </p>
            </motion.div>
          </div>

          {/* Masonry Grid */}
          <div className="relative">
            <InfiniteMasonryGrid items={masonryItems} />

            {/* Loading Indicator */}
            {isLoadingMore && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white text-sm font-medium">Loading new creations...</span>
                </div>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">{masonryItems.length}</div>
              <div className="text-gray-400 text-sm">Photos Shown</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">6</div>
              <div className="text-gray-400 text-sm">AI Styles</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">Live</div>
              <div className="text-gray-400 text-sm">Updates</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">∞</div>
              <div className="text-gray-400 text-sm">Possibilities</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Styles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore our AI photo styles
            </h2>
            <p className="text-gray-400 text-lg">
              Discover the perfect style for your photos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Professional", emoji: "💼", color: "from-emerald-500 to-green-600", description: "Studio-quality headshots" },
              { name: "Anime", emoji: "🎨", color: "from-pink-500 to-purple-600", description: "Manga-style avatars" },
              { name: "3D Avatar", emoji: "🎯", color: "from-blue-500 to-cyan-600", description: "Realistic 3D models" },
              { name: "Cartoon", emoji: "🎭", color: "from-orange-500 to-red-600", description: "Fun cartoon characters" },
              { name: "Abstract", emoji: "🌀", color: "from-purple-500 to-indigo-600", description: "Artistic expressions" },
              { name: "Portrait", emoji: "📸", color: "from-gray-500 to-gray-600", description: "Classic portraits" }
            ].map((style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-all cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
                onClick={() => window.location.href = `/styles/${style.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${style.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-xl">{style.emoji}</span>
                </div>
                <h3 className="text-white font-semibold text-center text-sm mb-1">{style.name}</h3>
                <p className="text-gray-400 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {style.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about TwinkleFace AI
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQ_DATA.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-purple-400 text-left">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pt-4 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA with Dialog */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to transform your photos?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join over 50,000 creators who trust TwinkleFace for their AI photo needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 h-16 text-xl font-semibold"
              onClick={() => window.location.href = '/dashboard'}
            >
              Create Your AI Photos Now
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-12 py-4 h-16 text-xl backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">TwinkleFace AI Demo</DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-gray-400">Demo video coming soon!</p>
                    <p className="text-gray-500 text-sm mt-2">Watch how TwinkleFace transforms photos in real-time</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            No credit card required • Get started in 2 minutes
          </div>
        </div>
      </section>

      {/* Attribution Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Powered by{" "}
            <span className="text-gray-400 font-medium">Flux</span>{" "}
            and{" "}
            <span className="text-gray-400 font-medium">OpenAI</span>{" "}
            • Built with cutting-edge AI technology
          </p>
        </div>
      </footer>
    </div>
  )
}