import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { IGetMoviesResult } from '../../api';
import { makeImagePath } from '../../utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { combinedDataState, searchDataState } from '../../modules/atom';
import { ImCross } from 'react-icons/im';
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
`;

const MovieModal = styled(motion.div)`
    position: fixed;
    top: 65px;
    right: 0;
    left: 0;
    margin: auto;
    bottom: 0;
    max-width: 700px;
    height: 80%;
    background-color: ${(props) => props.theme.colors.black.lighter};
    z-index: 15;
    border-radius: 15px;
    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        max-width: 500px;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
        width: 100%;
        margin: 0;
        height: 100%;
        border-radius: 0px;
    }
`;

const Cover = styled.div<{ bgphoto: string }>`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
    background-image: linear-gradient(to top, black, transparent), url(${(props) => props.bgphoto});
    border-radius: 15px;
    overflow: hidden;
    position: relative;
`;

const Title = styled.h3`
    color: ${(props) => props.theme.colors.white.lighter};
    padding: 20px;
    font-size: 32px;
    position: absolute;
    bottom: 5px;
`;

const Overview = styled.p`
    padding: 20px;
    color: ${(props) => props.theme.colors.white.lighter};
`;

export default function Modal() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const moviesLists = useRecoilValue(combinedDataState);
    const searchLists = useRecoilValue(searchDataState);

    const onOverlayClick = () => {
        navigate('../');
    };
    const {
        state: { name },
    } = useLocation();

    const selectSearchData = searchLists?.find((data) => data.id + '' === itemId);

    const selectMovie = moviesLists
        ?.find((movieList) => movieList.name === name)
        ?.results.find((movie) => movie.id + '' === itemId);

    return (
        <>
            <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onOverlayClick} />

            <MovieModal layoutId={String(itemId) + String(name)}>
                <ImCross
                    size="20"
                    onClick={onOverlayClick}
                    style={{ position: 'absolute', top: '10', right: '10', zIndex: '5', cursor: 'pointer' }}
                />
                {name === 'SEARCH'
                    ? selectSearchData && (
                          <>
                              <Cover bgphoto={makeImagePath(selectSearchData.backdrop_path, 'w500')}>
                                  <Title>{selectSearchData.title || selectSearchData.name}</Title>
                              </Cover>
                              <Overview>{selectSearchData.overview}</Overview>
                          </>
                      )
                    : selectMovie && (
                          <>
                              <Cover bgphoto={makeImagePath(selectMovie.backdrop_path, 'w500')}>
                                  <Title>{selectMovie.title}</Title>
                              </Cover>

                              <Overview>{selectMovie.overview}</Overview>
                          </>
                      )}
            </MovieModal>
        </>
    );
}
