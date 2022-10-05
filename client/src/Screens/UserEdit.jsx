import { useEffect, useState, useRef } from "react";
import {
  useParams,
  Navigate,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
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
} from "@coreui/react";

function UserEdit() {
  //function

  //hooks
  const navigate = useNavigate();
  const [isEdit] = useSearchParams();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [admin, setAdmin] = useState();
  useEffect(() => {
    fetchUser();
  });
  const { user } = useSelector((state) => state.user);
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/auth/user/${id}`);

      if (!data) throw new Error("user not found");
      setName(data.name);
      setEmail(data.email);
      setDepartment(data.department);
      setAdmin(data.isAdmin);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      console.log(name, email, department, admin);
      // const { data } = await axios.put(`/auth/user/${id}`, {
      //   name: name || undefined,
      //   email: email || undefined,
      //   department: department || undefined,
      //   isAdmin: admin || false,
      // })
      // if (!data) return console.log('error')
      // navigate("/admin/users");
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
              {isEdit.get("edit") ? "Edit" : "Create"} User
            </h1>
            <CForm>
              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">
                  Name
                </CInputGroupText>
                <CFormInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">
                  Email
                </CInputGroupText>
                <CFormInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">
                  Department
                </CInputGroupText>
                <CFormInput
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>

              {/* <CInputGroup className="mb-3"> */}
              <label id="inputGroup-sizing-default">Admin</label>

              <input
                type="checkbox"
                className="ms-4 form-check-input"
                onChange={(e) => {
                  // console.log(e.target.checked);
                  console.log(admin);
                  setAdmin(e.target.checked);
                }}
              />
              {/* </CInputGroup> */}

              <CButton onClick={submitHandle} color="primary" type="submit">
                {isEdit.get("edit") ? "Update" : "Create"}
              </CButton>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}

export default UserEdit;
