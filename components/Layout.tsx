'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth, getUserProfile, UserProfile } from '../lib/firebase';
import { ShoppingCart, Star } from 'lucide-react';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        className="text-orange-400 hover:text-orange-500 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemCount(cartItems.length);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setUserData(profile);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/search?q=${encodedQuery}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isPlus = userData?.subscriptionPlan === 'plus';

  return (
    <div className="min-h-screen bg-gray-900 text-orange-400">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="bg-black shadow-md p-4 border-b border-orange-500"
      >
        {/* Navigation content */}
      </motion.nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black shadow-md p-4 md:hidden border-b border-orange-500"
          >
            {/* Mobile menu content */}
          </motion.div>
        )}
      </AnimatePresence>
      <main className="container mx-auto mt-8 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <footer className="bg-black mt-12 py-6 border-t border-orange-500">
        <div className="container mx-auto px-4 text-center text-orange-400">
          <p>&copy; 2023 CHORBAAZAR Plus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

