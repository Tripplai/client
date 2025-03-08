"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Badge,
  useColorModeValue,
  Image,
  HStack,
  VStack,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { FaPlus, FaMapMarkedAlt, FaCalendarAlt, FaHeart, FaShare, FaComment } from 'react-icons/fa';
import Layout from '@/components/Layout';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [travelPlans, setTravelPlans] = useState([]);
  const bgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <Heading size="lg" mb={2}>나의 여행 계획</Heading>
          <Text color="gray.600">
            {session?.user?.email}님의 여행 계획 관리 대시보드입니다.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {travelPlans.length > 0 ? (
            travelPlans.map((plan: any) => (
              <Card key={plan.id} bg={bgColor} shadow="md" cursor="pointer"
                onClick={() => router.push(`/travel/${plan.id}`)}>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Box position="relative" height="200px" borderRadius="md" overflow="hidden">
                      <Image
                        src={plan.image || "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3"}
                        alt={plan.destination}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                      <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="blue"
                      >
                        {plan.travelStyle}
                      </Badge>
                    </Box>
                    
                    <Box>
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="xl" fontWeight="bold">{plan.destination || '목적지 없음'}</Text>
                        <HStack spacing={4}>
                          <Icon as={FaHeart} color="red.500" />
                          <Icon as={FaShare} />
                          <Icon as={FaComment} />
                        </HStack>
                      </HStack>
                      <HStack spacing={4} color="gray.600">
                        <HStack>
                          <FaCalendarAlt />
                          <Text>
                            {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                          </Text>
                        </HStack>
                        <HStack>
                          <FaMapMarkedAlt />
                          <Text>{plan.duration || '3일 2박'}</Text>
                        </HStack>
                      </HStack>
                    </Box>

                    <Divider />

                    <Box>
                      <Text fontWeight="bold" mb={2}>주요 방문지</Text>
                      <HStack spacing={2} flexWrap="wrap">
                        {['관광지', '맛집', '쇼핑'].map((tag) => (
                          <Badge key={tag} colorScheme="green" variant="subtle">
                            {tag}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>

                    {plan.recommendations && (
                      <Badge colorScheme="blue" alignSelf="flex-start">AI 추천 완료</Badge>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))
          ) : (
            <Box textAlign="center" gridColumn="1/-1" py={10}>
              <Text color="gray.500" mb={4}>아직 생성된 여행 계획이 없습니다.</Text>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="blue"
                onClick={() => router.push('/travel/create')}
              >
                첫 여행 계획 만들기
              </Button>
            </Box>
          )}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}