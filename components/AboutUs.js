// components/AboutUs.jsx
"use client";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-[#0a0a23] to-[#0f0f2e] text-white py-20 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/cta.jpeg"
          alt="About Us Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
          About Smart Finance
        </h2>

        <p className="max-w-3xl text-lg md:text-2xl text-gray-300 leading-relaxed mb-10">
          Empowering you to manage your budgets, investments, and expenses with
          the power of AI-driven insights. Make smarter financial decisions
          effortlessly.
        </p>

        {/* Decorative Cards */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-1 rounded-xl w-80 shadow-lg">
            <div className="bg-[#0a0a23] rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Goal-Based Finances
              </h3>
              <p className="text-gray-400 text-sm">
                Set financial goals and track your progress with precision.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 p-1 rounded-xl w-80 shadow-lg">
            <div className="bg-[#0a0a23] rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Smart Spending
              </h3>
              <p className="text-gray-400 text-sm">
                Smarter budgets built around your habits and goals.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-1 rounded-xl w-80 shadow-lg">
            <div className="bg-[#0a0a23] rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Financial insights
              </h3>
              <p className="text-gray-400 text-sm">
                Visualize your income and expenses in real time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
