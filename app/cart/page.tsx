'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    setLoading(false);
  }, []);

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity * 75, 0);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-orange-500 mb-8">Your Cart</h1>
      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-orange-500"
          >
            <p className="text-xl mb-4 text-orange-400">Your cart is empty.</p>
            <Link href="/products" className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition duration-300">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6 border border-orange-500"
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center border-b border-orange-500 py-4"
              >
                <Image src={item.image} alt={item.title} width={80} height={80} className="object-cover mr-4 rounded" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-orange-400">{item.title}</h2>
                  <p className="text-orange-300">₹{(item.price * 75).toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-orange-500 hover:text-orange-600 mr-2"
                  >
                    -
                  </button>
                  <span className="mx-2 text-orange-400">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-orange-500 hover:text-orange-600 ml-2"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 ml-4"
                >
                  <Trash2 />
                </motion.button>
              </motion.div>
            ))}
            <div className="mt-6">
              <p className="text-xl font-bold text-orange-500">Total: ₹{total.toFixed(2)}</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4"
              >
                <Link href="/checkout" className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition duration-300">
                  Proceed to Checkout
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

