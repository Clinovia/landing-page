"use client";

import React from "react";
import { Button } from "./ui/button";

export default function XGBoost() {
  const handleInquiry = () => {
    window.location.href = "mailto:sophie@clinovia.ai?subject=Medical%20ML%20Model%20Inquiry";
  };

  return (
    <section className="bg-gray-50 py-16 w-full">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#1B4D3E] mb-4">XBGoost Results</h2>
        <p className="text-gray-700 mb-8">
          Our XBGoost platform delivers actionable ML/AI insights from internal data. 
          If your team wants to build ML/AI insights from internal data, we can help you get started.
        </p>
        <Button onClick={handleInquiry}>
          Inquire Now
        </Button>
      </div>
    </section>
  );
}
