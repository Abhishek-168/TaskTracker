
/**
 * Toggles the status of a task (eg pending -> in-progress -> completed)
 * @param {string|number} id - the task id
 * @returns {Promise<Object|null>} the updated task object or null if error
 */
export async function toggleTaskStatus(id) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}/toggle`, {
      method: "PATCH",
    });

    if (!response.ok) {
      console.log("Error updating task status");
      return null;
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.log("Error updating task status:", error);
    return null;
  }
}
