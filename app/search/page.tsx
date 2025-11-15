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
        platform: "custom",
        activationToken: "${activationToken}"
      };
    `;

    document.head.appendChild(script2);
    document.head.appendChild(script1);

    // Wait for scripts to load and render SEO page
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max

    const loadPage = () => {
      attempts++;
      const ihfKestrel = window.ihfKestrel;

      if (ihfKestrel && ihfKestrel.render && containerRef.current) {
        try {
          // Render SEO page - iHomefinder auto-detects "Search Results" from /search URL
          const content = ihfKestrel.render();

          if (content) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(content);
            setLoading(false);
          } else {
            if (attempts < maxAttempts) {
              setTimeout(loadPage, 100);
            } else {
              setError('Unable to load property search');
              setLoading(false);
            }
          }
        } catch (err) {
          console.error('Error rendering page:', err);
          setError('Failed to load property search');
          setLoading(false);
        }
      } else {
        // Retry after a short delay
        if (attempts < maxAttempts) {
          setTimeout(loadPage, 100);
        } else {
          setError('Property search temporarily unavailable');
          setLoading(false);
        }
      }
    };

    // Start trying to load the page after scripts have had time to initialize
    setTimeout(loadPage, 500);

    // Cleanup function
    return () => {
      // Note: We don't remove scripts on cleanup to avoid issues with fast refresh
    };
  }, []);

  return (
    <div>
      {/* Loading state */}
      {loading && !error && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div>Loading property search...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={{ textAlign: 'center', padding: '1.5rem', margin: '1rem' }}>
          <p>{error}</p>
        </div>
      )}

      {/* SEO page container */}
      <div className="ihf-widget-isolation" ref={containerRef} id="ihf-widget-container"></div>
    </div>
  );
}
