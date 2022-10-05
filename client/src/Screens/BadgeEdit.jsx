import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  useParams,
  Navigate,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CFormCheck,
} from "@coreui/react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function BadgeEdit() {
  //hooks
  const navigate = useNavigate();
  const [isEdit] = useSearchParams();
  const { id } = useParams();
  const badge = useRef("");
  const description = useRef("");
  const url = useRef("");
  const search = useRef("");
  const [toggleList, setToggleList] = useState(false);
  const [selectedUsers, setSelectedUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [badgeUsers, setBadgeUsers] = useState([]);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchBadgeUsers();
  }, [id]);

  //function

  const fetchAllUsers = async () => {
    try {
      let { data } = await axios.get(
        `/auth/user?search=${search.current.value}`
      );
      if (!data) throw new Error("users not found");
      data = data.filter((user) => !badgeUsers.includes(user._id.toString()));
      setAllUsers(() => data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBadgeUsers = async () => {
    try {
      const { data } = await axios.get(`/badge/${id}`);
      if (!data) throw new Error("badge not found");
      setBadgeUsers(() => data.user.map((user) => user._id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/badge/${id}`, {
        badge: badge.current.value || undefined,
        description: description.current.value || undefined,
        url: url.current.value || undefined,
        user: selectedUsers || undefined,
      });

      if (!data) {
        console.log("error");
        return;
      }
      navigate("/admin/badges");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {!Cookies.get("ACM_THAPAR") && user.isAdmin && (
        <Navigate to="google.com" />
      )}
      <CContainer>
        <CRow className="justify-content-md-center">
          <CCol xs={12} md={6}>
            <h1 className="mt-2 text-center">
              {isEdit.get("edit") ? "Edit" : "Create"} Badges
            </h1>
            <CForm>
              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">
                  Badge
                </CInputGroupText>
                <CFormInput
                  ref={badge}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">
                  Description
                </CInputGroupText>
                <CFormInput
                  ref={description}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">
                  Url
                </CInputGroupText>
                <CFormInput
                  ref={url}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>

              <CInputGroup className="mb-1">
                <CInputGroupText id="inputGroup-sizing-default">
                  Users
                </CInputGroupText>
                <CFormInput
                  ref={search}
                  onChange={fetchAllUsers}
                  onClick={() => {
                    if (toggleList) fetchAllUsers();
                    setToggleList(!toggleList);
                  }}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>
              <CListGroup>
                {toggleList &&
                  allUsers.map((user) => (
                    <CListGroupItem
                      key={user._id}
                      onClick={() => {
                        if (selectedUsers.includes(user._id.toString())) {
                          setSelectedUser(
                            selectedUsers.filter(
                              (id) => id !== user._id.toString()
                            )
                          );
                          return;
                        }
                        setSelectedUser([
                          ...selectedUsers,
                          user._id.toString(),
                        ]);
                      }}
                      active={selectedUsers.includes(user._id.toString())}
                    >
                      {user.name}
                    </CListGroupItem>
                  ))}
              </CListGroup>

              <CButton onClick={submitHandle} color="primary" type="submit">
                {/* Update */}
                {isEdit.get("edit") ? "Update" : "Create"}
              </CButton>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}

export default BadgeEdit;
