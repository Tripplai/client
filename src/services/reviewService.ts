// src/services/reviewService.ts
import { Review, ReviewListResponse } from '@/types/review';
import { api } from './api';

const API_URL = process.env.NEXT_REVIEW_API_URL || 'http://localhost:8080';
// ✅ 리뷰 목록 조회
export async function getReviews(page = 0, size = 10): Promise<ReviewListResponse> {
  try {
    const res = await api.get(`${API_URL}/api/receiptReview/reviews`, {
      params: { page, size }
    });
    return {
      reviews: res.data.content, // 백엔드에서 content 배열로 받는 경우
      totalCount: res.data.totalElements,
      size: res.data.size,
      number: res.data.number,
    };
  } catch (error) {
    console.error('리뷰 목록 조회 실패:', error);
    throw error;
  }
}

// ✅ 리뷰 상세 조회
export async function getReviewById(id: number): Promise<Review | null> {
  try {
    const res = await api.get(`${API_URL}/api/receiptReview/reviews/${id}`);
    return res.data;
  } catch (error) {
    console.error('리뷰 상세 조회 실패:', error);
    return null;
  }
}

// ✅ 리뷰 등록
export async function createReview(formData: FormData) {
  try {
    const res = await api.post(`${API_URL}/api/receiptReview`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
    throw error;
  }
}