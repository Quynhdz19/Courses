import React, { useState } from 'react'
import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CContainer,
  CFormCheck,
  CListGroup,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash } from '@coreui/icons'
import { useLocation } from 'react-router-dom'
import BaseInputLesson from 'src/views/pages/management/courses/components/BaseInputLesson'

const LessonsManager = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedLessons, setSelectedLessons] = useState([])
  const location = useLocation()
  const module = location.state?.module || []
  const lessons = module.lessons || []


  const toggleModal = () => {
    console.log('Trước khi chuyển:', isModalVisible);
    setIsModalVisible(!isModalVisible);
    console.log('Sau khi chuyển:', !isModalVisible);
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLessons(lessons.map(lesson => lesson.id))
    } else {
      setSelectedLessons([])
    }
  }

  const handleSelectLesson = (lessonId) => {
    if (selectedLessons.includes(lessonId)) {
      setSelectedLessons(selectedLessons.filter(id => id !== lessonId))
    } else {
      setSelectedLessons([...selectedLessons, lessonId])
    }
  }

  const isDeleteButtonEnabled = selectedLessons.length > 0
  const isHeaderCheckboxChecked = selectedLessons.length === lessons.length

  return (
    <div>
      <h1>{module.name}</h1>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Search Lessons"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <CInputGroupText style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={toggleModal} color="primary" size="sm">
          Thêm bài học <strong>+</strong>
        </CButton>
        <CButton
          color="danger"
          size="sm"
          disabled={!isDeleteButtonEnabled}
        >
          Xóa
        </CButton>
      </CContainer>

      <CListGroup>
        <CTable hover responsive>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell className="col-1">
                <CFormCheck
                  checked={isHeaderCheckboxChecked}
                  onChange={handleSelectAll}
                />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-5">Name</CTableHeaderCell>
              <CTableHeaderCell className="text-center col-3">
                Action
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {lessons.map((lesson) => (
              <CTableRow key={lesson.id}>
                <CTableDataCell>
                  <CFormCheck
                    checked={selectedLessons.includes(lesson.id)}
                    onChange={() => handleSelectLesson(lesson.id)}
                  />
                </CTableDataCell>

                <CTableDataCell>{lesson.name}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton size="sm" className="me-2">
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm">
                    <CIcon icon={cilTrash} style={{ color: 'red' }} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CListGroup>

      <CModal visible={isModalVisible} onClose={toggleModal} className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Thêm bài học</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputLesson />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default LessonsManager