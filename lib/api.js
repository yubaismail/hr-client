export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetcher = async (url, options = {}) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const res = await fetch(`${API_URL}${url}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    // Handle HTTP errors
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${res.status} ${res.statusText}`);
    }

    // Handle empty responses (like 204 No Content)
    if (res.status === 204) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Convenience methods for common HTTP methods
export const api = {
  get: (url, options = {}) => fetcher(url, { ...options, method: 'GET' }),
  post: (url, data, options = {}) => fetcher(url, { ...options, method: 'POST', body: data }),
  put: (url, data, options = {}) => fetcher(url, { ...options, method: 'PUT', body: data }),
  patch: (url, data, options = {}) => fetcher(url, { ...options, method: 'PATCH', body: data }),
  delete: (url, options = {}) => fetcher(url, { ...options, method: 'DELETE' }),
};