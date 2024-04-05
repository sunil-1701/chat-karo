import "./sidebar.styles.scss";
import SidebarTopSection from "../sidebar-top-section/sidebar-top-section.component";
import SidebarBottomSection from "../sidebar-bottom-section/sidebar-bottom-section.component";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarTopSection />
      <SidebarBottomSection />
    </div>
  );
};

export default Sidebar;
