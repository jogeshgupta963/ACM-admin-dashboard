import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CImage,
  CNavTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import "./Sidebar.css";
import sidebarLogo from "../images/acm.png";
import { cilMic, cilBadge, cilVideo, cilUser, cilCash } from "@coreui/icons";

const Sidebar = () => {
  return (
    <CSidebar position="sticky" className="my-0">
      <CSidebarBrand>
        <CImage
          thumbnail
          src={sidebarLogo}
          width={100}
          height={100}
          align="center"
        />
        <h3>Dashboard</h3>
      </CSidebarBrand>
      <CSidebarNav>
        <CNavTitle>Features</CNavTitle>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilMic} />
          Announcement
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilBadge} />
          Badges
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilVideo} />
          Videos
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilUser} />
          Update User Input
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilCash} />
          Certificates
        </CNavItem>
        {/* <CNavGroup toggler="Other Options">
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilArrowRight} /> More
            Options
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilArrowRight} /> Nav
            dropdown item
          </CNavItem>
        </CNavGroup> */}
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
