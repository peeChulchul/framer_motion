import styled, { css } from 'styled-components';

interface IPageination {
    totalPage: number;
    page: number;
    setPage: (page: number) => void;
}

const Pageination = ({ totalPage, page, setPage }: IPageination) => {
    const lastPage = Math.ceil(totalPage);
    let startPage = Math.ceil(page / 10) * 10 - 9;

    const endPage = startPage + 9 > lastPage ? lastPage : startPage + 9;
    const pageList = [];

    const onClick = (n: number) => {
        setPage(n);
    };

    for (let i = startPage; i <= endPage; i++) {
        pageList.push(i);
    }

    return (
        <Container>
            {page > 1 && <Page onClick={() => onClick(page - 1)}>이전</Page>}

            {pageList.map((index) => {
                return (
                    <Page key={index} active={page === index} onClick={() => onClick(index)}>
                        {index}
                    </Page>
                );
            })}
            {page < lastPage && <Page onClick={() => onClick(page + 1)}>다음</Page>}
        </Container>
    );
};

const Container = styled.div`
    z-index: 5;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: 32px;
    height: 25px;
    @media screen and (max-width: 350px) {
        width: 100%;
    }
`;

const Page = styled.button<{ active?: boolean }>`
    cursor: pointer;
    color: var(--logo-color);
    background-color: var(--input-bg-color);
    @media screen and (max-width: 450px) {
        font-size: 8px;
    }
    @media screen and (max-width: 350px) {
        padding: 2px;
    }
    ${({ active }) =>
        active &&
        css`
            background-color: skyblue;
            color: white;
            cursor: not-allowed;
        `}
`;

export default Pageination;
