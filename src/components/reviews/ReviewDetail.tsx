'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Review } from '@/types/review';
import { FaStar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { formatDate } from '@/utils/dateUtils';

interface ReviewDetailProps {
  review: Review;
}

export default function ReviewDetail({ review }: ReviewDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string>(review.images?.[0]?.imageUrl || '/images/reviews-og.jpg');

  const fallbackImage = '/images/reviews-og.jpg';

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-96 w-full bg-gray-100">
        <Image
          src={selectedImage}
          alt={review.title}
          fill
          className="object-cover"
          onError={() => setSelectedImage(fallbackImage)}
          unoptimized
        />
      </div>

      {review.images?.length > 1 && (
        <div className="flex p-2 space-x-2 overflow-x-auto">
          {review.images.map((img, idx) => (
            <div
              key={idx}
              className={`relative w-20 h-20 cursor-pointer ${selectedImage === img.imageUrl ? 'ring-2 ring-pink-500' : ''}`}
              onClick={() => setSelectedImage(img.imageUrl)}
            >
              <Image
                src={img.imageUrl}
                alt={`썸네일 ${idx + 1}`}
                fill
                className="object-cover rounded"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{review.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <FaStar className="text-yellow-500 mr-1" />
            <span>{review.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center mr-4">
            <FaCalendarAlt className="text-gray-400 mr-1" />
            <span>{formatDate(review.createdAt)}</span>
          </div>
        </div>

        <div className="whitespace-pre-line leading-relaxed text-gray-700 mb-6">
          {review.content}
        </div>
      </div>
    </article>
  );
}