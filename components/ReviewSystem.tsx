'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  userId: string;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSystemProps {
  productId: number;
  initialReviews: Review[];
}

export default function ReviewSystem({ productId, initialReviews }: ReviewSystemProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview({ ...newReview, comment: e.target.value });
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: reviews.length + 1,
      userId: 'currentUser', // In a real app, this would be the actual user ID
      productId,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString(),
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-orange-500">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
                }`}
              />
            ))}
          </div>
          <p className="text-orange-400">{review.comment}</p>
          <p className="text-sm text-orange-300 mt-2">Posted on {new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
      <form onSubmit={submitReview} className="mt-6">
        <h3 className="text-xl font-semibold text-orange-500 mb-2">Write a Review</h3>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleRatingChange(star)}
              className={`mr-1 ${
                star <= newReview.rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              <Star className={star <= newReview.rating ? 'fill-yellow-500' : ''} />
            </motion.button>
          ))}
        </div>
        <textarea
          value={newReview.comment}
          onChange={handleCommentChange}
          className="w-full p-2 rounded-lg bg-gray-700 text-orange-400 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={4}
          placeholder="Write your review here..."
          required
        ></textarea>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-4 bg-orange-500 text-black px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition duration-300"
        >
          Submit Review
        </motion.button>
      </form>
    </div>
  );
}

