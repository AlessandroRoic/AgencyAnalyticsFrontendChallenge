export interface Dimensions {
  height: number;
  width: number;
}

export interface Resolution {
  height: number;
  width: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  filename: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions: Dimensions;
  resolution: Resolution;
  sizeInBytes: number;
  sharedWith: any[];
  favorited: boolean;
}
