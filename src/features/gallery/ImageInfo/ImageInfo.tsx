import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/storeHooks";
import BaseButton from "../../../components/BaseButton";
import { formatDate } from "../../../utils/utils";
import GalleryItem from "../GalleryItem";
import { deleteImage, favouriteImage, getSelectedImage } from "../gallerySlice";
import InfoElement from "../InfoElement";
import { GalleryImage } from "../models/GalleryImage.interface";
import {
  ImageInfoWrapper,
  InfoDescription,
  InfoTitle,
} from "./ImageInfo.styles";

const ImageInfo = () => {
  const selectedImage = useAppSelector(getSelectedImage);
  const dispatch = useAppDispatch();

  const {
    id,
    url,
    filename,
    sizeInBytes,
    description,
    uploadedBy,
    dimensions,
    resolution,
    favorited,
    createdAt,
    updatedAt,
  } = useMemo(() => {
    const tempSelectedImage = { ...selectedImage };
    tempSelectedImage.createdAt = tempSelectedImage.createdAt
      ? formatDate(tempSelectedImage.createdAt)
      : "";
    tempSelectedImage.updatedAt = tempSelectedImage.updatedAt
      ? formatDate(tempSelectedImage.updatedAt)
      : "";
    return tempSelectedImage as GalleryImage;
  }, [selectedImage]);

  return (
    <ImageInfoWrapper>
      {selectedImage && (
        <>
          <GalleryItem
            width={320}
            height={214}
            src={url}
            filename={filename}
            sizeInBytes={sizeInBytes}
            favorited={favorited}
            onFavouriteClick={() => dispatch(favouriteImage(id))}
          />
          <section>
            <InfoTitle>Information</InfoTitle>
            <InfoElement label="Uploaded by" value={uploadedBy} />
            <InfoElement label="Created" value={createdAt} />
            <InfoElement label="Last Modified" value={updatedAt} />
            <InfoElement
              label="Dimensions"
              value={`${dimensions.width} x ${dimensions.height}`}
            />
            <InfoElement
              label="Resolution"
              value={`${resolution.width} x ${resolution.height}`}
              isLast
            />
            <InfoTitle>Description</InfoTitle>
            <InfoDescription>
              {description || "No description provided"}
            </InfoDescription>
            <BaseButton
              onClick={() => dispatch(deleteImage(id))}
              hoverColor="#eb4034">
              Delete
            </BaseButton>
          </section>
        </>
      )}
    </ImageInfoWrapper>
  );
};

export default ImageInfo;
