
/**
 * Searchs for tasks matching the query string
 * @param {string} query - the search term
 * @returns {Promise<Array>} matching tasks or empty array
 */
export async function searchTasks(query) {
  try {
    const res = await fetch(
      `http://localhost:3000/search?search=${encodeURIComponent(query)}`,
    );

    if (!res.ok) {
      console.log("Search request failed");
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error searching tasks:", error);
    return [];
  }
}
