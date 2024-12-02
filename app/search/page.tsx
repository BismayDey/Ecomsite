'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      const halloweenProducts = [
        { id: 1, title: 'Spooky Skeleton Costume', price: 49.99, image: '/placeholder.svg?height=200&width=200', category: 'Costumes' },
        { id: 2, title: 'Haunted House Decoration Set', price: 79.99, image: '/placeholder.svg?height=200&width=200', category: 'Decorations' },
        { id: 3, title: 'Witch\'s Cauldron', price: 24.99, image: '/placeholder.svg?height=200&width=200', category: 'Accessories' },
        { id: 4, title: 'Pumpkin Carving Kit', price: 14.99, image: '/placeholder.svg?height=200&width=200', category: 'Accessories' },
        { id: 5, title: 'Assorted Halloween Candy', price: 9.99, image: '/placeholder.svg?height=200&width=200', category: 'Candy' },
        { id: 6, title: 'Zombie Makeup Kit', price: 19.99, image: '/placeholder.svg?height=200&width=200', category: 'Accessories' },
        { id: 7, title: 'Glowing Ghost Decoration', price: 34.99, image: '/placeholder.svg?height=200&width=200', category: 'Decorations' },
        { id: 8, title: 'Vampire Costume Set', price: 59.99, image: '/placeholder.svg?height=200&width=200', category: 'Costumes' },
      ];

      const filteredProducts = query
        ? halloweenProducts.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          )
        : halloweenProducts;

      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
  }, [query]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-orange-500 mb-8">Search Results for "{query}"</h1>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
        </motion.div>
      ) : (
        <AnimatePresence>
          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-orange-500"
            >
              <p className="text-xl mb-4 text-orange-400">No products found matching your search.</p>
              <Link href="/products" className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition duration-300">
                Browse All Products
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-orange-500"
                >
                  <Link href={`/products/${product.id}`}>
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-orange-400 mb-2 truncate">{product.title}</h2>
                      <p className="text-orange-500 font-bold">₹{(product.price * 75).toFixed(2)}</p>
                      <p className="text-sm text-orange-300 mt-1 capitalize">{product.category}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Layout>
  );
}

