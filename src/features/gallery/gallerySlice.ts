import {ActionReducerMapBuilder, createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import {GalleryImage} from "./models/GalleryImage.interface";
import GalleryAPI from "./GalleryAPI";
import {NoInfer} from "react-redux";
import {RootState} from "../../app/store";

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
  selectedTab: GalleryTab;
}

export enum GalleryTab {
  RECENT,
  FAVOURITE,
}

const initialState: GalleryState = {
  imagesStatus: GalleryImagesStatus.IDLE,
  images: [],
  selectedImage: null,
  selectedTab: GalleryTab.RECENT,
};

// REDUCERS

const reducers = {};

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
      state.images = action.payload;
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

// SETUP
export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers,
  extraReducers,
});

export default gallerySlice.reducer;
