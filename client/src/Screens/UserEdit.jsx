import { useEffect, useState, useRef } from 'react'
import {
  useParams,
  Navigate,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'

function UserEdit() {
  //function
  const submitHandle = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/auth/user/${id}`, {
        name: name.current.value || undefined,
        email: email.current.value || undefined,
        department: department.current.value || undefined,
        isAdmin: isAdmin.current.value || false,
      })
      if (!data) return console.log('error')
      navigate('/admin/users')
    } catch (err) {
      console.log(err.message)
    }
  }

  //hooks
  const navigate = useNavigate()
  const [isEdit] = useSearchParams()
  const { id } = useParams()
  const name = useRef('')
  const email = useRef('')
  const department = useRef('')
  const isAdmin = useRef()

  return (
    <CContainer>
      <CRow className="justify-content-md-center">
        <CCol xs={12} md={6}>
          <h1 className="mt-2 text-center">
            {isEdit.get('edit') ? 'Edit' : 'Create'} User
          </h1>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText id="inputGroup-sizing-default">
                Name
              </CInputGroupText>
              <CFormInput
                ref={name}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText id="inputGroup-sizing-default">
                Email
              </CInputGroupText>
              <CFormInput
                ref={email}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText id="inputGroup-sizing-default">
                Department
              </CInputGroupText>
              <CFormInput
                ref={department}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText id="inputGroup-sizing-default">
                Admin
              </CInputGroupText>
              <CFormInput
                ref={isAdmin}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </CInputGroup>

            <CButton onClick={submitHandle} color="primary" type="submit">
              {isEdit.get('edit') ? 'Update' : 'Create'}
            </CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default UserEdit
