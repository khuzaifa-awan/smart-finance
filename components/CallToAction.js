// components/CallToAction.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CallToAction = ({ onLoginClick }) => {
  return (
    <section
      id="cta"
      className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center justify-between">
        {/* Text Content (now on right) */}
        <div className="mb-10 md:mb-0 md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Take Control of Your Financial Future
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Smart Finance gives you the tools to budget, save, and invest wisely
            with AI-powered insights.
          </p>
          <button
            onClick={onLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition-all duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Animation (now on left) */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative w-96 h-96">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center items-center"
            >
              <Image
                src="/finance-illustration.png"
                alt="Finance Illustration"
                width={400}
                height={400}
                className="animate-float"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
