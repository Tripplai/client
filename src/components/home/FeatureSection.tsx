'use client'

import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { FaRoute, FaCalendarAlt, FaMapMarkedAlt } from 'react-icons/fa'

const features = [
  {
    id: 1,
    icon: FaRoute,
    title: '맞춤형 여행 코스',
    description: 'AI가 당신의 취향과 여행 스타일에 맞는 최적의 여행 코스를 설계합니다. 시간대별로 최적화된 이동 경로와 방문 장소를 추천해 드립니다.'
  },
  {
    id: 2,
    icon: FaCalendarAlt,
    title: '일자별 상세 일정',
    description: '하루 단위로 세분화된 일정을 제공합니다. 장소, 교통편, 소요 시간, 예상 비용까지 모든 정보를 한눈에 확인할 수 있습니다.'
  },
  {
    id: 3,
    icon: FaMapMarkedAlt,
    title: '실시간 여행 지도',
    description: '추천된 여행 코스를 지도에서 바로 확인하세요. 위치 기반 정보와 이동 경로, 주변 시설까지 실시간으로 확인 가능합니다.'
  }
]

export default function FeatureSection() {
  return (
    <Box as="section" className="section" bg="gray.50">
      <Container className="section-container">
        <Heading as="h2" className="section-title" textAlign="center">
          AI 여행 플래너의 특별함
        </Heading>
        <Text className="section-subtitle" textAlign="center" mx="auto" mb={10}>
          빅데이터와 인공지능 기술을 활용해 당신만을 위한 맞춤형 여행 코스를 추천해 드립니다
        </Text>
        
        <Box className="feature-grid">
          {features.map((feature) => (
            <Box key={feature.id} className="feature-card">
              <Box className="feature-icon">
                <Box as={feature.icon} />
              </Box>
              <Text className="feature-title">{feature.title}</Text>
              <Text className="feature-description">{feature.description}</Text>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
} 