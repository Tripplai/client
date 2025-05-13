'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getReviews } from '@/services/reviewService';
import { ReviewsWrapper } from '@/components/reviews/ReviewsClientWrapper';
import CreateReviewButton from '@/components/reviews/CreateReviewButton';
import Link from 'next/link';


export default function ReviewsPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 0);
  const size = 10;

  const [reviews, setReviews] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews(page, size);
        setReviews(res.content);
        setTotalCount(res.totalElements);
      } catch (err) {
        console.error('리뷰를 가져오는 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  if (loading) return <div className="text-center py-10">리뷰 로딩 중...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">여행 리뷰</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 여행지에 대한 실제 사용자들의 생생한 리뷰와 후기를 확인해보세요.
          </p>
        </div>

        <div className="flex justify-end mb-6 space-x-3">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 transition-colors"
          >
            홈으로
          </Link>

          <CreateReviewButton />
        </div>

        <ReviewsWrapper reviews={reviews} totalCount={totalCount} page={page} pageSize={size} />
      </div>
    </div>
  );
}