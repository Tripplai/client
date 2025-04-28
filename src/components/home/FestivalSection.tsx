'use client'

import { Box, Container, Heading, Image, Text } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import Link from 'next/link'
import Button from '@/components/common/Button'

const recommendedCourses = [
  {
    id: 1,
    title: '서울 역사 탐방 3일 코스',
    duration: '3일 코스',
    location: '서울 종로, 중구',
    image: '/images/seoul-course.png'
  },
  {
    id: 2,
    title: '부산 해변 힐링 4일 코스',
    duration: '4일 코스',
    location: '부산 해운대, 광안리',
    image: '/images/busan-course.png'
  },
  {
    id: 3,
    title: '제주 자연 완전정복 5일 코스',
    duration: '5일 코스',
    location: '제주 전역',
    image: '/images/jeju-course.png'
  },
  {
    id: 4,
    title: '경주 역사 문화 2일 코스',
    duration: '2일 코스',
    location: '경주 시내 및 근교',
    image: '/images/gyeongju-course.jpg'
  },
  {
    id: 5,
    title: '강원도 산과 바다 4일 코스',
    duration: '4일 코스',
    location: '강릉, 속초, 평창',
    image: '/images/kangwon.png'
  },
  {
    id: 6,
    title: '전주 맛집 투어 2일 코스',
    duration: '2일 코스',
    location: '전주 한옥마을, 시내',
    image: '/images/jeonju-course.png'
  },
  {
    id: 7,
    title: '통영 섬 여행 3일 코스',
    duration: '3일 코스',
    location: '통영 시내 및 섬',
    image: '/images/tongyeong-course.jpg'
  },
  {
    id: 8,
    title: '여수 밤바다 로맨틱 2일 코스',
    duration: '2일 코스',
    location: '여수 시내, 오동도',
    image: '/images/yeosu-course.jpg'
  }
]

export default function RecommendedCoursesSection() {
  return (
    <Box as="section" className="section" id="recommended-courses">
      <Container className="section-container">
        <Heading as="h2" className="section-title">
          추천 인기 여행 코스
        </Heading>
        
        <Box textAlign="center" mt={4} mb={6}>
          <Link href="/popular-courses" passHref legacyBehavior>
            <Button 
              variant="primary" 
              size="lg"
              className="ml-2 hover:bg-pink-600"
            >
              더 많은 코스 보기
            </Button>
          </Link>
        </Box>
        
        <Box className="festival-grid">
          {recommendedCourses.map((course) => (
            <Link key={course.id} href={`/travel/popular/${course.id}`} style={{ textDecoration: 'none' }}>
              <Box className="festival-card" cursor="pointer" _hover={{ transform: 'translateY(-5px)', transition: 'transform 0.3s ease' }}>
                <Box className="festival-image">
                  <Image
                    src={course.image}
                    alt={course.title}
                  />
                </Box>
                <Box className="festival-content">
                  <Text className="festival-title">
                    {course.title}
                  </Text>
                  <Box className="festival-date" display="flex" alignItems="center">
                    <Box as={FaClock} mr={2} />
                    <Text>{course.duration}</Text>
                  </Box>
                  <Box className="festival-location" display="flex" alignItems="center">
                    <Box as={FaMapMarkerAlt} className="festival-location-icon" />
                    <Text>{course.location}</Text>
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

// 기존 이름과의 호환성을 위한 별칭
export { RecommendedCoursesSection as FestivalSection } 