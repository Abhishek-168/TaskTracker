
/**
 * Creates a new task on the server
 * @param {string} title - task title
 * @param {string} description - task description
 * @returns {Promise<Array|null>} updated tasks list or null
 */
export async function createTask(title, description) {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      console.log("Error at adding tasks");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error at adding tasks api", error);
    return null;
  }
}
