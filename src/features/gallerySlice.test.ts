import galleryReducer, {
  GalleryImagesStatus,
  GalleryState,
  GalleryTabEnum,
  setSelectedImage,
} from "./gallery/gallerySlice";
import { GalleryImage } from "./gallery/models/GalleryImage.interface";

describe("gallery reducer", () => {
  const initialState: GalleryState = {
    imagesStatus: GalleryImagesStatus.IDLE,
    images: [],
    selectedImage: null,
    selectedImageId: "",
    selectedTab: GalleryTabEnum.RECENT,
  };

  const mockImage: GalleryImage = {
    id: "74957345-6f5b-4d66-ae9d-5d0071b40279",
    url: "https://agencyanalytics-api.vercel.app/images/0.jpg",
    filename: "tennessee_female_rubber.jpg",
    description:
      "Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.",
    uploadedBy: "Ms. Jimmie Cole",
    createdAt: "2017-07-15T08:23:20.462Z",
    updatedAt: "2022-12-16T12:41:33.736Z",
    dimensions: {
      height: 4800,
      width: 3200,
    },
    resolution: {
      height: 72,
      width: 72,
    },
    sizeInBytes: 4812732,
    sharedWith: [],
    favorited: true,
  };

  it("should handle initial state", () => {
    expect(galleryReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle the setting of the selected image", () => {
    const actual = galleryReducer(initialState, setSelectedImage(mockImage));
    expect(actual.selectedImageId).toEqual(mockImage.id);
  });
});
