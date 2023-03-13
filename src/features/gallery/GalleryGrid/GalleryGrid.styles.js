import styled from "styled-components";

export const GridArticle = styled.article`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, max(160px, (100%/4 - 30px))), 1fr)
  );
  grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
  justify-items: center;
  gap: 30px;
`;
