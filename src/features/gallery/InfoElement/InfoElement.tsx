import BaseHr from "../../../components/BaseHr";
import { InfoElementArticle, InfoElementSpan } from "./InfoElement.styles";

interface InfoElementProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoElement = ({ label, value, isLast = false }: InfoElementProps) => {
  return (
    <>
      <BaseHr />
      <InfoElementArticle>
        <InfoElementSpan primary>{label}</InfoElementSpan>
        <InfoElementSpan>{value}</InfoElementSpan>
      </InfoElementArticle>
      {isLast && <BaseHr />}
    </>
  );
};

export default InfoElement;
