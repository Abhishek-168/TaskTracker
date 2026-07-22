
/**
 * Deletes a task from the server
 * @param {string|number} id - task id to delete
 * @returns {Promise<Object|null>} response data or null on failure
 */
export async function deleteTask(id) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.log("Error deleting task");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error deleting task:", error);
    return null;
  }
}
