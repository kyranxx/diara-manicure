export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-light text-black dark:text-white mb-4">404</h1>
        <p className="text-xl text-neutral-600 dark:text-white mb-8">
          Stránka nebola nájdená
        </p>
        <a 
          href="/"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Späť na hlavnú stránku
        </a>
      </div>
    </div>
  )
}
