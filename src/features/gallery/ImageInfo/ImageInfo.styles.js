import styled from "styled-components";

export const ImageInfoWrapper = styled.aside`
  padding: 30px;
  border-left: 1px solid ${({ theme }) => theme.lightGreyishBlue};
`;

export const InfoTitle = styled.h2`
  font-size: 18px;
`;

export const InfoDescription = styled.p`
  color: ${({ theme }) => theme.lightGrey};
`;
