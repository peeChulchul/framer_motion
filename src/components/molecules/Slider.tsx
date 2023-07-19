import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { IGetMoviesResult, IMovie } from '../../api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ismdSizeState, issmSizeState, trottleState } from '../../modules/atom';
import { makeImagePath } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const Container = styled.div`
    position: relative;
    height: 200px;
    h3 {
        font-size: 20px;
        height: 20px;
        padding: 0px 10px;
        font-weight: 700;
    }
    &:hover {
        button {
            opacity: 1;
        }
    }
`;

const Next = styled(motion.button)`
    position: absolute;
    width: 50px;
    height: 50px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    border: transparent;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    svg {
        fill: white;
        width: 20px;
        height: 20px;
    }
    &:hover {
        background-color: white;
        svg {
            fill: black;
        }
    }
`;
const Prev = styled(motion.button)`
    position: absolute;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    border: transparent;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    z-index: 1;
    svg {
        fill: white;
        width: 20px;
        height: 20px;
    }
    &:hover {
        background-color: white;
        svg {
            fill: black;
        }
    }
`;

const Row = styled(motion.div)`
    display: grid;
    top: 20px;
    bottom: 0;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    position: absolute;
    padding: 10px 10px;
    width: 100%;
    @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
    background-color: white;
    font-size: 66px;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.colors.black.lighter};
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    h4 {
        text-align: center;
        font-size: 18px;
        padding: 0px;
    }
`;
const rowVariants = {
    hidden: (back: boolean) => ({
        x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
    }),
    visible: {
        x: 0,
    },
    exit: (back: boolean) => ({
        x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
    }),
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        transition: { delay: 0.5, duration: 0.3, type: 'tween' },
        y: -50,
    },
};

const infoVariants = {
    hover: {
        opacity: 1,
        transition: { delay: 0.5, duration: 0.3, type: 'tween' },
    },
};

const arrowVariants = {
    hover: {
        opacity: 1,
    },
};

interface ISliders {
    list: IGetMoviesResult;
}

export default function Slider({ list }: ISliders) {
    const ismdSize = useRecoilValue(ismdSizeState);
    const issmSize = useRecoilValue(issmSizeState);
    const [trottle, setTrottle] = useRecoilState(trottleState);
    const [offset, setOffset] = useState(6);
    const [index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (issmSize) {
            return setOffset(3);
        }
        if (ismdSize) {
            return setOffset(4);
        }
        setOffset(6);
    }, [ismdSize, issmSize]);

    const nextSlider = () => {
        if (trottle) return;
        setTrottle(true);
        setBack(false);
        const totalMovies = list.results.length - 1;
        const maxIndex = Math.floor(totalMovies / offset) - 1;
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    };

    const prevSlider = () => {
        if (trottle) return;
        setTrottle(true);
        setBack(true);
        const totalMovies = list.results.length - 1;
        const maxIndex = Math.floor(totalMovies / offset) - 1;
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    };

    const onBoxClicked = (movieId: number, name: string) => {
        navigate(`/movies/${movieId}`, { state: { name } });
    };

    const toggleTrottle = () => setTrottle((prev) => !prev);

    return (
        <Container key={list.name}>
            <h3>{list.name}</h3>
            <Next variants={arrowVariants} onClick={nextSlider}>
                <SlArrowRight />
            </Next>
            <Prev variants={arrowVariants} onClick={prevSlider}>
                <SlArrowLeft />
            </Prev>
            <AnimatePresence initial={false} custom={back} onExitComplete={toggleTrottle}>
                <Row
                    custom={back}
                    animate="visible"
                    transition={{ type: 'tween', duration: 1 }}
                    variants={rowVariants}
                    initial="hidden"
                    exit="exit"
                    key={index}
                >
                    {list.results.slice(offset * index, offset * index + offset).map((movie: IMovie) => (
                        <Box
                            layoutId={(String(movie.id) + list.name) as string}
                            onClick={() => onBoxClicked(movie.id, list.name as string)}
                            variants={boxVariants}
                            whileHover="hover"
                            initial="normal"
                            bgphoto={makeImagePath(movie.backdrop_path || '', 'w500')}
                            key={movie.id}
                            transition={{ type: 'tween' }}
                        >
                            <Info variants={infoVariants}>
                                <h4>{movie.title || movie.name}</h4>
                            </Info>
                        </Box>
                    ))}
                </Row>
            </AnimatePresence>
        </Container>
    );
}
