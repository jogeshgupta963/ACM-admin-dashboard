import React, { useEffect } from "react";
import {
  CRow,
  CCol,
  CButton,
  CTable,
  CContainer,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/user.js";
function Announcement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = React.useState([]);
  const { user } = useSelector((state) => state.user);
  //functions
  const createAnnouncementHandle = async () => {
    const { data } = await axios.post("/announcement", {
      heading: "Default",
      content: "Default",
      Venue: "Default",
      date: "Default",
    });
    if (!data) return console.log("error");
    navigate(`/admin/announcement/edit/${data._id}`);
  };
  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(`/announcement/${id}`);

      if (!data) throw new Error("user not found");

      // setErr({ variant: 'success', msg: 'Product Deleted' })

      window.location.reload();
    } catch (error) {
      // setErr({ variant: 'danger', msg: error.message })
      console.log(error);
    }
  };
  const fetchAnnouncements = async () => {
    const { data } = await axios.get("/announcement");
    setAnnouncements(...announcements, data);
  };
  const getLoggedInUser = async () => {
    try {
      const { data } = await axios.get("/auth/");
      dispatch(getUser(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAnnouncements();
    getLoggedInUser();
  }, []);

  return (
    <>
      {!Cookies.get("ACM_THAPAR") && user.isAdmin && (
        <Navigate to="google.com" />
      )}
      <CContainer>
        <CRow className="align-items-center">
          <CCol xs="12">
            <Header text="Announcement" />
          </CCol>
          <CCol style={{ textAlign: "right" }}>
            <CButton
              className="my-3"
              color="primary"
              onClick={createAnnouncementHandle}
            >
              <FontAwesomeIcon icon={faPlus} className="px-1" />
              Create Announcement
            </CButton>
          </CCol>
        </CRow>
        <CTable
          striped
          bordered
          hover
          responsive
          className="table-sm3 align-middle"
        >
          <CTableHead>
            <CTableRow
              style={{
                backgroundColor: "rgba(85, 150, 230, 1)",
                color: "white",
              }}
            >
              <CTableHeaderCell>Id</CTableHeaderCell>
              <CTableHeaderCell>Heading</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Year</CTableHeaderCell>
              <CTableHeaderCell>Content</CTableHeaderCell>
              <CTableHeaderCell>Venue</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {announcements.length > 0 &&
              announcements.map((announcement) => (
                <CTableRow key={announcement._id}>
                  <CTableDataCell>{announcement._id}</CTableDataCell>
                  <CTableDataCell>{announcement.heading}</CTableDataCell>
                  <CTableDataCell>{announcement.type}</CTableDataCell>
                  <CTableDataCell>{announcement.year}</CTableDataCell>
                  <CTableDataCell>{announcement.content}</CTableDataCell>
                  <CTableDataCell>{announcement.venue}</CTableDataCell>
                  <CTableDataCell>{announcement.date}</CTableDataCell>
                  <CTableDataCell>
                    <CContainer className="announcement-btn-container">
                      <CButton
                        className="my-3"
                        color="danger"
                        onClick={() => deleteHandle(announcement._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </CButton>

                      <CButton
                        color="success"
                        className="my-3"
                        onClick={() => {
                          navigate(
                            `/admin/announcement/edit/${announcement._id}?edit=true`
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </CButton>
                    </CContainer>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  );
}

export default Announcement;
