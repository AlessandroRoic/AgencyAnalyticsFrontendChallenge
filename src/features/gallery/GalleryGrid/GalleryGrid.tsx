import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/storeHooks";
import GalleryItem from "../GalleryItem";
import { getSelectedImageId, setSelectedImage } from "../gallerySlice";
import { GalleryImage } from "../models/GalleryImage.interface";
import { GridArticle } from "./GalleryGrid.styles";

interface GalleryGridProps {
  images: GalleryImage[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
  const selectedImageId = useAppSelector(getSelectedImageId);
  const dispatch = useAppDispatch();

  const isImageSelected = useCallback(
    (imageToCheckId: string) => {
      return imageToCheckId === selectedImageId;
    },
    [selectedImageId]
  );

  return images.length < 0 ? (
    <section>Loading</section>
  ) : (
    <GridArticle>
      {images.map(({ id, url, filename, sizeInBytes, description }, index) => (
        <GalleryItem
          key={id}
          src={url}
          filename={filename}
          sizeInBytes={sizeInBytes}
          description={description}
          selected={isImageSelected(id)}
          onImageClick={() => dispatch(setSelectedImage(images[index]))}
        />
      ))}
    </GridArticle>
  );
};

export default GalleryGrid;
