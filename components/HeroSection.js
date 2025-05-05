"use client";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { Poppins } from "next/font/google";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const HeroSection = ({ onLoginClick }) => {
  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // This ensures animations run after hydration
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-between min-h-[80vh] bg-white overflow-hidden"
    >
      {/* Animated Triangles */}
      <div className="absolute left-8 top-1/4 w-12 h-12 opacity-10 animate-float animation-delay-100">
        <div className="w-0 h-0 border-l-[24px] border-l-transparent border-b-[42px] border-b-blue-400 border-r-[24px] border-r-transparent"></div>
      </div>
      <div className="absolute left-16 top-3/4 w-16 h-16 opacity-15 animate-float animation-delay-200">
        <div className="w-0 h-0 border-l-[32px] border-l-transparent border-b-[56px] border-b-blue-500 border-r-[32px] border-r-transparent"></div>
      </div>
      <div className="absolute left-24 bottom-1/3 w-10 h-10 opacity-20 animate-float animation-delay-300">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-blue-300 border-r-[20px] border-r-transparent"></div>
      </div>

      {/* Center Mixed Triangles */}
      <div className="absolute left-1/3 top-1/2 w-14 h-14 opacity-10 -translate-y-1/2 animate-float animation-delay-400">
        <div className="w-0 h-0 border-l-[28px] border-l-transparent border-b-[48px] border-b-blue-400 border-r-[28px] border-r-transparent"></div>
      </div>
      <div className="absolute left-2/5 bottom-1/4 w-18 h-18 opacity-15 animate-float animation-delay-500">
        <div className="w-0 h-0 border-l-[36px] border-l-transparent border-t-[62px] border-t-blue-600 border-r-[36px] border-r-transparent"></div>
      </div>
      <div className="absolute left-1/2 top-1/3 w-8 h-8 opacity-25 -translate-x-1/2 animate-float animation-delay-600">
        <div className="w-0 h-0 border-l-[16px] border-l-transparent border-t-[28px] border-t-blue-500 border-r-[16px] border-r-transparent"></div>
      </div>

      {/* Additional Animated Triangles */}
      <div className="absolute left-16 top-1/5 w-20 h-20 opacity-15 animate-float animation-delay-700">
        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-b-[70px] border-b-teal-300 border-r-[40px] border-r-transparent"></div>
      </div>
      <div className="absolute left-1/4 bottom-1/5 w-14 h-14 opacity-15 animate-float animation-delay-800">
        <div className="w-0 h-0 border-l-[28px] border-l-transparent border-t-[48px] border-t-indigo-400 border-r-[28px] border-r-transparent"></div>
      </div>
      <div className="absolute left-1/3 top-1/4 w-10 h-10 opacity-25 animate-float animation-delay-900">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-purple-400 border-r-[20px] border-r-transparent"></div>
      </div>

      {/* Additional Triangle 4 - X-Large, sky blue, very low opacity */}
      <div className="absolute left-80 bottom-2/3 w-24 h-24 opacity-20 animate-float animation-delay-400">
        <div className="w-0 h-0 border-l-[48px] border-l-transparent border-t-[84px] border-t-sky-300 border-r-[48px] border-r-transparent"></div>
      </div>

      {/* Additional Triangle 5 - Medium, deep blue, medium opacity */}
      <div className="absolute left-130 bottom-1/3 w-16 h-16 opacity-15 animate-float animation-delay-200">
        <div className="w-0 h-0 border-l-[32px] border-l-transparent border-b-[56px] border-b-blue-700 border-r-[32px] border-r-transparent"></div>
      </div>

      {/* Additional Triangle 6 - Small, cyan, high opacity */}
      <div className="absolute left-10 top-3/4 w-8 h-8 opacity-20 animate-float animation-delay-400">
        <div className="w-0 h-0 border-l-[16px] border-l-transparent border-t-[28px] border-t-cyan-400 border-r-[16px] border-r-transparent"></div>
      </div>

      {/* Additional Triangle 7 - Medium, violet, low opacity */}
      <div className="absolute left-2/5 top-1/6 w-18 h-18 opacity-20 animate-float animation-delay-700">
        <div className="w-0 h-0 border-l-[36px] border-l-transparent border-b-[62px] border-b-violet-400 border-r-[36px] border-r-transparent"></div>
      </div>

      {/* Additional Triangle 8 - X-Small, light blue, medium-high opacity */}
      <div className="absolute left-1/4 bottom-3/4 w-6 h-6 opacity-20 animate-float animation-delay-100">
        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-t-[21px] border-t-blue-400 border-r-[12px] border-r-transparent"></div>
      </div>

      {/* Additional Triangle 9 - Large, navy, very low opacity */}
      <div className="absolute left-1/5 bottom-2/8 w-22 h-22 opacity-15 animate-float animation-delay-900">
        <div className="w-0 h-0 border-l-[44px] border-l-transparent border-t-[77px] border-t-purple-500 border-r-[44px] border-r-transparent"></div>
      </div>

      {/* Additional Triangle 10 - Medium, azure, medium opacity */}
      <div className="absolute left-3/7 top-1/2 w-14 h-14 opacity-25 animate-float animation-delay-300">
        <div className="w-0 h-0 border-l-[28px] border-l-transparent border-b-[48px] border-b-blue-400 border-r-[28px] border-r-transparent"></div>
      </div>

      {/* Text Content with Slide-in Animation */}
      <div
        ref={textRef}
        className={`relative z-10 flex-1 flex flex-col justify-center max-w-2xl px-6 ml-12 md:ml-24 transition-all duration-700 ease-out ${
          textInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        <h1
          className={`text-4xl md:text-6xl font-extrabold text-blue-800 mb-4 leading-tight ${orbitron.className}`}
        >
          Smart Finance
        </h1>
        <p
          className={`text-lg md:text-xl text-blue-600 max-w-lg tracking-wide ${poppins.className} mb-6`}
        >
          Manage your finances smartly with AI-powered personal budgeting and
          investment insights.
        </p>

        <button
          onClick={onLoginClick}
          className={`bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all w-fit shadow-md hover:shadow-lg font-medium ${
            textInView
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          } transition-all duration-700 ease-out delay-200`}
        >
          Get Started
        </button>
      </div>

      {/* Floating Illustration */}
      <div className="flex-1 relative h-full min-h-[80vh] hidden md:block animate-float animation-delay-500">
        <Image
          src="/hero.jpg"
          alt="Finance Illustration"
          fill
          className="object-contain object-right"
          priority
        />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
