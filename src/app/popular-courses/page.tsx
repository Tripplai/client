'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Flex, 
  Image, 
  HStack, 
  Icon, 
  useToast,
  useColorModeValue 
} from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { BsArrowUpRight } from 'react-icons/bs'
import Link from 'next/link'
import NavSection from '@/components/common/NavSection'
import Footer from '@/components/common/Footer'
import { useSession } from 'next-auth/react'

// 데이터 타입
interface TravelCourse {
  id: number
  title: string
  location: string
  image: string
  locationShort: string
  description: string
}

// 임시 데이터
const travelCourses: TravelCourse[] = [
  {
    id: 1,
    title: '서울 역사 탐방 3일 코스',
    location: '서울 종로, 중구',
    image: '/images/seoul-course.png',
    locationShort: 'SEOUL',
    description: '경복궁, 창덕궁 등 서울의 고궁과 역사를 만나는 3일간의 특별한 시간.'
  },
  {
    id: 2,
    title: '부산 해변 힐링 4일 코스',
    location: '부산 해운대, 광안리',
    image: '/images/busan-course.png',
    locationShort: 'BUSAN',
    description: '해운대와 광안리의 푸른 바다를 보며 즐기는 낭만 가득 힐링 여행.'
  },
  {
    id: 3,
    title: '제주 자연 완전정복 5일 코스',
    location: '제주 전역',
    image: '/images/jeju-course.png',
    locationShort: 'JEJU',
    description: '한라산부터 푸른 바다까지, 제주도의 아름다운 자연을 만끽하는 5일.'
  },
  {
    id: 4,
    title: '경주 역사 문화 2일 코스',
    location: '경주 시내 및 근교',
    image: '/images/gyeongju-course.jpg',
    locationShort: 'GYEONGJU',
    description: '신라 천년의 숨결, 불국사와 석굴암 등 경주의 역사를 따라 걷는 여행.'
  },
  {
    id: 5,
    title: '강원도 산과 바다 4일 코스',
    location: '강릉, 속초, 평창',
    image: '/images/kangwon.png',
    locationShort: 'GANGWON',
    description: '설악산의 웅장함과 동해의 푸르름을 동시에 즐기는 강원도 일주 코스.'
  },
  {
    id: 6,
    title: '전주 맛집 투어 2일 코스',
    location: '전주 한옥마을, 시내',
    image: '/images/jeonju-course.png',
    locationShort: 'JEONJU',
    description: '한옥의 정취와 맛있는 음식이 가득한 전주에서의 미식 기행.'
  },
  // 추가 한국 여행 코스 목업 데이터
  {
    id: 7,
    title: '울산 영남 알프스 트레킹 3일 코스',
    location: '울산 울주군',
    image: '/images/ulsan.jpeg', // 실제 사용시 적절한 이미지로 교체
    locationShort: 'ULSAN',
    description: '영남 알프스의 아름다운 산맥을 따라 걷는 건강한 트레킹 여행.'
  },
  {
    id: 8,
    title: '안동 전통문화 체험 2일 코스',
    location: '안동 하회마을, 도산서원',
    image: '/images/andong.png', // 실제 사용시 적절한 이미지로 교체
    locationShort: 'ANDONG',
    description: '하회마을과 도산서원에서 만나는 한국의 전통 문화와 선비 정신.'
  },
  {
    id: 9,
    title: '여수 해양 여행 3일 코스',
    location: '여수 엑스포, 오동도',
    image: '/images/yeosu-course.jpg', // 실제 사용시 적절한 이미지로 교체
    locationShort: 'YEOSU',
    description: '아름다운 밤바다와 갓 잡은 해산물이 기다리는 여수 바다 여행.'
  },
  {
    id: 10,
    title: '담양 죽녹원 힐링 2일 코스',
    location: '담양 죽녹원, 메타세쿼이아길',
    image: '/images/danyang.jpg', // 실제 사용시 적절한 이미지로 교체
    locationShort: 'DAMYANG',
    description: '대나무 숲길과 메타세쿼이아 가로수길에서 느끼는 자연의 평온함.'
  },
  {
    id: 11,
    title: '통영 예술 투어 3일 코스',
    location: '통영 동피랑, 서피랑',
    image: '/images/kangwon.png', // 실제 사용시 적절한 이미지로 교체
    locationShort: 'TONGYEONG',
    description: '예술의 도시 통영에서 즐기는 문화와 예술, 그리고 싱싱한 해산물.'
  },
  {
    id: 12,
    title: '경북 청송 자연 힐링 4일 코스',
    location: '청송 주왕산, 얼음골',
    image: '/images/jeonju-course.png', // 실제 사용시 적절한 이미지로 교체
    locationShort: 'CHEONGSEONG',
    description: '주왕산 국립공원과 청송 얼음골에서 맛보는 깨끗한 자연의 선물.'
  }
]

export default function PopularCoursesPage() {
  const [courses] = useState<TravelCourse[]>(travelCourses)
  const [likedCourses, setLikedCourses] = useState<number[]>([])
  const toast = useToast()
  const { data: session } = useSession()

  // 색상 변수
  const bgColor = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('black', 'white')
  const borderColor = useColorModeValue('black', 'cyan.400')
  const shadowColor = useColorModeValue('black', 'cyan')

  // 찜 목록 불러오기
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedCourses')
    if (savedLikes) {
      setLikedCourses(JSON.parse(savedLikes))
    }
  }, [])

  // 찜하기 토글
  const toggleLike = (courseId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!session) {
      toast({
        title: '로그인이 필요합니다',
        description: '찜하기는 로그인 후 이용할 수 있습니다',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    let newLikedCourses
    if (likedCourses.includes(courseId)) {
      newLikedCourses = likedCourses.filter(id => id !== courseId)
      toast({
        title: '찜 목록에서 제거되었습니다',
        status: 'info',
        duration: 2000,
        isClosable: true,
      })
    } else {
      newLikedCourses = [...likedCourses, courseId]
      toast({
        title: '찜 목록에 추가되었습니다',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
    
    setLikedCourses(newLikedCourses)
    localStorage.setItem('likedCourses', JSON.stringify(newLikedCourses))
  }

  return (
    <>
      <NavSection />
      
      {/* 메인 콘텐츠 영역 - 상단에 넉넉한 여백 */}
      <Box bg={bgColor} pt="100px" pb="50px" minH="100vh">
        <Container maxW="container.xl" px={0}>
          {/* 제목 */}
          <Flex 
            justifyContent="space-between" 
            alignItems="center" 
            mb="40px"
            width="100%"
            pl={{ base: 0, md: 0 }}
          >
            <Heading 
              as="h1" 
              fontSize="2xl" 
              color={textColor}
              textAlign={{ base: "center", md: "left" }}
              ml={{ base: 4, md: "30%", lg: "35%" }}
            >
              추천 인기 여행 코스
            </Heading>
            
            <Link 
              href="/travel/popular/all" 
            >
              <Box
                ml={{ base: 2, md: 4 }}
                mr={{ base: 4, md: "5%" }}
              >
                <Flex
                  alignItems="center"
                  borderBottom="1px solid"
                  borderColor={borderColor}
                  _hover={{ color: "blue.500", borderColor: "blue.500" }}
                  pb={1}
                >
                  <Text fontSize="sm" fontWeight="medium" mr={1}>더보기</Text>
                  <Icon as={BsArrowUpRight} boxSize={3} />
                </Flex>
              </Box>
            </Link>
          </Flex>

          {/* 여행 코스 카드 그리드 - 정사각형 카드로 가로 배열 */}
          <Flex 
            overflowX="visible"
            overflowY="visible"
            pb={6}
            width="100%"
            maxW="100%"
            flexWrap="wrap"
            gap="28px"
            pl="200px"
            pr="20px"
          >
            {courses.map(course => (
              <Box 
                key={course.id}
                position="relative"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="sm"
                bg={cardBg}
                boxShadow={`4px 4px 0 ${shadowColor}`}
                display="flex"
                flexDirection="column"
                overflow="hidden"
                flex="0 0 235px"
                minW="235px"
                h="354px"
                mb={4}
                transition="all 0.3s ease-in-out"
                _hover={{
                  transform: "rotate(3deg)",
                  boxShadow: `6px 6px 0 ${shadowColor}`,
                  zIndex: 1,
                  cursor: "pointer"
                }}
              >
                {/* 이미지 영역 - 비율 조정 */}
                <Box position="relative" height="52%" overflow="hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                  {/* 지역 뱃지 - 이미지 위에 배치 */}
                  <Box
                    position="absolute"
                    top="12px"
                    left="12px"
                    bg={borderColor}
                    color="white"
                    fontSize="0.8rem"
                    fontWeight="semibold"
                    px={2.5}
                    py={1}
                    borderRadius="sm"
                    letterSpacing="0.5px"
                  >
                    {course.locationShort}
                  </Box>
                </Box>

                {/* 콘텐츠 영역 - 비율 조정 */}
                <Flex 
                  direction="column" 
                  height="48%" 
                  p={5} 
                  justify="space-between"
                >
                  <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center"
                    flex="1"
                    my="auto"
                  >
                    {/* 제목 */}
                    <Heading
                      as="h3"
                      fontSize="1.05rem"
                      fontWeight="bold"
                      mb={2.5}
                      noOfLines={1}
                      color={textColor}
                      letterSpacing="-0.3px"
                      textAlign="center"
                      width="100%"
                    >
                      {course.title}
                    </Heading>

                    {/* 간단 소개 - 텍스트 정렬 개선 */}
                    <Text 
                      fontSize="0.85rem" 
                      color={textColor} 
                      opacity={0.85}
                      noOfLines={2} 
                      lineHeight="1.6"
                      letterSpacing="-0.2px"
                      textAlign="center"
                      width="100%"
                    >
                      {course.description}
                    </Text>
                  </Box>

                  {/* 하단 액션 영역 */}
                  <HStack 
                    borderTop="1px solid" 
                    borderColor={borderColor} 
                    spacing={0} 
                    mt={4}
                  >
                    <Link href={`/travel/popular/${course.id}`} style={{ flexGrow: 1 }}>
                      <Flex
                        p={2.5}
                        alignItems="center"
                        justifyContent="space-between"
                        cursor="pointer"
                        _hover={{ bg: 'gray.100' }}
                      >
                        <Text 
                          fontSize="0.85rem" 
                          fontWeight="semibold" 
                          color={textColor}
                          letterSpacing="-0.2px"
                        >
                          자세히 보기
                        </Text>
                        <Icon as={BsArrowUpRight} color={textColor} boxSize={3} />
                      </Flex>
                    </Link>
                    
                    <Flex
                      p={2.5}
                      alignItems="center"
                      justifyContent="center"
                      borderLeft="1px solid"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={(e) => toggleLike(course.id, e)}
                      _hover={{ bg: 'gray.100' }}
                      w="42px"
                    >
                      <Icon 
                        as={likedCourses.includes(course.id) ? FaHeart : FaRegHeart} 
                        color={likedCourses.includes(course.id) ? "red.500" : "gray.500"} 
                        fontSize="1rem"
                      />
                    </Flex>
                  </HStack>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
      
      <Footer />
    </>
  )
} 