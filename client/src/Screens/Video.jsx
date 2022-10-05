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
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function Video() {
  //hooks
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const { user } = useSelector((state) => state.user);
  //functions
  const fetchVideos = async () => {
    try {
      const { data } = await axios.get("/video");
      setVideos(...videos, data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(`/video/${id}`);

      if (!data) return console.log("error");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };
  const createVideoHandle = async () => {
    try {
      const { data } = await axios.post("/video", {
        url: "default",
        description: "Default",
        title: "Default",
      });
      if (!data) throw new Error("badge not found");
      navigate(`/admin/video/edit/${data._id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <>
      {!Cookies.get("ACM_THAPAR") && user.isAdmin && (
        <Navigate to="google.com" />
      )}
      <CContainer>
        <CRow className="align-items-center">
          <CCol xs="12">
            <Header text="Videos" />
          </CCol>
          <CCol style={{ textAlign: "right" }}>
            <CButton
              className="my-3"
              color="primary"
              onClick={createVideoHandle}
            >
              <FontAwesomeIcon icon={faPlus} className="px-1" />
              Create Video
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
              <CTableHeaderCell>URL</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {videos.map((video) => (
              <CTableRow key={video._id}>
                <CTableDataCell>{video._id}</CTableDataCell>
                <CTableDataCell>{video.title}</CTableDataCell>
                <CTableDataCell>{video.description}</CTableDataCell>
                <CTableDataCell>{video.url}</CTableDataCell>
                <CTableDataCell>{video.date}</CTableDataCell>

                <CTableDataCell>
                  <CContainer className="announcement-btn-container">
                    <CButton
                      className="my-3"
                      color="danger"
                      onClick={() => deleteHandle(video._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </CButton>

                    <CButton
                      color="success"
                      className="my-3"
                      onClick={() => {
                        navigate(`/admin/video/edit/${video._id}?edit=true`);
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

export default Video;
