'use client';

import { useEffect, useRef, useState } from 'react';

// Declare iHomefinder types for window object
declare global {
  interface Window {
    ihfKestrel?: {
      render: (config?: Record<string, any>) => HTMLElement;
    };
  }
}

export default function ListingPage() {
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
        platform: "custom",
        activationToken: "${activationToken}"
      };
    `;

    document.head.appendChild(script2);
    document.head.appendChild(script1);

    // Wait for scripts to load and render widget
    let attempts = 0;
    const maxAttempts = 50;

    const loadWidget = () => {
      attempts++;
      const ihfKestrel = window.ihfKestrel;

      if (ihfKestrel && ihfKestrel.render && containerRef.current) {
        try {
          // Render SEO page - iHomefinder auto-detects /listing from URL
          const content = ihfKestrel.render();

          if (content) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(content);
            setLoading(false);
          } else {
            if (attempts < maxAttempts) {
              setTimeout(loadWidget, 100);
            } else {
              setError('Unable to load property details');
              setLoading(false);
            }
          }
        } catch (err) {
          console.error('Error rendering page:', err);
          setError('Failed to load property details');
          setLoading(false);
        }
      } else {
        if (attempts < maxAttempts) {
          setTimeout(loadWidget, 100);
        } else {
          setError('Property details temporarily unavailable');
          setLoading(false);
        }
      }
    };

    setTimeout(loadWidget, 500);

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Property Details</h1>
      </div>

      {/* Loading state */}
      {loading && !error && (
        <div className="text-center py-12">
          <div className="text-gray-500">Loading property details...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Widget container */}
      <div className="ihf-widget-isolation" ref={containerRef} id="listing-detail-container"></div>
    </div>
  );
}
