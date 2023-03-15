import { GalleryImage } from "../features/gallery/models/GalleryImage.interface";

export const checkImageById = (image: GalleryImage, id: string) =>
  image.id !== id;

export const mapFavouriteImage = (image: GalleryImage, id: string) =>
  image.id === id ? { ...image, favorited: !image.favorited } : image;

export const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
