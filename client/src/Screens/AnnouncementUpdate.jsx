import { useEffect, useState, useRef } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
function AnnouncementUpdate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const heading = useRef('')
  const type = useRef('')
  const year = useRef('')
  const content = useRef('')
  //functions
  const submitHandle = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/announcement/${id}`, {
        heading: heading.current.value,
        type: type.current.value,
        year: year.current.value,
        content: content.current.value,
      })
      if (!data) return console.log('error')
      navigate('/admin/announcement')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-md-center">
          <CCol xs={12} md={6}>
            <h1 className="mt-2 text-center">Edit Product</h1>
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
                  Content
                </CInputGroupText>
                <CFormInput
                  ref={content}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>

              <CButton onClick={submitHandle} color="primary" type="submit">
                Update
              </CButton>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AnnouncementUpdate
