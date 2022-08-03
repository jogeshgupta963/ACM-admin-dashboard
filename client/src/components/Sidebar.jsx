import {
  CCol,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CImage,
  CNavTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import sidebarLogo from '../images/acm.png'
import { cilMic, cilBadge, cilVideo, cilUser, cilCash } from '@coreui/icons'
import { Link } from 'react-router-dom'

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
          <CNavItem href="/admin/announcement">
            <CIcon customClassName="nav-icon" icon={cilMic} />
            {/* <Link to="/admin/announcement" disabled> */}
            Announcement
            {/* </Link> */}
          </CNavItem>
          <CNavItem href="/admin/badges">
            <CIcon customClassName="nav-icon" icon={cilBadge} />
            {/* <Link to="/admin/badges">Badges</Link> */}
            Badges
          </CNavItem>
          <CNavItem href="/admin/videos">
            <CIcon customClassName="nav-icon" icon={cilVideo} />
            Videos
          </CNavItem>
          <CNavItem href="/admin/users">
            <CIcon customClassName="nav-icon" icon={cilUser} />
            Users
          </CNavItem>
          <CNavItem href="/admin/certificates">
            <CIcon customClassName="nav-icon" icon={cilCash} />
            Certificates
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
    </CCol>
  )
}

export default Sidebar
