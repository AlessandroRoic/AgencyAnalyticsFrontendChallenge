import { GalleryImage } from "./models/GalleryImage.interface";

const GALLERY_URL = "https://agencyanalytics-api.vercel.app/images.json";

const GalleryAPI = {
  getImages: async (signal: AbortSignal): Promise<GalleryImage[]> => {
    try {
      return await fetch(GALLERY_URL, { signal }).then((data) => data.json());
    } catch (e: any) {
      throw new Error(e);
    }
  },
};

export default GalleryAPI;
