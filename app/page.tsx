'use client'

import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FlashSale from '../components/FlashSale';
import SpookyAd from '../components/SpookyAd';

export default function Home() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-orange-500 mb-4">Welcome to CHORBAAZAR</h1>
        <p className="text-xl text-orange-400 mb-8">Discover amazing products with a spooky twist!</p>
        <Link href="/products">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition duration-300"
          >
            Shop Now
          </motion.a>
        </Link>
      </motion.div>
      <FlashSale />
      <SpookyAd />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md border border-orange-500"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Featured Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <a className="block">
                  <div className="relative h-32 mb-2">
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-orange-400">{product.title}</h3>
                  <p className="text-sm text-orange-500 font-bold">₹{(product.price * 75).toFixed(2)}</p>
                </a>
              </Link>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md border border-orange-500"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-orange-400">
            <li>Wide range of high-quality products</li>
            <li>Competitive prices and regular discounts</li>
            <li>Fast and reliable shipping</li>
            <li>Excellent customer service</li>
            <li>Easy returns and exchanges</li>
          </ul>
        </motion.div>
      </div>
    </Layout>
  );
}

const featuredProducts = [
  { id: 1, title: 'Wireless Headphones', price: 79.99, image: '/images/headphones.jpg' },
  { id: 2, title: 'Smart LED TV', price: 499.99, image: '/images/tv.jpg' },
  { id: 3, title: 'Cozy Sweater', price: 39.99, image: '/images/sweater.jpg' },
  { id: 4, title: 'Running Shoes', price: 89.99, image: '/images/shoes.jpg' },
];

