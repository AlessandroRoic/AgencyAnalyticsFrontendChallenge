import { GalleryMain } from "./Gallery.styles";
import ImageGallery from "./ImageGallery";
import ImageInfo from "./ImageInfo";

const Gallery = () => {
  return (
    <GalleryMain>
      <ImageGallery />
      <ImageInfo />
    </GalleryMain>
  );
};

export default Gallery;
