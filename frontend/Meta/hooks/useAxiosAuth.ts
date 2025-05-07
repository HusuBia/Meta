'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useAuthToken } from './useAuthToken';

export function useAxiosAuth() {
    const token = useAuthToken();

    useEffect(() => {
        if (!token) return;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, [token]);

    return axios;
}
