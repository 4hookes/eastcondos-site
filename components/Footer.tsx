export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          {/* Left Side */}
          <div className="text-center md:text-left">
            <div className="font-bold text-lg mb-1">EastCondos.sg</div>
            <div className="text-sm text-gray-300">
              © {currentYear} EastCondos.sg. All rights reserved.
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-gray-300 hover:text-gold transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gold transition-colors duration-200"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
