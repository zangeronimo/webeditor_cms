import { DefaultAuthHttpClient } from '../clients/default-auth-http-client';

describe('DefaultAuthHttpClient', () => {
  const makeSut = () => {
    const request = jest.fn();

    const httpClient = {
      request,
    };

    const storage = {
      get: jest.fn().mockReturnValue('token-123'),
    };

    const sut = new DefaultAuthHttpClient(httpClient as any, storage);

    return {
      sut,
      request,
      storage,
    };
  };

  describe('GET', () => {
    it('should add authorization header', async () => {
      const { sut, request } = makeSut();

      await sut.get('/users');

      expect(request).toHaveBeenCalledWith('/users', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer token-123',
        },
      });
    });

    it('should preserve existing headers', async () => {
      const { sut, request } = makeSut();

      await sut.get('/users', {
        headers: {
          'X-Tenant': 'tenant-1',
        },
      });

      expect(request).toHaveBeenCalledWith('/users', {
        method: 'GET',
        headers: {
          'X-Tenant': 'tenant-1',
          Authorization: 'Bearer token-123',
        },
      });
    });
  });

  describe('POST', () => {
    it('should send POST method', async () => {
      const { sut, request } = makeSut();

      await sut.post('/users');

      expect(request).toHaveBeenCalledWith('/users', {
        method: 'POST',
        body: undefined,
        headers: {
          Authorization: 'Bearer token-123',
        },
      });
    });

    it('should serialize body', async () => {
      const { sut, request } = makeSut();

      await sut.post('/users', {
        name: 'Luciano',
      });

      expect(request).toHaveBeenCalledWith('/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Luciano',
        }),
        headers: {
          Authorization: 'Bearer token-123',
          'Content-Type': 'application/json',
        },
      });
    });

    it('should preserve existing headers', async () => {
      const { sut, request } = makeSut();

      await sut.post(
        '/users',
        {
          name: 'Luciano',
        },
        {
          headers: {
            'X-Tenant': 'tenant-1',
          },
        },
      );

      expect(request).toHaveBeenCalledWith('/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Luciano',
        }),
        headers: {
          'X-Tenant': 'tenant-1',
          Authorization: 'Bearer token-123',
          'Content-Type': 'application/json',
        },
      });
    });
  });

  describe('PUT', () => {
    it('should send PUT method', async () => {
      const { sut, request } = makeSut();

      await sut.put('/users/1', {
        name: 'Luciano',
      });

      expect(request).toHaveBeenCalledWith('/users/1', {
        method: 'PUT',
        body: JSON.stringify({
          name: 'Luciano',
        }),
        headers: {
          Authorization: 'Bearer token-123',
          'Content-Type': 'application/json',
        },
      });
    });
  });

  describe('PATCH', () => {
    it('should send PATCH method', async () => {
      const { sut, request } = makeSut();

      await sut.patch('/users/1', {
        active: true,
      });

      expect(request).toHaveBeenCalledWith('/users/1', {
        method: 'PATCH',
        body: JSON.stringify({
          active: true,
        }),
        headers: {
          Authorization: 'Bearer token-123',
          'Content-Type': 'application/json',
        },
      });
    });
  });

  describe('DELETE', () => {
    it('should send DELETE method', async () => {
      const { sut, request } = makeSut();

      await sut.delete('/users/1');

      expect(request).toHaveBeenCalledWith('/users/1', {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer token-123',
        },
      });
    });

    it('should preserve existing headers', async () => {
      const { sut, request } = makeSut();

      await sut.delete('/users/1', {
        headers: {
          'X-Tenant': 'tenant-1',
        },
      });

      expect(request).toHaveBeenCalledWith('/users/1', {
        method: 'DELETE',
        headers: {
          'X-Tenant': 'tenant-1',
          Authorization: 'Bearer token-123',
        },
      });
    });
  });

  it('should get access token from auth storage', async () => {
    const { sut, storage } = makeSut();

    await sut.get('/users');

    expect(storage.get).toHaveBeenCalled();
  });
});
