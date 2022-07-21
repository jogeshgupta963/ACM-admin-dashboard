import React, { useEffect } from 'react'
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
} from '@coreui/react'
import { cilMic, cilBadge, cilVideo, cilUser, cilCash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faEdit,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { BadgeModal } from '../components'

function Certificates() {
  //hooks
  const navigate = useNavigate()
  const [certificates, setCertificates] = useState([])

  //functions
  const fetchBadges = async () => {
    try {
      const { data } = await axios.get('/certificate')
      setCertificates(...certificates, data)
    } catch (err) {
      console.log(err.message)
    }
  }
  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(`/badge/${id}`)
      if (!data) return console.log('error')
      window.location.reload()
    } catch (err) {
      console.log(err.message)
    }
  }
  const createBadgeHandle = async () => {
    try {
      const { data } = await axios.post('/badge', {
        name: 'Default',
        description: 'Default',
        url: 'default',
      })
      if (!data) throw new Error('badge not found')
      navigate(`/admin/badge/edit/${data._id}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchBadges()
  }, [])
  return (
    <CContainer>
      <CRow className="align-items-center">
        <CCol xs="12">
          <Header text="Certificates" />
        </CCol>
        <CCol style={{ textAlign: 'right' }}>
          <CButton className="my-3" color="primary" onClick={createBadgeHandle}>
            <FontAwesomeIcon icon={faPlus} className="px-1" />
            Create Certificate
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
            style={{ backgroundColor: 'rgba(85, 150, 230, 1)', color: 'white' }}
          >
            <CTableHeaderCell>Id</CTableHeaderCell>
            <CTableHeaderCell>Title</CTableHeaderCell>
            <CTableHeaderCell>Url</CTableHeaderCell>

            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {certificates.map((certificate) => (
            <CTableRow key={certificate._id}>
              <CTableDataCell>{certificate._id}</CTableDataCell>
              <CTableDataCell>{certificate.title}</CTableDataCell>
              <CTableDataCell>{certificate.url}</CTableDataCell>
              <CTableDataCell>
                <CContainer className="announcement-btn-container">
                  {/* <CRow>
                    <BadgeModal badge={certificate}>
                      <CButton className="my-3" color="danger">
                        <FontAwesomeIcon icon={faUser} />
                      </CButton>
                    </BadgeModal>
                  </CRow> */}
                  <CRow>
                    <CCol>
                      <CButton
                        className="my-3"
                        color="danger"
                        onClick={() => deleteHandle(certificate._id)}
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
                            `/admin/badge/edit/${certificates._id}?edit=true`,
                          )
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
  )
}

export default Certificates
