'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Compare } from '@/components/ui/compare'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Custom CSS for hiding compare slider until hover
const compareStyles = `
  .compare-hover-slider [style*="left:"] {
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
  }
  .compare-hover-slider:hover [style*="left:"] {
    opacity: 1 !important;
  }
  .compare-hover-slider .compare-container > div:first-child {
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
  }
  .compare-hover-slider:hover .compare-container > div:first-child {
    opacity: 1 !important;
  }
  .compare-hover-slider .compare-container {
    position: relative !important;
  }
  .compare-hover-slider .compare-container > div:last-child {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 1 !important;
  }
  .compare-hover-slider:hover .compare-container > div:last-child {
    position: relative !important;
    z-index: auto !important;
  }
`

interface AnimeContentProps {
  isCollapsed?: boolean
}

interface PromptData {
  id: number
  title: string
  prompt: string
  variables: string[]
  category?: string
  preview?: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  tags?: string[]
  beforeImage?: string
  afterImage?: string
}

export default function AnimeContent({ isCollapsed = false }: AnimeContentProps) {
  const [animePrompts, setAnimePrompts] = useState<PromptData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch prompts from JSON file and filter anime-related ones
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('/prompts.json')
        const data = await response.json()

        // Anime-related keywords to filter by
        const animeKeywords = ['anime', 'manga', 'kawaii', 'chibi', 'otaku', 'japanese', 'cartoon', 'animation', 'studio ghibli', 'cel shaded', 'character', 'avatar', 'illustration', 'art style', 'digital art', 'stylized', 'fantasy', 'colorful', 'vibrant', 'artistic']

        // Filter prompts that are anime-related and add preview images + metadata
        const filteredPrompts = data.prompts
          .filter((prompt: { title: string; prompt: string }) => {
            const titleLower = prompt.title.toLowerCase()
            const promptLower = prompt.prompt.toLowerCase()
            const combined = titleLower + ' ' + promptLower

            // Check for anime keywords or creative/artistic terms that could work for anime
            return animeKeywords.some(keyword =>
              combined.includes(keyword)
            ) ||
              // Also include prompts that mention creative/artistic terms
              ['creative', 'artistic', 'stylized', 'digital', 'character', 'avatar', 'illustration'].some(term =>
                combined.includes(term)
              )
          })
          .map((prompt: { id: number; title: string; prompt: string; variables: string[] }, index: number) => {
            // Generate preview images for anime styles
            const previewImages = [
              'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop'
            ]

            // Generate before/after image pairs for Compare component
            const beforeImages = [
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=600&fit=crop'
            ]

            const afterImages = [
              'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=600&fit=crop'
            ]

            // Determine category based on title/content
            let category = 'anime'
            const titleLower = prompt.title.toLowerCase()
            if (titleLower.includes('kawaii') || titleLower.includes('cute')) category = 'kawaii'
            else if (titleLower.includes('chibi')) category = 'chibi'
            else if (titleLower.includes('manga')) category = 'manga'
            else if (titleLower.includes('ghibli')) category = 'studio-ghibli'
            else if (titleLower.includes('cyberpunk') || titleLower.includes('futuristic')) category = 'cyberpunk'
            else if (titleLower.includes('fantasy') || titleLower.includes('magical')) category = 'fantasy'
            else if (titleLower.includes('school') || titleLower.includes('uniform')) category = 'school'

            // Determine difficulty based on variables count and complexity
            let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium'
            if (prompt.variables.length <= 2) difficulty = 'Easy'
            else if (prompt.variables.length >= 6) difficulty = 'Hard'

            // Generate tags based on title and content
            const tags: string[] = []
            if (titleLower.includes('kawaii') || titleLower.includes('cute')) tags.push('kawaii')
            if (titleLower.includes('chibi')) tags.push('chibi')
            if (titleLower.includes('manga')) tags.push('manga')
            if (titleLower.includes('ghibli')) tags.push('studio-ghibli')
            if (titleLower.includes('cyberpunk')) tags.push('cyberpunk')
            if (titleLower.includes('fantasy')) tags.push('fantasy')
            if (titleLower.includes('magical')) tags.push('magical')
            if (titleLower.includes('school')) tags.push('school')
            if (titleLower.includes('colorful')) tags.push('colorful')
            if (titleLower.includes('pastel')) tags.push('pastel')
            if (titleLower.includes('dramatic')) tags.push('dramatic')
            if (titleLower.includes('cel')) tags.push('cel-shaded')

            return {
              ...prompt,
              category,
              difficulty,
              tags: tags.length > 0 ? tags : [category],
              preview: previewImages[index % previewImages.length],
              beforeImage: beforeImages[index % beforeImages.length],
              afterImage: afterImages[index % afterImages.length]
            }
          })

        setAnimePrompts(filteredPrompts)
      } catch (error) {
        console.error('Error fetching prompts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrompts()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/50'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  return (
    <div className="flex flex-col gap-6 pb-12 w-full">
      <style dangerouslySetInnerHTML={{ __html: compareStyles }} />
      <div className={`flex flex-col gap-6 transition-all duration-300 ${isCollapsed ? 'px-8' : 'px-6'}`}>

        {/* Page Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mt-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full px-4 py-2">
            <span className="text-pink-400">🎨</span>
            <span className="text-pink-300 text-sm font-medium">ANIME STYLES</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Anime Styles</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Turn your photos into stunning anime-style art for avatars, socials, creative projects.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">10,000+ anime avatars created</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2 text-blue-400">
              <span className="text-sm font-medium">⚡ Studio quality</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2 text-purple-400">
              <span className="text-sm font-medium">🎭 {loading ? '...' : animePrompts.length} unique styles</span>
            </div>
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-3 gap-8 w-full px-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 18 }).map((_, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800/50 overflow-hidden animate-pulse">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gray-800"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-gray-800 rounded w-12"></div>
                      <div className="h-5 bg-gray-800 rounded w-16"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-800 rounded w-20"></div>
                      <div className="h-3 bg-gray-800 rounded w-16"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            animePrompts.map((prompt, index) => {
              const isCompareCard = index % 2 === 0; // Every even index gets a Compare component

              if (isCompareCard) {
                return (
                  <Card key={prompt.id} className="group bg-gray-900/20 border-gray-700/30 hover:border-pink-500/50 transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 backdrop-blur-sm">
                    <CardContent className="p-0">

                      {/* Compare Component for Before/After */}
                      <div className="relative aspect-[3/4] overflow-hidden compare-hover-slider">
                        {/* Default: Show after image only */}
                        <Image
                          src={prompt.afterImage || prompt.preview || ''}
                          alt={`${prompt.title} - After`}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover transition-opacity duration-300"
                        />

                        {/* On hover: Show Compare component */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Compare
                            firstImage={prompt.beforeImage || prompt.preview}
                            secondImage={prompt.afterImage || prompt.preview}
                            firstImageClassName="object-cover"
                            secondImageClassname="object-cover"
                            className="h-full w-full"
                            slideMode="hover"
                            showHandlebar={false}
                          />
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                );
              } else {
                // Regular card for odd indexes
                return (
                  <Card key={prompt.id} className="group bg-gray-900/20 border-gray-700/30 hover:border-pink-500/50 transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 backdrop-blur-sm">
                    <CardContent className="p-0">

                      {/* Preview Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={prompt.preview || '/default-image.jpg'}
                          alt={prompt.title}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Difficulty Badge - Only visible on hover */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className={`text-xs backdrop-blur-sm ${getDifficultyColor(prompt.difficulty || 'Medium')}`}>
                            {prompt.difficulty || 'Medium'}
                          </Badge>
                        </div>

                        {/* ID Badge - Only visible on hover */}
                        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className="bg-black/50 text-white font-bold px-2 py-1 text-xs backdrop-blur-sm">
                            #{prompt.id}
                          </Badge>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <Button className="bg-white/95 text-black hover:bg-white font-bold shadow-2xl px-6 py-3 text-lg">
                              <span className="text-pink-600 mr-2 text-xl">🎨</span> Try This Style
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Card Content - Only visible on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="font-bold text-white mb-3 line-clamp-2 text-lg">
                          {prompt.title}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {prompt.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-sm text-gray-300 border-gray-600 px-3 py-1 bg-black/40 backdrop-blur-sm">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Variables Count and Category */}
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <span className="font-medium">{prompt.variables.length} variables</span>
                          <span className="capitalize text-pink-400 font-medium">{prompt.category}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            }))}
        </div>

        {/* Empty State */}
        {!loading && animePrompts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-white mb-2">No anime styles found</h3>
            <p className="text-gray-400">Check back later for new anime styles</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 border-t border-gray-800/50">
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
              <span className="text-emerald-400">✨</span>
              <span className="text-emerald-300 text-sm font-medium">READY TO START?</span>
            </div>
            <h3 className="text-3xl font-bold text-white">
              Create Your Anime Avatar Today
            </h3>
            <p className="text-gray-400 text-lg">
              Choose any anime style above and watch as AI transforms your photos into stunning anime artwork in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                Upload Your Photo
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
                View All Styles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}