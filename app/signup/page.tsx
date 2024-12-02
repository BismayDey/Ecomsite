'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import Layout from '../../components/Layout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        createdAt: new Date().toISOString(),
      });
      router.push('/');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        username: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      router.push('/');
    } catch (error) {
      setError('Failed to sign up with Google. Please try again.');
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8 border border-orange-500"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-orange-400 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-orange-400 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-orange-400 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-orange-500 text-black py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Sign Up
          </motion.button>
        </form>
        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignUp}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Sign up with Google
          </motion.button>
        </div>
        <p className="mt-4 text-center text-orange-400">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </Layout>
  );
}

