import Heart from "../../../assets/Heart";
import useByteParser from "../../../hooks/useByteParser";
import {
  ImageButton,
  ItemDd,
  ItemDl,
  ItemDt,
  ItemFigCaption,
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
  selected?: boolean;
  onImageClick?: () => void;
  onFavouriteClick?: () => void;
}

const GalleryItem = ({
  src,
  filename,
  sizeInBytes,
  onImageClick,
  selected,
  favorited,
  height = 107,
  width = 160,
  onFavouriteClick,
}: GalleryItemProps) => {
  const { parsedBytes } = useByteParser(sizeInBytes);

  return (
    <ItemFigure maxWidth={width}>
      <ImageButton onClick={onImageClick}>
        <ItemImg
          src={src}
          alt={filename || "No description provided"}
          height={height}
          width={width}
          selected={selected}
          isGrid={!onFavouriteClick}
        />
      </ImageButton>
      <ItemFigCaption flex={!!onFavouriteClick}>
        <ItemDl>
          <ItemDt>{filename}</ItemDt>
          <ItemDd>{parsedBytes}</ItemDd>
        </ItemDl>
        {onFavouriteClick && (
          <Heart
            fill={favorited ? "#d8e0e8" : "none"}
            stroke="#d8e0e8"
            onClick={onFavouriteClick}
          />
        )}
      </ItemFigCaption>
    </ItemFigure>
  );
};

export default GalleryItem;
