import {
  CButton,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  faEdit,
  faMinus,
  faPlus,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'

function BadgeModal({ children, badge, removeUser }) {
  const [visible, setVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState([])

  return (
    <>
      <span onClick={() => setVisible(!visible)}>{children}</span>
      <CModal
        style={{ width: '50%' }}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle style={{ width: '100%' }} className="text-center">
            {badge.badge}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CButton
              className="my-3"
              color="danger"
              onClick={() => removeUser(badge._id, selectedUser)}
            >
              <FontAwesomeIcon icon={faMinus} className="px-1" />
              Remove Users
            </CButton>
            <CTable
              striped
              bordered
              hover
              responsive
              className="table-xl align-middle"
            >
              <CTableHead>
                <CTableRow
                  style={{
                    backgroundColor: 'rgba(85, 150, 230, 1)',
                    color: 'white',
                  }}
                >
                  <CTableHeaderCell></CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody color="light">
                {badge.user.map((user) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>
                      <input
                        type="checkbox"
                        onClick={() => {
                          if (selectedUser.includes(user._id)) {
                            setSelectedUser(
                              selectedUser.filter((id) => id !== user._id),
                            )
                            return
                          }
                          setSelectedUser([
                            ...selectedUser,
                            user._id.toString(),
                          ])
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>
                      <CContainer className="announcement-btn-container">
                        <CButton
                          className="my-3"
                          color="danger"
                          onClick={() => removeUser(user._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                      </CContainer>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default BadgeModal
