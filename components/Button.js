import styled, { css } from 'styled-components';

export const ButtonStyle = css`
  border: 0;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;

  svg {
    font-size: 2rem;
  }

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
    ${(props) =>
    props.primary &&
    css`
      background-color: #5543f6;
      color: #fff;
      border: 1px solid #5543f6;
    `}
    ${(props) =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
    `};
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function PrimaryBtn({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
