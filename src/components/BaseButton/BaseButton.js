import styled from "styled-components";

const BaseButton = styled.button.attrs(({ hoverColor }) => ({ hoverColor }))`
  width: 100%;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.lightGreyishBlue};
  font-weight: bold;
  color: ${({ theme }) => theme.lightGray};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

export default BaseButton;
