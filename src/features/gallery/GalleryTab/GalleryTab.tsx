import { GalleryTabEnum } from "../gallerySlice";
import { TabButton, TabLi, TabUl } from "./GalleryTab.styles";

interface GalleryTabProps {
  selectedTab: GalleryTabEnum;
  onTabClick: (tab: GalleryTabEnum) => void;
}

const GalleryTab = ({ selectedTab, onTabClick }: GalleryTabProps) => {
  return (
    <nav>
      <TabUl role="tablist">
        <TabLi>
          <TabButton
            role="tab"
            onClick={() => onTabClick(GalleryTabEnum.RECENT)}
            aria-selected={selectedTab === GalleryTabEnum.RECENT}>
            Recently Added
          </TabButton>
        </TabLi>
        <TabLi>
          <TabButton
            role="tab"
            onClick={() => onTabClick(GalleryTabEnum.FAVOURITE)}
            aria-selected={selectedTab === GalleryTabEnum.FAVOURITE}>
            Favourite
          </TabButton>
        </TabLi>
      </TabUl>
    </nav>
  );
};

export default GalleryTab;
