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
function AnnouncementUpdate() {
  //hooks
  const [isEdit] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const heading = useRef("");
  const type = useRef("");
  const venue = useRef("");
  const date = useRef("");
  const year = useRef("");
  const content = useRef("");
  const { user } = useSelector((state) => state.user);

  //functions
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/announcement/${id}`, {
        heading: heading.current.value || undefined,
        type: type.current.value || undefined,
        year: year.current.value || undefined,
        content: content.current.value || undefined,
        venue: venue.current.value || undefined,
        date: date.current.value || undefined,
      });
      if (!data) return console.log("error");
      navigate("/admin/announcement");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!Cookies.get("ACM_THAPAR") && user.isAdmin && (
        <Navigate to="google.com" />
      )}
      <div>
        <CContainer>
          <CRow className="justify-content-md-center">
            <CCol xs={12} md={6}>
              <h1 className="mt-2 text-center">
                {isEdit.get("edit") ? "Edit" : "Create"} Announcement
              </h1>
              <CForm>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-default">
                    Heading
                  </CInputGroupText>
                  <CFormInput
                    ref={heading}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-default">
                    Type
                  </CInputGroupText>
                  <CFormInput
                    ref={type}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-default">
                    Year
                  </CInputGroupText>
                  <CFormInput
                    ref={year}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-default">
                    Venue
                  </CInputGroupText>
                  <CFormInput
                    ref={venue}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-default">
                    Date
                  </CInputGroupText>
                  <CFormInput
                    ref={date}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-default">
                    Content
                  </CInputGroupText>
                  <CFormInput
                    ref={content}
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
      </div>
    </>
  );
}

export default AnnouncementUpdate;
