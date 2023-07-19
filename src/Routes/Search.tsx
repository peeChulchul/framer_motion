import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { IMovie } from '../api';
import { styled } from 'styled-components';
import SearchCard from '../components/atoms/SearchCard';
import { useRecoilState } from 'recoil';
import { searchDataState, searchPageState } from '../modules/atom';
import Pageination from '../components/molecules/Pagenation';

const Container = styled.div`
    padding: 6rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: 65px 35px 15px 35px;
    }
`;
const KeywordInfo = styled.div`
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    color: #d9e8ed;
    padding: 10px 0px;
    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        font-size: 20px;
        line-height: 20px;
    }
`;

const Gridbox = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
    }
`;

export interface ISearchData {
    data: {
        page: number;
        results: IMovie[];
        total_pages: number;
        total_results: number;
    };
    isError?: boolean;
    isLoading?: boolean;
}

export default function Search() {
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useRecoilState(searchPageState);
    const [searchData, setSearchData] = useRecoilState(searchDataState);

    const { keyword } = useParams();
    const { data, isError, isLoading }: ISearchData = useAxios({
        url: '/search/multi',
        params: { query: keyword, page: currentPage },
        queryKey: [keyword as string, `page${+currentPage}`],
    });

    useEffect(() => {
        if (isLoading) return;
        setTotalPage(data.total_pages);
        setCurrentPage(data.page);
        setSearchData(data.results);
    }, [data, currentPage]);

    return (
        <Container>
            <KeywordInfo>"{keyword}"으로 검색한 결과입니다.</KeywordInfo>
            {isLoading ? (
                <>로딩중</>
            ) : data.results.length === 0 ? (
                <KeywordInfo>검색결과가 없습니다.</KeywordInfo>
            ) : (
                <>
                    <Gridbox>
                        {data.results.map((data, index) => {
                            return <SearchCard data={data} key={data.id}></SearchCard>;
                        })}
                    </Gridbox>
                    {data.results.length !== 0 && (
                        <Pageination page={currentPage} totalPage={totalPage} setPage={setCurrentPage} />
                    )}
                </>
            )}

            <Outlet />
        </Container>
    );
}
