import React, { useEffect } from 'react'
import { CRow, CCol, CButton, CTable, CContainer } from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const products = [
  {
    _id: 1,
    name: 'Product 1',
    price: '$1.99',
    category: 'electronics',
    brand: 'apple',
  },
  {
    _id: 2,
    name: 'Product 2',
    price: '$1.99',
    category: 'electronics',
    brand: 'apple',
  },
]
function Announcement() {
  const [announcements, setAnnouncements] = React.useState([])
  const createProductHandle = async () => {
    console.log('create product')

    const res = await axios.post('/announcement', {
      heading: 'Frontend Ann',
      content: 'This is frontend Ann',
    })
    console.log(res)
  }
  const deleteHandle = () => {
    console.log('deleteHandle')
  }
  const fetchAnnouncements = async () => {
    const { data } = await axios.get('/announcement')
    console.log(data)
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
                <CButton className="my-3" onClick={deleteHandle}>
                  <i className="fas fa-trash"> Delete</i>
                </CButton>
                {/* </Link> */}
                <CButton className="my-3" onClick={deleteHandle}>
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
