export default function Loading() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto pt-40 p-6 space-y-8">
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-[800px] bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}