'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function PremiumMembership() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleUpgrade = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        isPremium: true
      });

      router.push('/profile');
    } catch (error) {
      console.error('Error upgrading to premium:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Upgrade to CHORBAAZAR Plus</h1>
        <div className="space-y-4">
          <p className="text-gray-600">Enjoy exclusive benefits with CHORBAAZAR Plus:</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Additional discounts on all products</li>
            <li>Early access to new arrivals</li>
            <li>Free express shipping on all orders</li>
            <li>Exclusive member-only deals</li>
          </ul>
          <p className="font-bold text-2xl text-center text-purple-600 mt-6">Only ₹999/year</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Upgrade Now'}
          </motion.button>
        </div>
      </motion.div>
    </Layout>
  );
}

