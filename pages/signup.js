// pages/signup.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const router = useRouter();

  const validateForm = () => {
    // Username validation
    if (!form.username || form.username.trim().length < 3) {
      alert("Username must be at least 3 characters long");
      return false;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(form.username)) {
      alert(
        "Username can only contain letters, numbers, underscores, and hyphens"
      );
      return false;
    }

    // Email validation
    if (!form.email || form.email.trim().length === 0) {
      alert("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (!form.password || form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    if (!/(?=.*[a-z])/.test(form.password)) {
      alert("Password must contain at least one lowercase letter");
      return false;
    }
    if (!/(?=.*[A-Z])/.test(form.password)) {
      alert("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/(?=.*\d)/.test(form.password)) {
      alert("Password must contain at least one number");
      return false;
    }

    // Confirm password validation
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post("/api/auth/signup", form);
      alert("Signup successful!");
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Confirm Password"
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
