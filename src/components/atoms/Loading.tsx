const { styled, keyframes } = require('styled-components');

const Loading = () => {
    return (
        <Container>
            <div></div>
        </Container>
    );
};

export default Loading;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }

`;
const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);

    div {
        width: 120px;
        height: 120px;
        border: 16px solid white;
        border-radius: 50%;
        border-top: 16px solid #d42727;
        animation: ${spin} 2s linear infinite;
    }
`;
