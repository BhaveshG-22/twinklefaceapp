'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Compare } from '@/components/ui/compare'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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

interface ProfessionalContentProps {
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

export default function ProfessionalContent({ isCollapsed = false }: ProfessionalContentProps) {
  const [professionalPrompts, setProfessionalPrompts] = useState<PromptData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch prompts from JSON file and filter professional-related ones
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('/prompts.json')
        const data = await response.json()
        
        // Professional-related keywords to filter by
        const professionalKeywords = ['professional', 'business', 'corporate', 'executive', 'linkedin', 'headshot', 'portrait', 'formal', 'suit', 'office', 'workplace', 'conference', 'meeting', 'presentation', 'leadership', 'management', 'company', 'enterprise', 'career', 'networking', 'interview', 'cv', 'resume', 'profile']
        
        // Filter prompts that are professional-related and add preview images + metadata
        const filteredPrompts = data.prompts
          .filter((prompt: { title: string; prompt: string }) => {
            const titleLower = prompt.title.toLowerCase()
            const promptLower = prompt.prompt.toLowerCase()
            const combined = titleLower + ' ' + promptLower
            
            // Check for professional keywords or business/corporate terms
            return professionalKeywords.some(keyword => 
              combined.includes(keyword)
            ) || 
            // Also include prompts that mention professional/business terms
            ['clean', 'sharp', 'polished', 'elegant', 'sophisticated', 'minimal', 'studio', 'lighting'].some(term => 
              combined.includes(term)
            )
          })
          .map((prompt: { id: number; title: string; prompt: string; variables: string[] }, index: number) => {
            // Generate preview images for professional styles - business/corporate photos
            const previewImages = [
              'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1494790108755-2616c5e2d4d2?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1600603405742-02d1c83f87d1?w=400&h=600&fit=crop'
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
              'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=600&fit=crop',
              'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=400&h=600&fit=crop'
            ]
            
            // Determine category based on title/content
            let category = 'professional'
            const titleLower = prompt.title.toLowerCase()
            if (titleLower.includes('executive') || titleLower.includes('ceo')) category = 'executive'
            else if (titleLower.includes('linkedin') || titleLower.includes('network')) category = 'linkedin'
            else if (titleLower.includes('headshot') || titleLower.includes('portrait')) category = 'headshot'
            else if (titleLower.includes('corporate') || titleLower.includes('business')) category = 'corporate'
            else if (titleLower.includes('formal') || titleLower.includes('suit')) category = 'formal'
            else if (titleLower.includes('studio') || titleLower.includes('lighting')) category = 'studio'
            else if (titleLower.includes('conference') || titleLower.includes('presentation')) category = 'conference'
            
            // Determine difficulty based on variables count and complexity
            let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium'
            if (prompt.variables.length <= 2) difficulty = 'Easy'
            else if (prompt.variables.length >= 6) difficulty = 'Hard'
            
            // Generate tags based on title and content
            const tags: string[] = []
            if (titleLower.includes('executive') || titleLower.includes('ceo')) tags.push('executive')
            if (titleLower.includes('linkedin')) tags.push('linkedin')
            if (titleLower.includes('headshot')) tags.push('headshot')
            if (titleLower.includes('corporate')) tags.push('corporate')
            if (titleLower.includes('formal')) tags.push('formal')
            if (titleLower.includes('studio')) tags.push('studio')
            if (titleLower.includes('business')) tags.push('business')
            if (titleLower.includes('professional')) tags.push('professional')
            if (titleLower.includes('elegant')) tags.push('elegant')
            if (titleLower.includes('polished')) tags.push('polished')
            if (titleLower.includes('clean')) tags.push('clean')
            if (titleLower.includes('sharp')) tags.push('sharp')
            
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
        
        setProfessionalPrompts(filteredPrompts)
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
            <span className="text-emerald-400">💼</span>
            <span className="text-emerald-300 text-sm font-medium">PROFESSIONAL</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Professional Styles</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your photos into polished professional headshots and business portraits. Perfect for LinkedIn, CVs, and corporate profiles.
          </p>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">25,000+ professional photos created</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="text-sm font-medium">⚡ Corporate quality</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2 text-green-400">
              <span className="text-sm font-medium">💼 {loading ? '...' : professionalPrompts.length} unique styles</span>
            </div>
          </div>
        </div>

        {/* Professional Grid */}
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
            professionalPrompts.map((prompt, index) => {
              const isCompareCard = index % 2 === 0; // Every even index gets a Compare component
              
              if (isCompareCard) {
                return (
                  <Card key={prompt.id} className="group bg-gray-900/20 border-gray-700/30 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 backdrop-blur-sm">
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
                  <Card key={prompt.id} className="group bg-gray-900/20 border-gray-700/30 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 backdrop-blur-sm">
                    <CardContent className="p-0">
                      
                      {/* Preview Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image 
                          src={prompt.preview || ''} 
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
                              <span className="text-emerald-600 mr-2 text-xl">💼</span> Try This Style
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
                          <span className="capitalize text-emerald-400 font-medium">{prompt.category}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            }))}
        </div>

        {/* Empty State */}
        {!loading && professionalPrompts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-white mb-2">No professional styles found</h3>
            <p className="text-gray-400">Check back later for new professional styles</p>
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
              Create Your Professional Headshot Today
            </h3>
            <p className="text-gray-400 text-lg">
              Choose any professional style above and watch as AI transforms your photos into polished business portraits in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
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