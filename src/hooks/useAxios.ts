import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

interface useAxiosProps {
    url: string;
    queryKey: string[];
    params?: {
        query?: string;
        page?: number;
    };
}

interface useAxiosReturn {
    data: any;
    isLoading: boolean;
    isError: boolean;
}

export const axiosInstance = axios.create({
    baseURL: 'https://silo9506.herokuapp.com/https://api.themoviedb.org/3/',
    params: {
        method: 'get',
        api_key: process.env.REACT_APP_TMDB_KEY,
        region: 'KR',
        language: 'ko',
    },
});

export default function useAxios({ url, params, queryKey }: useAxiosProps): useAxiosReturn {
    const fetch = async () => {
        const config: AxiosRequestConfig = {
            params: {
                ...params,
            },
            url,
        };

        const response = await axiosInstance(config);
        return response.data;
    };
    const { isLoading, isError, data } = useQuery(queryKey, fetch, {
        refetchOnWindowFocus: false,
        staleTime: 60 * 3000,
        cacheTime: 60 * 5000,
    });

    return { data, isLoading, isError };
}
