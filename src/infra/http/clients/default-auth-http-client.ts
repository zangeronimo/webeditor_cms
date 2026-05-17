import { AuthHttpClient } from '@application/contracts/auth-http-client';
import { AuthHttpRequestConfig } from '@application/contracts/auth-http-request-config';
import { HttpClient } from '@application/contracts/http-client';
import { Storage } from '@application/contracts/storage';

export class DefaultAuthHttpClient implements AuthHttpClient {
  private readonly _httpClient: HttpClient;
  private readonly _storage: Storage;
  constructor(httpClient: HttpClient, authStorage: any) {
    this._httpClient = httpClient;
    this._storage = authStorage;
  }

  get<T>(url: string, config?: AuthHttpRequestConfig): Promise<T> {
    return this.request<T>('GET', url, null, config);
  }

  post<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('POST', url, body, config);
  }

  put<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('PUT', url, body, config);
  }

  patch<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('PATCH', url, body, config);
  }

  delete<T>(url: string, config?: AuthHttpRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, null, config);
  }

  private request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    const token = this._storage.get<string>('accessToken');
    return this._httpClient.request(url, {
      ...config,
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...config?.headers,
        ...(body && {
          'Content-Type': 'application/json',
        }),
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
