import React, { useEffect } from 'react'
import { CRow, CCol, CButton, CTable, CContainer } from '@coreui/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Announcement() {
  const navigate = useNavigate()
  const [announcements, setAnnouncements] = React.useState([])

  //functions
  const createProductHandle = async () => {
    const { data } = await axios.post('/announcement', {
      heading: 'Default',
      content: 'Default',
    })
    if (!data) return console.log('error')
    navigate(`/admin/announcement/edit/${data._id}`)
  }
  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(`/announcement/${id}`)

      if (!data) throw new Error('user not found')

      // setErr({ variant: 'success', msg: 'Product Deleted' })

      window.location.reload()
    } catch (error) {
      // setErr({ variant: 'danger', msg: error.message })
      console.log(error)
    }
  }
  const fetchAnnouncements = async () => {
    const { data } = await axios.get('/announcement')

    setAnnouncements(...announcements, data)
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  return (
    <CContainer>
      <CRow className="align-items-center">
        <CCol xs="12">
          <h3 className="text-center">Announcement</h3>
        </CCol>
        <CCol style={{ textAlign: 'right' }}>
          <CButton className="my-3" onClick={createProductHandle}>
            <i className="fas fa-plus"> Create Product</i>
          </CButton>
        </CCol>
      </CRow>
      <CTable striped bordered hover responsive className="table-sm3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Heading</th>
            <th>Type</th>
            <th>Year</th>
            <th>Content</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement._id}>
              <td>{announcement._id}</td>
              <td>{announcement.heading}</td>
              <td>{announcement.type}</td>
              <td>{announcement.year}</td>
              <td>{announcement.content}</td>
              <td>
                {/* <Link to={`/announcement/${product._id}`}> */}
                <CButton
                  className="my-3"
                  onClick={() => deleteHandle(announcement._id)}
                >
                  <i className="fas fa-trash"> Delete</i>
                </CButton>
                {/* </Link> */}
                <CButton
                  className="my-3"
                  onClick={() => {
                    navigate(`/admin/announcement/edit/${announcement._id}`)
                  }}
                >
                  <i className="fas fa-edit"> Edit</i>
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </CTable>
    </CContainer>
  )
}

export default Announcement
