

/**
 * Fetches all tasks from the backend server
 * @returns {Promise<Array>} array of task objects, returns empty array if it fails
 */
export async function getAllTasks() {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched tasks FE:', data);
    return data;
  }
    catch (error) {
    console.error('There has been a problem while fetching tasks:', error);
    // return empty array so the UI dosent break
    return [];
    }
}

