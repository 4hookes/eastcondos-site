"use client";

import { useState } from "react";
import { CheckCircle, Check } from "lucide-react";
import calculatorData from "@/content/calculator.json";

export default function StrategyForm() {
  const [step, setStep] = useState(1);
  const [showSpouse, setShowSpouse] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    citizenship: "",
    monthlyIncome: "",
    spouseName: "",
    spouseAge: "",
    spouseCitizenship: "",
    spouseIncome: "",
    propertyType: "",
    address: "",
    estimatedValue: "",
    outstandingLoan: "",
    cpfUsed: "",
    cpfOaBalance: "",
    goal: "",
    targetArea: "",
    mustHaves: "",
    timeline: "",
    questions: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.name.trim()) {
      alert("Please enter your name to continue.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // TODO: Wire up to GoHighLevel webhook endpoint
    console.log(JSON.stringify(formData, null, 2));
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-navy mb-4">
          {calculatorData.confirmation.heading}
        </h2>
        <p className="text-lg text-body mb-6 max-w-xl mx-auto">
          {calculatorData.confirmation.body}
        </p>
        <a
          href={calculatorData.confirmation.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-gold-light font-semibold underline"
        >
          {calculatorData.confirmation.youtubeLabel}
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {calculatorData.steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step > s.number
                      ? "bg-gold text-white"
                      : step === s.number
                      ? "bg-gold text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    step >= s.number
                      ? "font-semibold text-navy"
                      : "text-gray-500"
                  }`}
                >
                  {s.title}
                </span>
              </div>
              {index < calculatorData.steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 -mt-8 ${
                    step > s.number ? "bg-gold" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 - Tell me about yourself */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-navy mb-2">
            {calculatorData.steps[0].title}
          </h2>
          <p className="text-body mb-6">{calculatorData.steps[0].intro}</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Citizenship
              </label>
              <select
                value={formData.citizenship}
                onChange={(e) => updateField("citizenship", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="">Select...</option>
                {calculatorData.citizenshipOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Monthly Fixed Income
              </label>
              <input
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => updateField("monthlyIncome", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Base salary excluding bonuses/allowances.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setShowSpouse(!showSpouse)}
                className="text-sm font-semibold text-gold hover:text-gold-light transition-colors"
              >
                {showSpouse ? "− Remove" : "+ Add"} Spouse / Co-Owner
              </button>

              {showSpouse && (
                <div className="space-y-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">
                      Spouse Name
                    </label>
                    <input
                      type="text"
                      value={formData.spouseName}
                      onChange={(e) => updateField("spouseName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">
                      Spouse Age
                    </label>
                    <input
                      type="number"
                      value={formData.spouseAge}
                      onChange={(e) => updateField("spouseAge", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">
                      Spouse Citizenship
                    </label>
                    <select
                      value={formData.spouseCitizenship}
                      onChange={(e) =>
                        updateField("spouseCitizenship", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      {calculatorData.citizenshipOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">
                      Spouse Monthly Income
                    </label>
                    <input
                      type="number"
                      value={formData.spouseIncome}
                      onChange={(e) =>
                        updateField("spouseIncome", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2 - Current Situation */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-navy mb-2">
            {calculatorData.steps[1].title}
          </h2>
          <p className="text-body mb-6">{calculatorData.steps[1].intro}</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Current Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => updateField("propertyType", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="">Select...</option>
                {calculatorData.propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Address / Estate
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Estimated Value
              </label>
              <input
                type="number"
                value={formData.estimatedValue}
                onChange={(e) => updateField("estimatedValue", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Rough estimate is fine.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Outstanding Loan
              </label>
              <input
                type="number"
                value={formData.outstandingLoan}
                onChange={(e) => updateField("outstandingLoan", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave 0 if fully paid.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Total CPF Used + Accrued Interest
              </label>
              <input
                type="number"
                value={formData.cpfUsed}
                onChange={(e) => updateField("cpfUsed", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Check CPF portal under 'Home Ownership Dashboard'.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Current CPF OA Balance
              </label>
              <input
                type="number"
                value={formData.cpfOaBalance}
                onChange={(e) => updateField("cpfOaBalance", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total for all owners combined.
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-8">
            <button onClick={handleBack} className="btn-outline">
              Back
            </button>
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Your property goal */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-navy mb-2">
            {calculatorData.steps[2].title}
          </h2>
          {calculatorData.steps[2].intro && (
            <p className="text-body mb-6">{calculatorData.steps[2].intro}</p>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-3">
                Main Goal
              </label>
              <div className="space-y-3">
                {calculatorData.goalOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.goal === option.value
                        ? "border-gold bg-gold bg-opacity-5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={option.value}
                      checked={formData.goal === option.value}
                      onChange={(e) => updateField("goal", e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                          formData.goal === option.value
                            ? "border-gold"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.goal === option.value && (
                          <div className="w-3 h-3 rounded-full bg-gold"></div>
                        )}
                      </div>
                      <span className="font-medium text-navy">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Target Area / Preferences
              </label>
              <textarea
                value={formData.targetArea}
                onChange={(e) => updateField("targetArea", e.target.value)}
                rows={3}
                placeholder="e.g. East Coast, near good schools, walking distance to MRT..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Must-Haves <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <textarea
                value={formData.mustHaves}
                onChange={(e) => updateField("mustHaves", e.target.value)}
                rows={3}
                placeholder="e.g. 3+ bedrooms, pool, near parents, pet-friendly..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="">Select...</option>
                {calculatorData.timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Questions
              </label>
              <textarea
                value={formData.questions}
                onChange={(e) => updateField("questions", e.target.value)}
                rows={4}
                placeholder="What questions do you have about your upgrade?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                This helps me focus on what matters most to you in the video.
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-8">
            <button onClick={handleBack} className="btn-outline">
              Back
            </button>
            <button onClick={handleSubmit} className="btn-primary">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
