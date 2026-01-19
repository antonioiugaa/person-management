const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const personAPI = {
  // Create person
  create: async (personData) => {
    const response = await fetch(`${API_URL}/persons`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(personData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create person');
    }
    return data.person;
  },

  // Get all persons
  getAll: async () => {
    const response = await fetch(`${API_URL}/persons`, {
      method: 'GET',
      headers: getAuthHeader(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch persons');
    }
    return data;
  },

  // Get single person
  getById: async (id) => {
    const response = await fetch(`${API_URL}/persons/${id}`, {
      method: 'GET',
      headers: getAuthHeader(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch person');
    }
    return data;
  },

  // Update person
  update: async (id, personData) => {
    const response = await fetch(`${API_URL}/persons/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(personData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update person');
    }
    return data.person;
  },

  // Delete person
  delete: async (id) => {
    const response = await fetch(`${API_URL}/persons/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete person');
    }
    return data;
  },

  // Get all persons (admin)
  getAllAdmin: async () => {
    const response = await fetch(`${API_URL}/persons/admin/all`, {
      method: 'GET',
      headers: getAuthHeader(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch persons');
    }
    return data;
  },
};
