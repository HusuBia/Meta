'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  sub: string;
  role?: string;
}

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(savedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
        } else {
          setToken(savedToken);
        }
      } catch (e) {
        console.error('Invalid token:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
      }
    }
  }, []);

  return token;
}
