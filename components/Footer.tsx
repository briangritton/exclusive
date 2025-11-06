export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Exclusive</h3>
            <p className="text-sm text-gray-600">
              Luxury real estate in Northern California
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact</h4>
            <p className="text-sm text-gray-600">
              Email: contact@exclusive.com<br />
              Phone: (555) 123-4567
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Legal</h4>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Exclusive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
