import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Discover Your Exclusive Home
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Luxury real estate in Northern California. Find your dream home
              with personalized service and expert guidance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/search"
                className="rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Search Properties
              </Link>
              <Link
                href="/about"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-gray-700 transition-colors"
              >
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-900 flex items-center justify-center text-3xl">
                🏡
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Luxury Properties
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Exclusive access to premium homes $1.5M+ throughout Northern California
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-900 flex items-center justify-center text-3xl">
                💼
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Expert Guidance
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Personalized service to help you find the perfect home
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-900 flex items-center justify-center text-3xl">
                🔔
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Instant Alerts
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Be the first to know when new properties match your criteria
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
