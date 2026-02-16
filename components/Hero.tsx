import { Play } from "lucide-react";
import heroData from "@/content/hero.json";

export default function Hero() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div>
            {/* Badge */}
            <span className="inline-block px-4 py-1 bg-sage text-white text-sm font-medium rounded-full mb-6">
              {heroData.badge}
            </span>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
              {heroData.heading}
            </h1>

            {/* Subheading */}
            <p className="text-xl text-body italic mt-4">
              {heroData.subheading}
            </p>

            {/* Body Paragraph */}
            <p className="text-lg text-body mt-6 leading-relaxed">
              {heroData.body}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a href={heroData.primaryCta.href} className="btn-primary">
                {heroData.primaryCta.label}
              </a>
              <a href={heroData.secondaryCta.href} className="btn-outline">
                {heroData.secondaryCta.label}
              </a>
            </div>

            {/* CTA Note */}
            <p className="text-sm text-gray-500 mt-3">{heroData.ctaNote}</p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-gray-200">
              {heroData.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index > 0 ? "lg:border-l lg:border-gray-300 lg:pl-6" : ""
                  }`}
                >
                  <div className="text-2xl font-bold text-navy">
                    {stat.value}
                  </div>
                  <div className="text-sm text-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Video Thumbnail */}
          <div>
            {/* Video Thumbnail with Play Button Overlay */}
            <a
              href="#"
              className="relative block group"
              aria-label={heroData.video.caption}
            >
              <img
                src={heroData.video.thumbnail}
                alt={heroData.video.alt}
                className="rounded-xl shadow-lg w-full"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-60 rounded-full p-6 group-hover:bg-opacity-70 transition-all duration-200">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
            </a>

            {/* Video Caption */}
            <div className="mt-4">
              <p className="font-bold text-navy">
                {heroData.video.caption}{" "}
                <span className="font-normal text-body">
                  ({heroData.video.duration})
                </span>
              </p>
              <p className="text-sm text-body mt-1">
                {heroData.video.subcaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
