"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

interface QuizLeadGateProps {
  heading: string;
  subtext: string;
  buttonLabel: string;
  secondaryLabel: string;
  onSubmit: (contact: { name: string; phone: string }) => void;
}

export default function QuizLeadGate({
  heading,
  subtext,
  buttonLabel,
  secondaryLabel,
  onSubmit,
}: QuizLeadGateProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    onSubmit({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <div className="text-center animate-fadeIn">
      <Lock className="w-10 h-10 text-gold mx-auto mb-4" />
      <h2 className="text-2xl md:text-3xl font-bold text-navy font-serif mb-3">
        {heading}
      </h2>
      <p className="text-body mb-8 max-w-md mx-auto">{subtext}</p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
        <button type="submit" className="btn-primary w-full text-lg py-3">
          {buttonLabel}
        </button>
      </form>

      <a
        href="/calculator"
        className="inline-block mt-4 text-sm text-gold hover:text-gold-light font-semibold"
      >
        {secondaryLabel} &rarr;
      </a>
    </div>
  );
}
