import styled from "styled-components";

export const InfoElementArticle = styled.article`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const InfoElementSpan = styled.span.attrs(({ primary }) => ({
  primary,
}))`
  color: ${({ theme, primary }) => primary && theme.lightGrey};
  font-weight: bold;
`;
