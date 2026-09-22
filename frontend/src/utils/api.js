const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
export const API_CONFIGURED = Boolean(API_URL);

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const apiCall = async (endpoint, options = {}) => {
  if (!API_CONFIGURED) {
    throw new ApiError('API is not configured for this environment.', 0);
  }

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
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof data === 'object' ? data.message : data;
    throw new ApiError(message || 'Something went wrong', response.status);
  }

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
