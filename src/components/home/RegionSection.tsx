'use client'

import { Box, Container, Heading, Image, Text } from '@chakra-ui/react'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'

const regions = [
  {
    id: 1,
    name: '서울',
    description: '현대와 전통이 공존하는 대한민국의 수도',
    image: '/images/seoul.jpg',
    category: 'AI 추천 코스',
    rating: 4.8,
    reviews: 128
  },
  {
    id: 2,
    name: '부산',
    description: '해변과 산이 어우러진 대한민국 제2의 도시',
    image: '/images/busan.png',
    category: 'AI 추천 코스',
    rating: 4.7,
    reviews: 96
  },
  {
    id: 3,
    name: '제주',
    description: '아름다운 자연과 독특한 문화가 있는 섬',
    image: '/images/jeju.png',
    category: 'AI 추천 코스',
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: '경주',
    description: '천년 고도의 역사와 문화를 간직한 도시',
    image: '/images/gyeongju.jpg',
    category: 'AI 추천 코스',
    rating: 4.6,
    reviews: 84
  },
  {
    id: 5,
    name: '강원도',
    description: '숲과 산, 바다를 모두 즐길 수 있는 자연의 보고',
    image: '/images/gangwon.jpg',
    category: 'AI 추천 코스',
    rating: 4.8,
    reviews: 112
  },
  {
    id: 6,
    name: '전주',
    description: '한옥마을과 맛있는 음식의 도시',
    image: '/images/jeonju.jpg',
    category: 'AI 추천 코스',
    rating: 4.7,
    reviews: 76
  },
  {
    id: 7,
    name: '통영',
    description: '아름다운 남해안의 항구 도시',
    image: '/images/tongyeong.jpg',
    category: 'AI 추천 코스',
    rating: 4.5,
    reviews: 62
  },
  {
    id: 8,
    name: '여수',
    description: '밤바다가 아름다운 남해안의 도시',
    image: '/images/yeosu.jpg',
    category: 'AI 추천 코스',
    rating: 4.7,
    reviews: 86
  }
]

export default function RegionSection() {
  return (
    <Box as="section" className="section">
      <Container className="section-container">
        <Heading as="h2" className="section-title">
          AI 추천 인기 여행 코스
        </Heading>
        
        <Box className="festival-grid">
          {regions.map((region) => (
            <Box key={region.id} className="festival-card">
              <Box className="festival-image">
                <Image
                  src={region.image}
                  alt={region.name}
                />
              </Box>
              <Box className="festival-content">
                <Text className="festival-title">
                  {region.name}
                </Text>
                <Box className="festival-date" display="flex" alignItems="center">
                  <Box as={FaStar} mr={2} />
                  <Text>{region.rating} (리뷰 {region.reviews}개)</Text>
                </Box>
                <Box className="festival-location" display="flex" alignItems="center">
                  <Box as={FaMapMarkerAlt} className="festival-location-icon" />
                  <Text>{region.description}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}