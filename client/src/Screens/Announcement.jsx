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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

function Announcement() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = React.useState([]);

  //functions
  const createProductHandle = async () => {
    const { data } = await axios.post("/announcement", {
      heading: "Default",
      content: "Default",
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

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <CContainer>
      <CRow className="align-items-center">
        <CCol xs="12">
          <Header text="Announcement" />
        </CCol>
        <CCol style={{ textAlign: "right" }}>
          <CButton
            className="my-3"
            color="primary"
            onClick={createProductHandle}
          >
            <FontAwesomeIcon icon={faPlus} className="px-1" />
            Create Product
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
            style={{ backgroundColor: "rgba(85, 150, 230, 1)", color: "white" }}
          >
            <CTableHeaderCell>Id</CTableHeaderCell>
            <CTableHeaderCell>Heading</CTableHeaderCell>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Year</CTableHeaderCell>
            <CTableHeaderCell>Content</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {announcements.map((announcement) => (
            <CTableRow key={announcement._id}>
              <CTableDataCell>{announcement._id}</CTableDataCell>
              <CTableDataCell>{announcement.heading}</CTableDataCell>
              <CTableDataCell>{announcement.type}</CTableDataCell>
              <CTableDataCell>{announcement.year}</CTableDataCell>
              <CTableDataCell>{announcement.content}</CTableDataCell>
              <CTableDataCell>
                {/* <Link to={`/announcement/${product._id}`}> */}
                <CContainer className="announcement-btn-container">
                  <CButton
                    className="my-3"
                    color="danger"
                    onClick={() => deleteHandle(announcement._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </CButton>
                  {/* </Link> */}
                  <CButton
                    color="success"
                    className="my-3"
                    onClick={() => {
                      navigate(`/admin/announcement/edit/${announcement._id}`);
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
  );
}

export default Announcement;
