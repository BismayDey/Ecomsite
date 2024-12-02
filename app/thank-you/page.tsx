'use client'

import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Thank You for Your Purchase!</h1>
        <p className="text-xl text-white mb-8">Your order has been successfully placed.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/products" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-100 transition duration-300">
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

