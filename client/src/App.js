<<<<<<< HEAD
import { CCol, CContainer, CRow } from "@coreui/react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <CContainer fluid className="p-0 m-0">
      <CRow>
        <CCol md={4} lg={3} className="sidebar-container px-0">
          <Sidebar />
        </CCol>
        <CCol md={8} lg={9} xs={12} className="wrapper-container">
          <CRow className="header-container">
            <Header />
          </CRow>
          <CRow className="main-container px-2">
            <Main />
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  );
=======
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
>>>>>>> 3b7466703d14beff7c40b5fc11044a347029863f
}

export default App
