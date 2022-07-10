import logo from './logo.svg'
import './App.css'
import { CContainer } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Announcement from './Screens/Announcement'
import { Routes, Route } from 'react-router-dom'
import { AnnouncementUpdate } from './Screens'

function App() {
  return (
    <>
      <CContainer fluid>
        <Routes>
          <Route path="/admin/announcement" element={<Announcement />} />
          <Route
            path="/admin/announcement/edit/:id"
            element={<AnnouncementUpdate />}
          />
        </Routes>
      </CContainer>
    </>
  )
}

export default App
