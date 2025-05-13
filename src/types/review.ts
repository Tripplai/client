export interface ReviewImage {
  reviewImageId: number;
  imageUrl: string;
}

export interface Review {
  receiptReviewId: number;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
  nickname: string;
  images: ReviewImage[];
  address?: string;
}

export interface ReviewListResponse {
  reviews: Review[];   // 기존: content를 reviews로 리네이밍했음
  totalCount: number;  // totalElements
  size: number;
  number: number;
}