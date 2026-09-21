const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const apiCall = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const authAPI = {
  login: (credentials) => apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  signup: (userData) => apiCall('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};
