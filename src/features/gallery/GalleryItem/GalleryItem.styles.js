import styled from "styled-components";

export const ItemImg = styled.img.attrs(({ selected }) => ({ selected }))`
  outline: ${({ selected, theme }) => selected && `2px solid ${theme.softBlue}`};
  outline-offset: ${({ selected }) => selected && "2px"};
  border-radius: 10px;
  object-fit: cover;
`;

export const ItemFigure = styled.figure.attrs(({ maxWidth }) => ({ maxWidth }))`
  margin: 0;
  max-width: ${({ maxWidth }) => maxWidth}px;
`;

export const ItemDl = styled.dl`
  margin: 5px 0 0 0;
`;

export const ItemDt = styled.dt`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemDd = styled.dd`
  margin: 0;
`;
