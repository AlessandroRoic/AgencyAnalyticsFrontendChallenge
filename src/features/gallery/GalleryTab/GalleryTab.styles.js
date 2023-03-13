import styled from "styled-components";

export const TabUl = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
`;

export const TabLi = styled.li``;

export const TabButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  padding-bottom: 15px;
  font-weight: bold;

  &[aria-selected="true"] {
    color: ${({ theme }) => theme.softBlue};
    border-bottom: ${({ theme }) => `2px solid ${theme.softBlue}`};
  }

  &:hover {
    color: ${({ theme }) => theme.softBlue};
  }
`;
