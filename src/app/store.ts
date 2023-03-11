import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import galleryReducer from "../features/gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
