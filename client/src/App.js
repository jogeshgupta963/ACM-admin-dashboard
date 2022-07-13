import logo from "./logo.svg";
import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Announcement from "./Screens/Announcement";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { AnnouncementUpdate } from "./Screens";
import { CContainer, CRow, CCol } from "@coreui/react";

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
              </Routes>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}

export default App;
