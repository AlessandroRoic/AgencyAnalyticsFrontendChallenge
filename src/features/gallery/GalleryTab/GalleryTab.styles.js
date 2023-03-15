import styled from "styled-components";

export const TabUl = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.lightGreyishBlue};
`;

export const TabButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  padding-bottom: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.lightGrey};

  &[aria-selected="true"] {
    color: ${({ theme }) => theme.softBlue};
    border-bottom: ${({ theme }) => `2px solid ${theme.softBlue}`};
  }

  &:hover {
    color: ${({ theme }) => theme.softBlue};
  }
`;
