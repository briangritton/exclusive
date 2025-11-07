'use client';

import { useEffect, useRef, useState } from 'react';

export default function SearchPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        platform: "Property search self hosted",
        activationToken: "${activationToken}"
      };
    `;

    document.head.appendChild(script2);
    document.head.appendChild(script1);

    // Wait for scripts to load and render widget
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max

    const loadWidget = () => {
      attempts++;
      const ihfKestrel = (window as any).ihfKestrel;

      if (ihfKestrel && ihfKestrel.render && containerRef.current) {
        try {
          // Render listing search widget
          const widget = ihfKestrel.render({
            "component": "listingSearchWidget"
          });

          if (widget) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(widget);
            setLoading(false);
          } else {
            if (attempts < maxAttempts) {
              setTimeout(loadWidget, 100);
            } else {
              setError('Unable to load property search widget');
              setLoading(false);
            }
          }
        } catch (err) {
          console.error('Error rendering widget:', err);
          setError('Failed to load property search widget');
          setLoading(false);
        }
      } else {
        // Retry after a short delay
        if (attempts < maxAttempts) {
          setTimeout(loadWidget, 100);
        } else {
          setError('Property search temporarily unavailable');
          setLoading(false);
        }
      }
    };

    // Start trying to load the widget after scripts have had time to initialize
    setTimeout(loadWidget, 500);

    // Cleanup function
    return () => {
      // Note: We don't remove scripts on cleanup to avoid issues with fast refresh
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Properties</h1>
        <p className="mt-2 text-gray-600">
          Browse luxury homes in Northern California
        </p>
      </div>

      {/* Loading state */}
      {loading && !error && (
        <div className="text-center py-12">
          <div className="text-gray-500">Loading property search...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Widget container */}
      <div ref={containerRef} id="ihf-widget-container"></div>
    </div>
  );
}
