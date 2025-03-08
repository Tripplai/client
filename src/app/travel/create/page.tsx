"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  useColorModeValue,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  Checkbox,
  CheckboxGroup,
  Stack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarDay, FaUsers, FaWallet, FaHeart, FaUtensils, FaShoppingBag, FaMountain, FaLandmark } from 'react-icons/fa';
import Layout from '@/components/Layout';

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelStyle: string;
  interests: string;
  preferences: string;
  companions: string[];
  activities: string[];
}

export default function CreateTravelPlan() {
  const router = useRouter();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 0,
    travelStyle: '',
    interests: '',
    preferences: '',
    companions: [],
    activities: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: API 호출 구현
      toast({
        title: '여행 계획 생성 중',
        description: 'AI가 최적의 여행 코스를 추천해드립니다.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '여행 계획 생성 중 문제가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const activityOptions = [
    { value: 'culture', label: '문화/예술', icon: FaLandmark },
    { value: 'nature', label: '자연/풍경', icon: FaMountain },
    { value: 'food', label: '맛집', icon: FaUtensils },
    { value: 'shopping', label: '쇼핑', icon: FaShoppingBag },
  ];

  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
          <Heading size="lg" mb={6}>새 여행 계획 만들기</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {/* 기본 정보 섹션 */}
              <Box width="100%">
                <Heading size="md" mb={4}>기본 정보</Heading>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>여행지</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaMapMarkerAlt} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="예: 도쿄, 파리, 뉴욕"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>여행 기간</FormLabel>
                    <HStack spacing={4}>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FaCalendarDay} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <Text>~</Text>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FaCalendarDay} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </HStack>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>예산 (원)</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaWallet} color="gray.400" />
                      </InputLeftElement>
                      <NumberInput min={0} value={formData.budget} onChange={(value) => setFormData(prev => ({ ...prev, budget: Number(value) }))}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                </VStack>
              </Box>

              {/* 여행 스타일 섹션 */}
              <Box width="100%">
                <Heading size="md" mb={4}>여행 스타일</Heading>
                <FormControl isRequired>
                  <FormLabel>선호하는 여행 스타일</FormLabel>
                  <Select name="travelStyle" value={formData.travelStyle} onChange={handleChange}>
                    <option value="">선택하세요</option>
                    <option value="luxury">럭셔리</option>
                    <option value="comfort">편안한</option>
                    <option value="budget">경제적인</option>
                    <option value="adventure">모험적인</option>
                  </Select>
                </FormControl>
              </Box>

              {/* 동행자 섹션 */}
              <Box width="100%">
                <Heading size="md" mb={4}>동행자</Heading>
                <CheckboxGroup onChange={(value) => setFormData(prev => ({ ...prev, companions: value as string[] }))}>
                  <Stack spacing={4}>
                    <Checkbox value="alone">혼자</Checkbox>
                    <Checkbox value="couple">연인과 함께</Checkbox>
                    <Checkbox value="family">가족과 함께</Checkbox>
                    <Checkbox value="friends">친구와 함께</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Box>

              {/* 관심사 섹션 */}
              <Box width="100%">
                <Heading size="md" mb={4}>관심사</Heading>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  {activityOptions.map((activity) => (
                    <Box
                      key={activity.value}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => {
                        const newActivities = formData.activities.includes(activity.value)
                          ? formData.activities.filter(a => a !== activity.value)
                          : [...formData.activities, activity.value];
                        setFormData(prev => ({ ...prev, activities: newActivities }));
                      }}
                      bg={formData.activities.includes(activity.value) ? "blue.50" : "transparent"}
                      borderColor={formData.activities.includes(activity.value) ? "blue.500" : "gray.200"}
                    >
                      <VStack spacing={2}>
                        <Icon as={activity.icon} boxSize={6} color="blue.500" />
                        <Text fontSize="sm">{activity.label}</Text>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>

              {/* 특별한 선호사항 섹션 */}
              <Box width="100%">
                <Heading size="md" mb={4}>특별한 선호사항</Heading>
                <FormControl>
                  <Textarea
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleChange}
                    placeholder="예: 채식주의자, 알레르기, 특별한 요구사항"
                    rows={4}
                  />
                </FormControl>
              </Box>

              <Button type="submit" colorScheme="blue" size="lg" width="full">
                AI 여행 코스 추천받기
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Layout>
  );
} 