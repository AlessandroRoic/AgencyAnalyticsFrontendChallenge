import { useAppDispatch } from "../../../app/storeHooks";
import useByteParser from "../../../hooks/useByteParser";
import { setSelectedImage } from "../gallerySlice";
import {
  ItemDd,
  ItemDl,
  ItemDt,
  ItemFigure,
  ItemImg,
} from "./GalleryItem.styles";

interface GalleryItemProps {
  src: string;
  filename: string;
  sizeInBytes: number;
  favorited?: boolean;
  height?: number;
  width?: number;
  description: string;
  selected: boolean;
  onImageClick: () => void;
}

const GalleryItem = ({
  src,
  filename,
  sizeInBytes,
  description,
  onImageClick,
  selected,
  height = 107,
  width = 160,
}: GalleryItemProps) => {
  const { parsedBytes } = useByteParser(sizeInBytes);

  return (
    <ItemFigure maxWidth={width}>
      <ItemImg
        src={src}
        alt={description}
        height={height}
        width={width}
        onClick={onImageClick}
        selected={selected}
      />
      <figcaption>
        <ItemDl>
          <ItemDt>{filename}</ItemDt>
          <ItemDd>{parsedBytes}</ItemDd>
        </ItemDl>
      </figcaption>
    </ItemFigure>
  );
};

export default GalleryItem;
