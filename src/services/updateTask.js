
/**
 * Updates a exisiting task on the server
 * @param {string|number} taskId - id of the task to update
 * @param {string} title - updated title
 * @param {string} description - updated description
 * @returns {Promise<Array|null>} updated tasks array or null if it fails
 */
export async function updateTask(taskId, title, description) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      console.log("Error updating task");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error updating task api", error);
    return null;
  }
}
