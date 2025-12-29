"use client";

import { useState } from "react";
import Link from "next/link";

export default function RequestDiscussion() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Later: send formData to API / Supabase / email
    console.log("Form submitted:", formData);

    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-green-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Thank You</h2>
          <p className="text-gray-600 mb-8">
            We've received your request and will be in touch within 1–2 business days.
          </p>
          <Link
            href="/"
            className="inline-block text-green-800 hover:text-[#1B4D3E] font-medium"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Request a Discussion
        </h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Share a bit about your project, and we'll follow up within 1–2 business days to explore how we can help.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 focus:ring-opacity-20"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 focus:ring-opacity-20"
            />
          </div>

          {/* Organization (Optional) */}
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
              Organization <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Company or institution name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 focus:ring-opacity-20"
            />
          </div>

          {/* Challenge / Context */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              What trial de-risking analysis would you like?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Brief description of your trial context, decision question, or analytical challenge..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 focus:ring-opacity-20 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-[#1B4D3E] text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Request Discussion
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
              All inquiries are reviewed personally. We typically respond within 1–2 business days.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}