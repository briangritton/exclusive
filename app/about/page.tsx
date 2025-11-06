import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Exclusive
        </h1>
        <p className="text-lg text-gray-600">
          Your partner in luxury real estate
        </p>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-700 mb-4">
            We specialize in luxury real estate throughout Northern California,
            focusing exclusively on premium properties valued at $1.5M and above.
            Our personalized approach ensures you find not just a house, but your
            dream home.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Service
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Exclusive access to luxury properties in Northern California</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Personalized property search tailored to your needs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Instant alerts when new properties match your criteria</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Expert guidance throughout your home buying journey</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Comprehensive mortgage origination services</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Started
          </h2>
          <p className="text-gray-700 mb-6">
            Ready to find your perfect home? Start by searching our exclusive
            collection of luxury properties, or reach out to us directly.
          </p>
          <div className="flex gap-4">
            <Link
              href="/search"
              className="rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
            >
              Search Properties
            </Link>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> contact@exclusive.com
            </p>
            <p>
              <strong>Phone:</strong> (555) 123-4567
            </p>
            <p className="text-sm text-gray-500 mt-4">
              We typically respond within 24 hours
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
