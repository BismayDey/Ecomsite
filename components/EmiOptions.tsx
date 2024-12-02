'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

interface EmiOption {
  bank: string;
  months: number;
  interestRate: number;
}

interface EmiOptionsProps {
  price: number;
}

const emiOptions: EmiOption[] = [
  { bank: 'HDFC Bank', months: 3, interestRate: 13 },
  { bank: 'ICICI Bank', months: 6, interestRate: 14 },
  { bank: 'SBI', months: 9, interestRate: 15 },
  { bank: 'Axis Bank', months: 12, interestRate: 16 },
];

export default function EmiOptions({ price }: EmiOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<EmiOption | null>(null);

  const calculateEmi = (option: EmiOption) => {
    const principal = price;
    const ratePerMonth = option.interestRate / 12 / 100;
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, option.months)) /
                (Math.pow(1 + ratePerMonth, option.months) - 1);
    return emi.toFixed(2);
  };

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-orange-500">
      <h3 className="text-xl font-semibold text-orange-500 mb-4">EMI Options</h3>
      <div className="space-y-4">
        {emiOptions.map((option) => (
          <motion.div
            key={option.bank}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-lg cursor-pointer ${
              selectedOption === option ? 'bg-orange-500 text-black' : 'bg-gray-700 text-orange-400'
            }`}
            onClick={() => setSelectedOption(option)}
          >
            <h4 className="font-semibold">{option.bank}</h4>
            <p>{option.months} months @ {option.interestRate}% p.a.</p>
            <p className="font-bold mt-2">
              EMI: ₹{calculateEmi(option)}/month
            </p>
          </motion.div>
        ))}
      </div>
      {selectedOption && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gray-700 rounded-lg text-orange-400"
        >
          <p className="font-semibold">Selected EMI Option:</p>
          <p>{selectedOption.bank} - {selectedOption.months} months</p>
          <p className="font-bold">EMI: ₹{calculateEmi(selectedOption)}/month</p>
        </motion.div>
      )}
    </div>
  );
}

