const BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL ||
  'http://103.176.85.119/traders_check/api';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request(
  path: string,
  method: HTTPMethod = 'GET',
  body?: any,
  token?: string
) {
  const url = path.startsWith('http')
    ? path
    : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const error: any = new Error(data?.message || res.statusText || 'Request failed');
    error.status = res.status;
    error.body = data;
    console.error('API ERROR:', error);
    throw error;
  }

  return data;
}

/* =========================
   AUTH APIs
========================= */

export async function login(email: string, password: string) {
  return request('/auth/login', 'POST', { email, password });
}

// Fetch full user by id
export async function getUserById(id: string, token: string) {
  return request(`/auth/users/${id}`, 'GET', undefined, token);
}

export default {
  login,
  getUserById,
};
