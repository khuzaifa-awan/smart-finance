"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import AboutUs from "../../components/AboutUs";
import CallToAction from "../../components/CallToAction";
import ContactUs from "../../components/ContactUs";

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.ok) {
      router.push("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/home" });
  };

  const handleSignupRedirect = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with login button trigger */}
      <Navbar onLoginClick={handleLoginOpen} />

      {/* Main Sections */}
      <HeroSection onLoginClick={handleLoginOpen} />
      <AboutUs />
      <CallToAction onLoginClick={handleLoginOpen} />
      <ContactUs />

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div
            className={`bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative transform transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <button
              onClick={handleLoginClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Smart Finance Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 mb-2">OR</p>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                Sign in with Google
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don&apos;t have an account?
                <button
                  onClick={handleSignupRedirect}
                  className="ml-1 text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
