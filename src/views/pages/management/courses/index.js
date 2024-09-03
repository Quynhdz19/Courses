import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CContainer,
  CCardImage,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CListGroup,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormCheck,
  CLink,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash, cilExternalLink } from '@coreui/icons'
import "./indexx.css"
import BaseInputCourse from 'src/views/pages/management/courses/components/BaseInputCourse'
import avatar1 from 'src/assets/images/avatars/1.jpg'

const CoursesManager = () => {
  const navigate = useNavigate()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState([])

  const courseExamples = [
    {
      id: 1,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      module: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ],
    },
    {
      id: 2,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      module: [
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
      ],
    },
    {
      id: 3,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      module: [
        { id: '8' },
        { id: '9' },
      ],
    },
  ]

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleCourseClick = (courseId) => {
    navigate(`/management/courses/course/${courseId}`)
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCourses(courseExamples.map(course => course.id))
    } else {
      setSelectedCourses([])
    }
  }

  const handleSelectCourse = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }

  const isDeleteButtonEnabled = selectedCourses.length > 0

  const isHeaderCheckboxChecked = selectedCourses.length === courseExamples.length

  return (
    <div>
      <CLink className="d-flex mb-4">Quản lý khóa học</CLink>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Tìm kiếm khóa học"
        />
        <CInputGroupText style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={toggleModal} color="primary" size="sm">
          Thêm khóa học <strong>+</strong>
        </CButton>
        <CButton color="primary" size="sm" disabled={!isDeleteButtonEnabled}>
          Xóa
        </CButton>
      </CContainer>

      <CModal visible={isModalVisible} onClose={toggleModal} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Thêm Khóa Học</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse />
        </CModalBody>
      </CModal>

      <CListGroup>
        <CTable hover responsive>
          <CTableHead color="primary">
            <CTableRow className='textprimaryy'>
              <CTableHeaderCell>
                <CFormCheck
                  checked={isHeaderCheckboxChecked}
                  onChange={handleSelectAll}
                />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-1" />
              <CTableHeaderCell className="col-5">Name</CTableHeaderCell>
              <CTableHeaderCell className="col-2">Price</CTableHeaderCell>
              <CTableHeaderCell className="col-1">Module</CTableHeaderCell>
              <CTableHeaderCell className="text-center col-3">
                Action
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {courseExamples.map((item) => (
              <CTableRow key={item.id} className='textprimaryy'>
                <CTableDataCell>
                  <CFormCheck
                    checked={selectedCourses.includes(item.id)}
                    onChange={() => handleSelectCourse(item.id)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CCardImage src={item.image.src} className="rounded" />
                </CTableDataCell>
                <CTableDataCell>{item.title}</CTableDataCell>
                <CTableDataCell>{item.price} $</CTableDataCell>
                <CTableDataCell>{item.module.length}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton size="sm" className="me-2" onClick={() => handleEditCourse(item.id)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" className="me-2" onClick={() => handleCourseClick(item.id)}>
                    <CIcon icon={cilExternalLink} />
                  </CButton>
                  <CButton size="sm" onClick={() => handleDeleteCourse(item.id)}>
                    <CIcon icon={cilTrash} style={{ color: 'red' }} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CListGroup>
    </div>
  )
}

export default CoursesManager

