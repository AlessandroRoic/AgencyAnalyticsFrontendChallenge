import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "styled-components";
import theme from "../../../theme";
import GalleryItem from "./GalleryItem";
interface SetupProps {
  selected?: boolean;
  favorited?: boolean;
  onImageClick?: () => void;
  onFavouriteClick?: () => void;
}

const setup = ({
  selected = false,
  favorited = false,
  onImageClick,
  onFavouriteClick,
}: SetupProps) =>
  render(
    <ThemeProvider theme={theme}>
      <GalleryItem
        src={"https://agencyanalytics-api.vercel.app/images/15.jpg"}
        filename={"test"}
        sizeInBytes={4076439}
        selected={selected}
        favorited={favorited}
        onImageClick={onImageClick}
        onFavouriteClick={onFavouriteClick}
      />
    </ThemeProvider>
  );

describe("GalleryItem", () => {
  afterEach(cleanup);

  it("loads correctly", () => {
    const { getByAltText, getByText } = setup({});

    const image = getByAltText("test");
    const description = getByText("test");
    const parsedBytes = getByText("3.9 MB");

    expect(image).toBeVisible();
    expect(description).toBeVisible();
    expect(parsedBytes).toBeVisible();
  });

  it("is selected", () => {
    const { getByAltText } = setup({ selected: true });

    const image = getByAltText("test");

    expect(image).toHaveStyle("outline: 2px solid #5f57e6");
  });

  it("triggers function on image click", () => {
    const onImageClick = jest.fn();
    const { getByAltText } = setup({ onImageClick });

    const image = getByAltText("test");

    act(() => {
      fireEvent.click(image);
    });

    expect(onImageClick).toHaveBeenCalledTimes(1);
  });

  it("is favorited", () => {
    const onFavouriteClick = jest.fn();
    const { getByTitle } = setup({ favorited: true, onFavouriteClick });

    const heartSvg = getByTitle("Heart").parentElement;

    expect(heartSvg?.getAttribute("fill")).toEqual("#d8e0e8");
  });

  it("triggers function on favorited click", () => {
    const onFavouriteClick = jest.fn();
    const { getByTitle } = setup({ onFavouriteClick });

    const heartSvg = getByTitle("Heart");

    act(() => {
      fireEvent.click(heartSvg);
    });

    expect(onFavouriteClick).toHaveBeenCalledTimes(1);
  });
});
