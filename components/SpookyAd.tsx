'use client';

import { motion } from 'framer-motion';

export default function SpookyAd() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black p-6 rounded-lg shadow-lg border-2 border-orange-500 text-center my-8"
    >
      <motion.h2
        animate={{ color: ['#FFA500', '#FF4500', '#FFA500'] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-2xl font-bold mb-4"
      >
        🎃 Spooktacular Sale! 🎃
      </motion.h2>
      <p className="text-orange-400 mb-4">Get 20% off on all products!</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
      >
        Shop Now
      </motion.button>
    </motion.div>
  );
}

