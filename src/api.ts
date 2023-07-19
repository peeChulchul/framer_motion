const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    name?: string;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    name?: string;
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    const params = {
        region: 'KR',
        language: 'ko',
    };
    const queryParams = new URLSearchParams(params).toString();
    const url = `${BASE_PATH}/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&${queryParams}`;
    return fetch(url, {
        method: 'GET',
    }).then((response) => response.json());
}
