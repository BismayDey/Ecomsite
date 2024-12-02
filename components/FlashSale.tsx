'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface FlashSaleItem {
  id: number;
  title: string;
  price: number;
  salePrice: number;
  image: string;
  endTime: Date;
}

const flashSaleItems: FlashSaleItem[] = [
  {
    id: 1,
    title: 'Limited Edition Smartwatch',
    price: 199.99,
    salePrice: 149.99,
    image: '/images/smartwatch.jpg',
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  },
  {
    id: 2,
    title: 'Premium Noise-Cancelling Headphones',
    price: 299.99,
    salePrice: 199.99,
    image: '/images/headphones.jpg',
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
  },
];

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const updatedTimeLeft: { [key: number]: string } = {};

      flashSaleItems.forEach((item) => {
        const difference = item.endTime.getTime() - now.getTime();
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          updatedTimeLeft[item.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          updatedTimeLeft[item.id] = 'Sale Ended';
        }
      });

      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-12 bg-gray-800 p-6 rounded-lg border border-orange-500">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Flash Sale!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flashSaleItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-700 p-4 rounded-lg shadow-lg"
          >
            <Image src={item.image} alt={item.title} width={300} height={300} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-orange-400 mb-2">{item.title}</h3>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-gray-400 line-through mr-2">₹{(item.price * 75).toFixed(2)}</span>
                <span className="text-orange-500 font-bold">₹{(item.salePrice * 75).toFixed(2)}</span>
              </div>
              <div className="flex items-center text-yellow-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{timeLeft[item.id]}</span>
              </div>
            </div>
            <Link href={`/products/${item.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-orange-500 text-black px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition duration-300"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

