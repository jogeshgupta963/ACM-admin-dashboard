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
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BadgeModal } from "../components";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
function Badges() {
  //hooks
  const navigate = useNavigate();
  const [badges, setBadges] = useState([]);
  const { user } = useSelector((state) => state.user);
  //functions
  const fetchBadges = async () => {
    try {
      const { data } = await axios.get("/badge");
      setBadges(...badges, data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(`/badge/${id}`);
      if (!data) return console.log("error");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };
  const removeUser = async (badge_id, selectedUser) => {
    try {
      console.log(selectedUser);
      const { data } = await axios.post(`/badge/remove/${badge_id}`, {
        user: selectedUser,
      });
      if (!data) return console.log("error");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };
  const createBadgeHandle = async () => {
    try {
      const { data } = await axios.post("/badge", {
        name: "Default",
        description: "Default",
        url: "default",
      });
      if (!data) throw new Error("badge not found");
      navigate(`/admin/badge/edit/${data._id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);
  return (
    <>
      {!Cookies.get("ACM_THAPAR") && user.isAdmin && (
        <Navigate to="google.com" />
      )}
      <CContainer>
        <CRow className="align-items-center">
          <CCol xs="12">
            <Header text="Badges" />
          </CCol>
          <CCol style={{ textAlign: "right" }}>
            <CButton
              className="my-3"
              color="primary"
              onClick={createBadgeHandle}
            >
              <FontAwesomeIcon icon={faPlus} className="px-1" />
              Create Badge
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
              <CTableHeaderCell>Badge</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>

              <CTableHeaderCell>Url</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {badges.map((badge) => (
              <CTableRow key={badge._id}>
                <CTableDataCell>{badge._id}</CTableDataCell>
                <CTableDataCell>{badge.badge}</CTableDataCell>
                <CTableDataCell>{badge.description}</CTableDataCell>
                <CTableDataCell>{badge.url}</CTableDataCell>
                <CTableDataCell>
                  <CContainer className="announcement-btn-container">
                    <CRow>
                      <BadgeModal badge={badge} removeUser={removeUser}>
                        <CButton
                          className="my-3"
                          color="danger"
                          // onClick={() => deleteHandle(badge._id)}
                        >
                          <FontAwesomeIcon icon={faUser} />
                        </CButton>
                      </BadgeModal>
                      {/* <BadgeModal /> */}
                    </CRow>
                    <CRow>
                      <CCol>
                        <CButton
                          className="my-3"
                          color="danger"
                          onClick={() => deleteHandle(badge._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                      </CCol>
                      <CCol>
                        <CButton
                          color="success"
                          className="my-3"
                          onClick={() => {
                            navigate(
                              `/admin/badge/edit/${badge._id}?edit=true`
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </CButton>
                      </CCol>
                    </CRow>
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

export default Badges;
