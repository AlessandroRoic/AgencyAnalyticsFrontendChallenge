import { GalleryTabEnum } from "../gallerySlice";
import { TabButton, TabUl } from "./GalleryTab.styles";

interface GalleryTabProps {
  selectedTab: GalleryTabEnum;
  onTabClick: (tab: GalleryTabEnum) => void;
}

const GalleryTab = ({ selectedTab, onTabClick }: GalleryTabProps) => {
  return (
    <nav>
      <TabUl role="tablist">
        <li>
          <TabButton
            role="tab"
            onClick={() => onTabClick(GalleryTabEnum.RECENT)}
            aria-selected={selectedTab === GalleryTabEnum.RECENT}>
            Recently Added
          </TabButton>
        </li>
        <li>
          <TabButton
            role="tab"
            onClick={() => onTabClick(GalleryTabEnum.FAVOURITE)}
            aria-selected={selectedTab === GalleryTabEnum.FAVOURITE}>
            Favourite
          </TabButton>
        </li>
      </TabUl>
    </nav>
  );
};

export default GalleryTab;
