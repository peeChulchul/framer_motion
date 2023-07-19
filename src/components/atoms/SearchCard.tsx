import React from 'react';
import { IMovie } from '../../api';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { makeImagePath } from '../../utils';
import { useNavigate } from 'react-router-dom';

interface ISearchCard {
    data: IMovie;
}

const Container = styled(motion.div)<{ bgphoto: string }>`
    background-color: white;
    font-size: 66px;
    height: 100%;
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

const cardVariants = {
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
export default function SearchCard({ data }: ISearchCard) {
    const navigate = useNavigate();

    const onCardClicked = (data: string) => {
        navigate(data, { state: { name: 'SEARCH' } });
    };
    return (
        <Container
            layoutId={String(data.id) + 'SEARCH'}
            onClick={() => onCardClicked(data.id + '')}
            variants={cardVariants}
            whileHover="hover"
            initial="normal"
            bgphoto={makeImagePath(data.backdrop_path || '', 'w500')}
            key={data.id}
            transition={{ type: 'tween' }}
        >
            <Info variants={infoVariants}>
                <h4>{data.title || data.name}</h4>
            </Info>
        </Container>
    );
}
