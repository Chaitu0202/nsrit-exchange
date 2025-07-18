// lib/apiClient.ts

export async function fetcher(url: string, options: RequestInit = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.message || 'API request failed';
    throw new Error(errorMessage);
  }

  return res.json();
}
