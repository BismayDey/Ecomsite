'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile, UserProfile } from '../../lib/firebase';
import Link from 'next/link';

export default function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setUserData(profile);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (!user || !userData) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please log in to view your profile</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8 border border-orange-500"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Your Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-orange-400 font-bold mb-2">Username</label>
            <p className="text-white">{userData.username}</p>
          </div>
          <div>
            <label className="block text-orange-400 font-bold mb-2">Email</label>
            <p className="text-white">{userData.email}</p>
          </div>
          <div>
            <label className="block text-orange-400 font-bold mb-2">Chor Coins Balance</label>
            <p className="text-white">{userData.chorCoins}</p>
          </div>
          <div>
            <label className="block text-orange-400 font-bold mb-2">Subscription Plan</label>
            <p className="text-white capitalize">{userData.subscriptionPlan}</p>
          </div>
          {userData.subscriptionEndDate && (
            <div>
              <label className="block text-orange-400 font-bold mb-2">Subscription End Date</label>
              <p className="text-white">{new Date(userData.subscriptionEndDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Link href="/subscription">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-orange-500 text-black py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
            >
              {userData.subscriptionPlan === 'none' ? 'Subscribe to CHORBAAZAR+' : 'Manage Subscription'}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
}

