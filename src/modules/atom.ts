import { atom, selector } from 'recoil';
import { IGetMoviesResult, IMovie } from '../api';
import { ISearchData } from '../Routes/Search';

export const combinedDataState = atom<IGetMoviesResult[] | null>({
    key: 'combinedDataState',
    default: null,
});
export const searchDataState = atom<IMovie[] | null>({
    key: 'searchDataState',
    default: null,
});

export const trottleState = atom({
    key: 'trottleState',
    default: false,
});

export const searchOpenState = atom({
    key: 'searchOpenState',
    default: false,
});
export const searchPageState = atom({
    key: 'searchPageState',
    default: 1,
});

export const ismdSizeState = atom({
    key: 'ismdSizeState',
    default: false,
});
export const issmSizeState = atom({
    key: 'issmSizeState',
    default: false,
});
