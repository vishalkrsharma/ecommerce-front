import styled from 'styled-components';

const StyledDiv = styled.div`
  max-width: 1000px;
  padding: 0 1.5rem;
  margin: 0 auto;
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
