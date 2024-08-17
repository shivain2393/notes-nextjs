
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Page Not Found
      </h2>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
