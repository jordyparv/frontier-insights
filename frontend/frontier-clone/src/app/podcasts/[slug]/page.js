import React from 'react'
import Podcast from './PodcastDetails'
import {samplePodcast, trendingPodcasts} from './constraints'
import { getStrapiData } from '@/utils/utils'

async function Page({params}) {
  let podcastData = null
  let loading = true
  
  try {
    // Ensure params is fully resolved
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams?.slug
    
    if (!slug || slug === 'undefined') {
      console.warn('Podcast slug is missing or invalid:', slug)
      return 
    }
    
    console.log('Fetching podcast with slug:', slug)
    podcastData = await getStrapiData(`/podcasts/${slug}?populate=deep`)
  } catch (error) {
    console.error('Error fetching podcast:', error?.message || error)
  }
  finally {
    loading = false
  }
  
  return (
    loading ? <FullScreenLoader /> : 
    <Podcast podcast={podcastData} trending={trendingPodcasts} />
  )
}

export default Page