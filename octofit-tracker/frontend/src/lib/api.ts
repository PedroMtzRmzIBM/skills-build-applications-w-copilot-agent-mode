// VITE_CODESPACE_NAME should be defined in .env.local when running in Codespaces.
// If it is unset, the application falls back to localhost API routing.
export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || '';
export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api';

export function normalizeApiResponse<T = any>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (!payload || typeof payload !== 'object') {
    return [payload as T];
  }

  const data = payload as Record<string, any>;

  if (Array.isArray(data.data)) {
    return data.data as T[];
  }
  if (Array.isArray(data.results)) {
    return data.results as T[];
  }
  if (Array.isArray(data.items)) {
    return data.items as T[];
  }
  if (Array.isArray(data.results?.items)) {
    return data.results.items as T[];
  }

  return [payload as T];
}
