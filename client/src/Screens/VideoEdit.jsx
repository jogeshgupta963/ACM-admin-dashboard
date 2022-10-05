import { useRef } from "react";
import {
  useParams,
  Navigate,
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
} from "@coreui/react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
function VideoEdit() {
  //function
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/video/${id}`, {
        title: title.current.value || undefined,
        description: description.current.value || undefined,
        url: url.current.value || undefined,
        date: undefined,
      });
      if (!data) return console.log("error");
      navigate("/admin/videos");
    } catch (err) {
      console.log(err.message);
    }
  };

  //hooks
  const navigate = useNavigate();
  const [isEdit] = useSearchParams();
  const { id } = useParams();
  const url = useRef("");
  const description = useRef("");
  const title = useRef("");
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {!Cookies.get("ACM_THAPAR") && user.isAdmin && (
        <Navigate to="google.com" />
      )}
      <CContainer>
        <CRow className="justify-content-md-center">
          <CCol xs={12} md={6}>
            <h1 className="mt-2 text-center">
              {isEdit.get("edit") ? "Edit" : "Create"} Video
            </h1>
            <CForm>
              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">
                  Title
                </CInputGroupText>
                <CFormInput
                  ref={title}
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

export default VideoEdit;
