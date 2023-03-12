import { useMemo, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/storeHooks";
import GalleryItem from "../GalleryItem";
import {
  getImages,
  getStatus,
  GalleryImagesStatus,
  fetchImages,
  setSelectedImage,
  getSelectedImageId,
} from "../gallerySlice";
import { GridArticle } from "./GalleryGrid.styles";

const GalleryGrid = () => {
  const images = useAppSelector(getImages);
  const dispatch = useAppDispatch();
  const imagesServiceStatus = useAppSelector(getStatus);
  const selectedImageId = useAppSelector(getSelectedImageId);

  const isLoading = useMemo(
    () =>
      imagesServiceStatus === GalleryImagesStatus.LOADING || images.length < 0,
    [images, imagesServiceStatus]
  );

  const isImageSelected = useCallback(
    (imageToCheckId: string) => {
      return imageToCheckId === selectedImageId;
    },
    [selectedImageId]
  );

  useEffect(() => {
    const promise = dispatch(fetchImages());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return isLoading ? (
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
