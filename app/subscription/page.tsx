"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import { useAuth } from "../../hooks/useAuth";
import { updateUserProfile, getUserProfile } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { Star, Zap, Truck, Gift, Clock } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: 499,
    features: [
      {
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        text: "10% discount on all products",
      },
      {
        icon: <Zap className="w-5 h-5 text-blue-500" />,
        text: "2x Chor Coins on purchases",
      },
      {
        icon: <Truck className="w-5 h-5 text-green-500" />,
        text: "Free shipping on orders above ₹1000",
      },
      {
        icon: <Gift className="w-5 h-5 text-purple-500" />,
        text: "Birthday surprise gift",
      },
    ],
  },
  {
    name: "Plus",
    price: 999,
    features: [
      {
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        text: "20% discount on all products",
      },
      {
        icon: <Zap className="w-5 h-5 text-blue-500" />,
        text: "3x Chor Coins on purchases",
      },
      {
        icon: <Truck className="w-5 h-5 text-green-500" />,
        text: "Free shipping on all orders",
      },
      {
        icon: <Clock className="w-5 h-5 text-red-500" />,
        text: "Exclusive early access to new products",
      },
      {
        icon: <Gift className="w-5 h-5 text-purple-500" />,
        text: "Quarterly surprise gift box",
      },
    ],
  },
];

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubscribe = async (planName: "basic" | "plus") => {
    if (!user) return;

    setLoading(true);
    try {
      // Simulate payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);

      await updateUserProfile(user.uid, {
        subscriptionPlan: planName,
        subscriptionEndDate: endDate.toISOString(),
      });

      router.push("/profile");
    } catch (error) {
      console.error("Error subscribing to plan:", error);
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
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Choose Your CHORBAAZAR+ Plan
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-orange-500"
            >
              <h2 className="text-2xl font-bold text-orange-400 mb-4">
                {plan.name}
              </h2>
              <p className="text-3xl font-bold text-orange-500 mb-6">
                ₹{plan.price}/year
              </p>
              <ul className="text-orange-300 mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.icon}
                    <span className="ml-2">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  handleSubscribe(plan.name.toLowerCase() as "basic" | "plus")
                }
                disabled={loading}
                className="w-full bg-orange-500 text-black py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Processing..." : `Subscribe to ${plan.name}`}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
