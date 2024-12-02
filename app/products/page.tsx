'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Toys'];

const products: Product[] = [
  { id: 1, title: 'Wireless Headphones', price: 79.99, image: '/images/headphones.jpg', category: 'Electronics' },
  { id: 2, title: 'Smart LED TV', price: 499.99, image: '/images/tv.jpg', category: 'Electronics' },
  { id: 3, title: 'Cozy Sweater', price: 39.99, image: '/images/sweater.jpg', category: 'Clothing' },
  { id: 4, title: 'Running Shoes', price: 89.99, image: '/images/shoes.jpg', category: 'Clothing' },
  { id: 5, title: 'Mystery Novel', price: 14.99, image: '/images/book.jpg', category: 'Books' },
  { id: 6, title: 'Cookbook Collection', price: 29.99, image: '/images/cookbook.jpg', category: 'Books' },
  { id: 7, title: 'Coffee Maker', price: 59.99, image: '/images/coffeemaker.jpg', category: 'Home' },
  { id: 8, title: 'Throw Pillow Set', price: 24.99, image: '/images/pillows.jpg', category: 'Home' },
  { id: 9, title: 'Smartphone', price: 699.99, image: '/images/smartphone.jpg', category: 'Electronics' },
  { id: 10, title: 'Laptop', price: 999.99, image: '/images/laptop.jpg', category: 'Electronics' },
  { id: 11, title: 'Dress Shirt', price: 49.99, image: '/images/dress-shirt.jpg', category: 'Clothing' },
  { id: 12, title: 'Jeans', price: 59.99, image: '/images/jeans.jpg', category: 'Clothing' },
  {id: 13, title: 'Sci-Fi Novel', price: 12.99, image: '/images/sci-fi-book.jpg', category: 'Books' },
  { id: 14, title: 'Board Game', price: 34.99, image: '/images/board-game.jpg', category: 'Toys' },
  { id: 15, title: 'Action Figure', price: 19.99, image: '/images/action-figure.jpg', category: 'Toys' },
  { id: 16, title: 'Blender', price: 79.99, image: '/images/blender.jpg', category: 'Home' },
];

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-orange-500 mb-4">Spooky Products</h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-orange-500 text-black'
                  : 'bg-gray-800 text-orange-500'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-orange-500"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-orange-400 mb-2 truncate">{product.title}</h2>
                  <p className="text-orange-500 font-bold">₹{(product.price * 75).toFixed(2)}</p>
                  <p className="text-sm text-orange-300 mt-1 capitalize">{product.category}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

