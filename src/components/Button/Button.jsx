import { LoadMoreButton, LoadMoreWrapper } from './Button.styled';

const Button = ({ type, text, onLoadMore }) => {
    return (
        <LoadMoreWrapper>
            <LoadMoreButton onClick={onLoadMore} type={type}>{text}</LoadMoreButton>
        </LoadMoreWrapper>
    );
};

export default Button;
