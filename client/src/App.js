import logo from './logo.svg'
import './App.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Announcement from './Screens/Announcement'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import {
  AnnouncementUpdate,
  BadgeEdit,
  Badges,
  Certificates,
  UserEdit,
  Users,
  Video,
  VideoEdit,
} from './Screens'
import { CContainer, CRow, CCol } from '@coreui/react'

function App() {
  return (
    <>
      <CContainer fluid className="p-0 m-0">
        <CRow>
          <Sidebar />
          <CCol md={8} lg={9} xs={12} className="wrapper-container p-0">
            <CRow className="main-container">
              <Routes>
                <Route path="/admin/announcement" element={<Announcement />} />
                <Route
                  path="/admin/announcement/edit/:id"
                  element={<AnnouncementUpdate />}
                />
                <Route path="/admin/badges" element={<Badges />} />
                <Route path="/admin/badge/edit/:id" element={<BadgeEdit />} />

                <Route path="/admin/videos" element={<Video />} />
                <Route path="/admin/video/edit/:id" element={<VideoEdit />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/user/edit/:id" element={<UserEdit />} />
                <Route path="/admin/certificates" element={<Certificates />} />
              </Routes>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default App
