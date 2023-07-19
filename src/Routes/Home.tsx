import React, { useEffect, useState } from 'react';
import { IGetMoviesResult } from '../api';
import { styled } from 'styled-components';
import { makeImagePath } from '../utils';
import { Outlet, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import Slider from '../components/molecules/Slider';
import { useRecoilState } from 'recoil';
import { combinedDataState } from '../modules/atom';
import { BiPlay } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
const Wrapper = styled.div`
    background: black;
    overflow-x: hidden;
`;

const Loader = styled.div`
    height: 20vh;
    text-align: center;
    display: flex;
    justify-content: ceter;
`;

const Banner = styled.div<{ bgphoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${(props) => props.bgphoto});
    background-size: cover;
    background-position: center center;

    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: 30px;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 10px;
    }
`;
const Title = styled.h2`
    font-size: 40px;
    margin-bottom: 20px;
    font-weight: bolder;
    width: 100%;
    max-width: 650px;
    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        max-width: 380px;
        font-size: 30px;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
        font-size: 25px;
        max-width: 350px;
    }
`;

const Overview = styled.p`
    font-size: 18px;
    line-height: 150%;
    font-weight: 600;
    max-width: 600px;
    width: 100%;

    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        max-width: 400px;
        font-size: 16px;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
        max-width: 350px;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px 0;
`;
const BannerButton = styled.button`
    background-color: white;
    border-color: transparent;
    padding: 18px 30px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 28px;
    display: flex;
    align-items: center;
    p {
        margin-left: 5px;
    }
    &:last-child {
        background-color: rgba(109, 109, 110, 0.7);
        color: white;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        font-size: 16px;
    }
`;

const Sliders = styled.div`
    height: 100%;
    margin: 20px 0px;
`;

export default function Home() {
    const { data: nowPlayingData } = useAxios({ url: '/movie/now_playing', queryKey: ['nowPlaying'] });
    const { data: popularData } = useAxios({ url: '/movie/popular', queryKey: ['popular'] });
    const { data: topRatedData } = useAxios({ url: '/movie/top_rated', queryKey: ['topRated'] });
    const { data: tvTopRatedData } = useAxios({ url: 'tv/top_rated', queryKey: ['tvTopRated'] });
    const [combinedData, setCombinedData] = useRecoilState(combinedDataState);
    const navigate = useNavigate();
    const onBoxClicked = (movieId: number, name: string) => {
        navigate(`/movies/${movieId}`, { state: { name } });
    };

    useEffect(() => {
        if (nowPlayingData && popularData && topRatedData && tvTopRatedData) {
            setCombinedData([
                { name: '상영중', ...nowPlayingData },
                { name: '인기 폭발', ...popularData },
                { name: '평론가 추천', ...topRatedData },
                { name: 'TV쇼', ...tvTopRatedData },
            ]);
        }
    }, [nowPlayingData, popularData, topRatedData, tvTopRatedData]);

    return (
        <Wrapper>
            {!combinedData ? (
                <Loader>loading..</Loader>
            ) : (
                <>
                    <Banner bgphoto={makeImagePath(nowPlayingData?.results[0].backdrop_path || '')}>
                        <Title>{nowPlayingData?.results[0].title}</Title>
                        <Overview>{nowPlayingData?.results[0].overview}</Overview>
                        <Buttons>
                            <BannerButton type="button">
                                <BiPlay size="30" />
                                <p>재생</p>
                            </BannerButton>
                            <BannerButton
                                onClick={() => onBoxClicked(nowPlayingData?.results[0].id, '상영중')}
                                type="button"
                            >
                                <AiOutlineInfoCircle color="white" size="30" />
                                <p>상세정보</p>
                            </BannerButton>
                        </Buttons>
                    </Banner>
                    {/* <Sliders>
                        {combinedData.map((movieList: IGetMoviesResult) => (
                            <Slider list={movieList} key={movieList.name} />
                        ))}
                    </Sliders> */}
                    <Sliders>
                        {combinedData.map((movieList: IGetMoviesResult) => {
                            if (movieList.name === '상영중') {
                                const newMovieLst = { ...movieList, results: movieList.results.slice(1) };
                                return <Slider list={newMovieLst} key={newMovieLst.name} />;
                            }

                            return <Slider list={movieList} key={movieList.name} />;
                        })}
                    </Sliders>
                </>
            )}
            <Outlet />
        </Wrapper>
    );
}
