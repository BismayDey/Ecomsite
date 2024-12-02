'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../../components/Layout';
import EmiOptions from '../../../components/EmiOptions';
import ReviewSystem from '../../../components/ReviewSystem';
import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '../../../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface Review {
  id: number;
  userId: string;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [userData, setUserData] = useState<any>(null);


  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          //setIsPremium(userDoc.data().isPremium || false);
        }
      }
    };

    checkPremiumStatus();
  }, [user]);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const allProducts = [
        { id: 1, title: 'Wireless Headphones', price: 79.99, description: 'High-quality wireless headphones with noise-cancelling technology.', image: '/images/headphones.jpg', category: 'Electronics' },
        { id: 2, title: 'Smart LED TV', price: 499.99, description: '4K Ultra HD Smart LED TV with HDR and built-in streaming apps.', image: '/images/tv.jpg', category: 'Electronics' },
        { id: 3, title: 'Cozy Sweater', price: 39.99, description: 'Warm and comfortable sweater perfect for chilly days.', image: '/images/sweater.jpg', category: 'Clothing' },
        { id: 4, title: 'Running Shoes', price: 89.99, description: 'Lightweight and breathable running shoes for optimal performance.', image: '/images/shoes.jpg', category: 'Clothing' },
      ];
      const foundProduct = allProducts.find(p => p.id === Number(id));
      setProduct(foundProduct || null);
      setLoading(false);

      // Simulated reviews
      setReviews([
        { id: 1, userId: 'user1', productId: Number(id), rating: 4, comment: 'Great product!', createdAt: '2023-05-15' },
        { id: 2, userId: 'user2', productId: Number(id), rating: 5, comment: 'Absolutely love it!', createdAt: '2023-05-16' },
      ]);
    }, 1000);
  }, [id]);

  const addToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      router.push('/cart');
    }
  };

  const getDiscountedPrice = (price: number) => {
    if (userData?.subscriptionPlan === 'plus') {
      return price * 0.8; // 20% discount for Plus members
    } else if (userData?.subscriptionPlan === 'basic') {
      return price * 0.9; // 10% discount for Basic members
    }
    return price;
  };

  if (loading) {
    return (
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
        </motion.div>
      </Layout>
    );
  }

  if (!product) {
    return <Layout><div className="text-orange-500">Product not found</div></Layout>;
  }

  return (
    <Layout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-orange-500"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 md:w-1/2"
          >
            <h1 className="text-3xl font-bold text-orange-500 mb-4">{product.title}</h1>
            <p className="text-orange-400 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-orange-500 mb-6">
              ₹{getDiscountedPrice(product.price * 75).toFixed(2)}
              {userData?.subscriptionPlan && (
                <span className="ml-2 text-sm text-green-500">
                  {userData.subscriptionPlan === 'plus' ? '20%' : '10%'} CHORBAAZAR {userData.subscriptionPlan === 'plus' ? 'Plus' : 'Basic'} discount applied
                </span>
              )}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition duration-300 flex items-center"
              onClick={addToCart}
            >
              <ShoppingCart className="mr-2" />
              Add to Cart
            </motion.button>
            <EmiOptions price={product.price * 75} />
          </motion.div>
        </motion.div>
        <ReviewSystem productId={product.id} initialReviews={reviews} />
      </AnimatePresence>
    </Layout>
  );
}

