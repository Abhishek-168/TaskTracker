

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
    }
}

