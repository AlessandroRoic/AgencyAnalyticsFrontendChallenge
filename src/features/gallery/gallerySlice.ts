import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";
import { RootState } from "../../app/store";
import { checkImageById, mapFavouriteImage } from "../../utils/utils";
import GalleryAPI from "./GalleryAPI";
import { GalleryImage } from "./models/GalleryImage.interface";

export enum GalleryImagesStatus {
  LOADING,
  IDLE,
  FAILED,
  FULLFILLED,
}

export interface GalleryState {
  imagesStatus: GalleryImagesStatus;
  images: GalleryImage[];
  selectedImage: GalleryImage | null;
  selectedImageId: string;
  selectedTab: GalleryTabEnum;
}

export enum GalleryTabEnum {
  RECENT,
  FAVOURITE,
}

const initialState: GalleryState = {
  imagesStatus: GalleryImagesStatus.IDLE,
  images: [],
  selectedImage: null,
  selectedImageId: "",
  selectedTab: GalleryTabEnum.RECENT,
};

// REDUCERS

const reducers = {
  setSelectedImage: (
    state: GalleryState,
    action: PayloadAction<GalleryImage>
  ) => {
    state.selectedImage = action.payload;
    state.selectedImageId = action.payload.id;
  },
  setSelectedTab: (
    state: GalleryState,
    action: PayloadAction<GalleryTabEnum>
  ) => {
    state.selectedTab = action.payload;
  },
  deleteImage: (state: GalleryState, action: PayloadAction<string>) => {
    const { payload: id } = action;
    state.images = state.images.filter((image) => checkImageById(image, id));
    if (state.selectedTab === GalleryTabEnum.FAVOURITE) {
      const favImages = state.images.filter((image) => image.favorited);
      state.selectedImage = favImages[0];
      state.selectedImageId = favImages[0].id;
      return;
    }
    state.selectedImage = state.images[0];
    state.selectedImageId = state.selectedImage.id;
  },
  favouriteImage: (state: GalleryState, action: PayloadAction<string>) => {
    const { payload: id } = action;
    state.images = state.images.map((image) => mapFavouriteImage(image, id));
    if (
      state.selectedTab === GalleryTabEnum.FAVOURITE &&
      state.selectedImage?.favorited
    ) {
      const favImages = state.images.filter((image) => image.favorited);
      state.selectedImage = favImages[0];
      state.selectedImageId = favImages[0].id;
      return;
    }
    state.selectedImage = {
      ...state.selectedImage,
      favorited: !state.selectedImage?.favorited,
    } as GalleryImage;
  },
};

export const fetchImages = createAsyncThunk(
  "gallery/fetchImages",
  async (arg, { signal }) => {
    return await GalleryAPI.getImages(signal);
  }
);

const extraReducers = (
  builder: ActionReducerMapBuilder<NoInfer<GalleryState>>
) => {
  builder
    .addCase(fetchImages.pending, (state) => {
      state.imagesStatus = GalleryImagesStatus.LOADING;
    })
    .addCase(fetchImages.fulfilled, (state, action) => {
      state.imagesStatus = GalleryImagesStatus.FULLFILLED;
      const { payload } = action;
      const sortedImages = [...payload].sort(
        (a: GalleryImage, b: GalleryImage) =>
          b.createdAt.localeCompare(a.createdAt)
      );
      state.images = sortedImages;
      state.selectedImage = sortedImages[0];
      state.selectedImageId = sortedImages[0].id;
    })
    .addCase(fetchImages.rejected, (state, action) => {
      state.imagesStatus = GalleryImagesStatus.FAILED;
      throw new Error(action.error.message);
    });
};

// SELECTORS

export const getImages = (state: RootState): GalleryImage[] =>
  state.gallery.images;

export const getStatus = (state: RootState): GalleryImagesStatus =>
  state.gallery.imagesStatus;

export const getSelectedImage = (state: RootState): GalleryImage | null =>
  state.gallery.selectedImage;

export const getSelectedImageId = (state: RootState): string =>
  state.gallery.selectedImageId;

export const getSelectedTab = (state: RootState): GalleryTabEnum =>
  state.gallery.selectedTab;

export const getFavouriteImages = (state: RootState): GalleryImage[] =>
  state.gallery.images.filter((image) => image.favorited);

// SETUP
export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers,
  extraReducers,
});

export default gallerySlice.reducer;

export const { setSelectedImage, setSelectedTab, deleteImage, favouriteImage } =
  gallerySlice.actions;
