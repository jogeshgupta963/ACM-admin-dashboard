import {
  CCol,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CImage,
  CNavTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import sidebarLogo from "../images/acm.png";
import { cilMic, cilBadge, cilVideo, cilUser, cilCash } from "@coreui/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <CCol md={4} lg={3} className="sidebar-container px-0">
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
            <Link to="/admin/announcement">Announcement</Link>
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
        </CSidebarNav>
      </CSidebar>
    </CCol>
  );
};

export default Sidebar;
