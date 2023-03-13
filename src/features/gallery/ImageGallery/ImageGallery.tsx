import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/storeHooks";
import GalleryGrid from "../GalleryGrid";
import {
  fetchImages,
  GalleryTabEnum,
  getFavouriteImages,
  getImages,
  getSelectedTab,
  setSelectedTab,
} from "../gallerySlice";
import GalleryTab from "../GalleryTab";
import { GallerySection } from "./ImageGallery.styles";

const ImageGallery = () => {
  const images = useAppSelector(getImages);
  const favouriteImages = useAppSelector(getFavouriteImages);
  const selectedTab = useAppSelector(getSelectedTab);
  const dispatch = useAppDispatch();
  const onTabClick = (tab: GalleryTabEnum) => dispatch(setSelectedTab(tab));

  const selectedImages = useMemo(
    () => (selectedTab === GalleryTabEnum.RECENT ? images : favouriteImages),
    [images, favouriteImages, selectedTab]
  );

  useEffect(() => {
    const promise = dispatch(fetchImages());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <GallerySection>
      <h1>Photos</h1>
      <GalleryTab selectedTab={selectedTab} onTabClick={onTabClick} />
      <GalleryGrid images={selectedImages} />
    </GallerySection>
  );
};

export default ImageGallery;
