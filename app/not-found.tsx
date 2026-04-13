import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl md:text-9xl font-serif font-bold text-amber leading-none mb-6">
        404
      </p>
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-10 max-w-md text-lg leading-relaxed">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
