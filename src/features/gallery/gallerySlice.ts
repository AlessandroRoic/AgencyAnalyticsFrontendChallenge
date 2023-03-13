import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";
import { RootState } from "../../app/store";
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
  favouriteImages: GalleryImage[];
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
  favouriteImages: [],
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
      state.images = payload.sort((a: GalleryImage, b: GalleryImage) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      state.favouriteImages = payload.filter((image) => image.favorited);
    })
    .addCase(fetchImages.rejected, (state, action) => {
      state.imagesStatus = GalleryImagesStatus.FAILED;
      console.log(action.error.message);
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
  state.gallery.favouriteImages;

// SETUP
export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers,
  extraReducers,
});

export default gallerySlice.reducer;

export const { setSelectedImage, setSelectedTab } = gallerySlice.actions;
