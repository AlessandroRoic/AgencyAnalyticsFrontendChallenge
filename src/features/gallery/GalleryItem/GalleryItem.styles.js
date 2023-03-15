import styled from "styled-components";

export const ItemImg = styled.img.attrs(({ selected, isGrid }) => ({
  selected,
  isGrid,
}))`
  outline: ${({ selected, theme }) =>
    selected && `2px solid ${theme.softBlue}`};
  outline-offset: ${({ selected }) => selected && "2px"};
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 5px;

  &:hover {
    outline: ${({ isGrid, theme }) => isGrid && `2px solid ${theme.softBlue}`};
    outline-offset: ${({ isGrid }) => "2px"};
  }

  @media (max-width: 410px) {
    width: 320px;
    height: 214px;
  }
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
  color: ${({ theme }) => theme.lightGrey};
`;

export const ItemFigCaption = styled.figcaption.attrs(({ flex }) => ({ flex }))`
  display: ${({ flex }) => (flex ? "flex" : "")};
  justify-content: ${({ flex }) => (flex ? "space-between" : "")};
`;
