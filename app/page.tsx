'use client';

import { useEffect, useRef, useState } from 'react';

// Declare iHomefinder types for window object
declare global {
  interface Window {
    ihfKestrel?: {
      render: (config?: { component?: string; style?: string; [key: string]: string | undefined }) => HTMLElement;
    };
  }
}

export default function Home() {
  const quickSearchRef = useRef<HTMLDivElement>(null);
  const featuredListingsRef = useRef<HTMLDivElement>(null);
  const sellMyHouseRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const scriptsLoadedRef = useRef(false);

  useEffect(() => {
    // Only load scripts once
    if (scriptsLoadedRef.current) return;
    scriptsLoadedRef.current = true;

    const activationToken = process.env.NEXT_PUBLIC_IHOMEFINDER_ACTIVATION_TOKEN;

    // Load iHomefinder Kestrel script
    const script1 = document.createElement('script');
    script1.src = 'https://kestrel.idxhome.com/ihf-kestrel.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.ihfKestrel = window.ihfKestrel || {};
      ihfKestrel.config = {
        platform: "custom",
        activationToken: "${activationToken}"
      };
    `;

    document.head.appendChild(script2);
    document.head.appendChild(script1);

    // Wait for scripts to load and render widgets
    let attempts = 0;
    const maxAttempts = 50;

    const loadWidgets = () => {
      attempts++;
      const ihfKestrel = window.ihfKestrel;

      if (ihfKestrel && ihfKestrel.render) {
        try {
          // Render Quick Search widget
          if (quickSearchRef.current) {
            const quickSearchWidget = ihfKestrel.render({
              "component": "quickSearchWidget",
              "style": "horizontal"
            });
            if (quickSearchWidget) {
              quickSearchRef.current.innerHTML = '';
              quickSearchRef.current.appendChild(quickSearchWidget);
            }
          }

          // Render Featured Listings (Gallery Slider) widget
          if (featuredListingsRef.current) {
            const featuredWidget = ihfKestrel.render({
              "component": "gallerySliderWidget"
            });
            if (featuredWidget) {
              featuredListingsRef.current.innerHTML = '';
              featuredListingsRef.current.appendChild(featuredWidget);
            }
          }

          // Render Sell My House widget
          if (sellMyHouseRef.current) {
            const sellWidget = ihfKestrel.render({
              "component": "sellMyHouseWidget"
            });
            if (sellWidget) {
              sellMyHouseRef.current.innerHTML = '';
              sellMyHouseRef.current.appendChild(sellWidget);
            }
          }

          setLoading(false);
        } catch (err) {
          console.error('Error rendering widgets:', err);
          if (attempts < maxAttempts) {
            setTimeout(loadWidgets, 100);
          } else {
            setLoading(false);
          }
        }
      } else {
        if (attempts < maxAttempts) {
          setTimeout(loadWidgets, 100);
        } else {
          setLoading(false);
        }
      }
    };

    setTimeout(loadWidgets, 500);

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div>
      {/* Hero Section with Quick Search */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Discover Your Exclusive Home
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Luxury real estate in Northern California. Find your dream home
              with personalized service and expert guidance.
            </p>
          </div>

          {/* Quick Search Widget */}
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="text-center py-8">
                <div className="text-gray-500">Loading search...</div>
              </div>
            )}
            <div className="ihf-widget-isolation" ref={quickSearchRef} id="quick-search-container"></div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="mt-2 text-gray-600">Explore our curated selection of exclusive homes</p>
          </div>
          <div className="ihf-widget-isolation" ref={featuredListingsRef} id="featured-listings-container"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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

      {/* Sell My House Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sell Your Home</h2>
            <p className="mt-2 text-gray-600">Get a free valuation of your property</p>
          </div>
          <div className="ihf-widget-isolation" ref={sellMyHouseRef} id="sell-my-house-container"></div>
        </div>
      </section>
    </div>
  );
}
