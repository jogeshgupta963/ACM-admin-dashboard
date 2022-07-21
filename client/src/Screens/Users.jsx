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
  faCross,
  faXmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function Users() {
  //hooks
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  //functions
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/auth/user')
      setUsers(...users, data)
    } catch (err) {
      console.log(err.message)
    }
  }
  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(`/auth/user/${id}`)
      if (!data) return console.log('error')
      window.location.reload()
    } catch (err) {
      console.log(err.message)
    }
  }
  const createUserHandle = async () => {
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
    fetchUsers()
  }, [])
  return (
    <CContainer>
      <CRow className="align-items-center">
        <CCol xs="12">
          <Header text="Users" />
        </CCol>
        <CCol style={{ textAlign: 'right' }}>
          <CButton className="my-3" color="primary" onClick={createUserHandle}>
            <FontAwesomeIcon icon={faPlus} className="px-1" />
            Create User
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
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Department</CTableHeaderCell>
            <CTableHeaderCell>IsAdmin</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {users.map((user) => (
            <CTableRow key={user._id}>
              <CTableDataCell>{user._id}</CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.department}</CTableDataCell>
              <CTableDataCell>
                {user.isAdmin ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faXmark} />
                )}
              </CTableDataCell>
              {/* <CTableDataCell>{badge.}</CTableDataCell> */}
              {/* <CTableDataCell>{badge.content}</CTableDataCell> */}
              <CTableDataCell>
                <CContainer className="announcement-btn-container">
                  <CButton
                    className="my-3"
                    color="danger"
                    onClick={() => deleteHandle(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </CButton>

                  <CButton
                    color="success"
                    className="my-3"
                    onClick={() => {
                      navigate(`/admin/user/edit/${user._id}?edit=true`)
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
  )
}

export default Users
