"use client";

import Layout from '@/components/Layout'
import HeroSection from '@/components/home/HeroSection'
import RegionSection from '@/components/home/RegionSection'
import FeatureSection from '@/components/home/FeatureSection'
import FestivalSection from '@/components/home/FestivalSection'
import Head from 'next/head'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>TripPlanner AI - AI로 계획하는 당신만의 특별한 여행</title>
        <meta name="description" content="목적지와 일정만 입력하면 AI가 당신만을 위한 최적의 여행 코스를 즉시 추천해 드립니다" />
        <meta property="og:title" content="TripPlanner AI - AI로 계획하는 당신만의 특별한 여행" />
        <meta property="og:description" content="목적지와 일정만 입력하면 AI가 당신만을 위한 최적의 여행 코스를 즉시 추천해 드립니다" />
        <meta property="og:image" content="/images/hero-background.jpg" />
      </Head>
      
      {/* Tailwind 테스트 요소 */}
      <div className="fixed bottom-4 right-4 bg-rose-500 text-white p-4 rounded-lg shadow-lg z-50">
        Tailwind CSS 작동 확인
      </div>
      
      <HeroSection />
      <RegionSection />
      <FeatureSection />
      <FestivalSection />
    </Layout>
  )
}
