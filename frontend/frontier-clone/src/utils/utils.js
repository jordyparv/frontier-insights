/**
 * Wraps occurrences of a specific word in a string with HTML tags.
 * @param {string} text - The original description text.
 * @param {string} keyword - The word to highlight (e.g., 'magazine').
 * @param {string} tagName - The HTML tag to use (default: 'strong').
 * @returns {string} - The string with injected HTML.
 */
export const addTagToText = (text, keyword, tagName = "strong") => {
  if (!text) return "";

  // Create a global, case-insensitive regex
  const regex = new RegExp(`(${keyword})`, "gi");

  // Replace the keyword with the tagged version
  return text.replace(
    regex,
    `<${tagName} class="highlighted-text">$1</${tagName}>`,
  );
};

/**
 * Generic fetch wrapper for Next.js App Router
 * @param {string} endpoint - The API path (e.g., 'home-page')
 * @param {object} options - Additional fetch options (tags, revalidation, etc.)
 */
export async function getStrapiData(endpoint, options = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  // Default headers and Next.js cache settings
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // If you use an API Token, add it here:
      // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 }, // Global default revalidation
    ...options, // Merge custom options
  };
  
  try {
    // Ensure endpoint starts with a slash, then join
    
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}/api${path}`;
    console.log(
      `Fetching data from: ${url} with options:`, JSON.stringify(defaultOptions, null, 2)
    );
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw response.statusText || "Failed to fetch data";
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error, "Endpoint:", endpoint, "Options:", options);
    throw error;
  }
}

/**
 * Truncate text to a maximum length and append an ellipsis if truncated.
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - Maximum allowed length (default 140).
 * @returns {string}
 */
export const truncate = (text, maxLength = 140) => {
  if (text === undefined || text === null) return "";
  const s = String(text);
  if (s.length <= maxLength) return s;
  if (maxLength <= 3) return s.slice(0, maxLength);
  return s.slice(0, maxLength - 3) + "...";
};

export async function fetchFileBlob(url) {
  console.log("Fetching file blob from URL:", url);
  if(url === undefined || url === null || url?.includes('undefined')) {
    return null
  }
  try {
    const response = await fetch(url,{
      method: "GET",
      headers: {
        // If you need to include authentication headers, add them here
        // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        responseType: 'blob', // Ensure we get a Blob response
      },

    });

    if (!response.ok) {
      // Instead of returning a 404 response, we throw an error 
      // so the calling function knows the fetch failed.
      throw new Error(`File not found: ${response.status}`);
    }

    // This returns the actual Blob object
    return await response.blob();
    
  } catch (error) {
    console.error("Failed to fetch file:", error.message);
    throw error; 
  }
}