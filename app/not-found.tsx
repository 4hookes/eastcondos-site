import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] gridlines flex flex-col items-center justify-center px-4 text-center">
      <p
        className="font-display font-extralight text-cream/20 leading-none mb-8"
        style={{ fontSize: "clamp(120px, 20vw, 240px)", letterSpacing: "-0.05em" }}
      >
        404
      </p>
      <h1 className="display-block mb-4">Page not found.</h1>
      <p className="prose-dark mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-square">
        Back to the front page
      </Link>
    </div>
  );
}
