export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Properties</h1>
        <p className="mt-2 text-gray-600">
          Browse luxury homes in Northern California
        </p>
      </div>

      {/* iHomefinder Widget Placeholder */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            iHomefinder Widget Goes Here
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            After you sign up for iHomefinder and get your widget ID,
            you'll embed the V10 search widget here.
            <br /><br />
            The widget will provide full MLS search, property details,
            and handle user registration automatically.
          </p>
          <div className="mt-6 text-xs text-gray-400">
            <p>Environment Variable Needed:</p>
            <code className="bg-white px-2 py-1 rounded border border-gray-200">
              NEXT_PUBLIC_IHOMEFINDER_WIDGET_ID
            </code>
          </div>
        </div>
      </div>

      {/* Instructions for later */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          📋 Next Steps (From CHECKLIST.md - Phase 3):
        </h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Sign up for iHomefinder Lead Essentials</li>
          <li>Get your widget embed code from their dashboard</li>
          <li>Add widget ID to .env.local</li>
          <li>Replace this placeholder with the actual widget</li>
        </ol>
      </div>
    </div>
  );
}
