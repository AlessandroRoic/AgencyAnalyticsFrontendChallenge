import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchImages, getImages } from "./gallerySlice";
import { useEffect } from "react";

const Gallery = () => {
  const images = useAppSelector(getImages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchImages());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return <h1>Photos</h1>;
};

export default Gallery;
