// components/ContactUs.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong.");
    }
  };

  return (
    <section className="relative bg-white py-20 overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side Form */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 text-blue-800">Contact Us</h2>
          <p className="mb-8 text-gray-600">
            Have any questions? Feel free to drop us a message!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              required
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              required
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all duration-300"
            >
              Send Message
            </button>
            {status && (
              <p className="mt-4 text-green-600 font-semibold">{status}</p>
            )}
          </form>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
        >
          <Image
            src="/contact.png"
            alt="Contact us"
            width={384}
            height={384}
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
