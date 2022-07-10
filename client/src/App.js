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
}

export default App;
