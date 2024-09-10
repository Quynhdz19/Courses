import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormCheck,
  CCardImage,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash, cilExternalLink } from '@coreui/icons'
import CourseService from 'src/services/CourseService'
import BaseInputCourse from 'src/views/pages/management/courses/components/BaseInputCourse'
import DeleteModal from 'src/views/pages/management/courses/components/DeleteModal'
import avatar1 from 'src/assets/images/course.png'
import './index.scss'

const CoursesManager = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    size: 10,
    orderBy: 'createdAt',
    orderDirection: 'asc',
    search: searchTerm,
  })

  useEffect(() => {
    fetchCourses()
  }, [searchQuery])

  const fetchCourses = async () => {
    try {
      const response = await CourseService.getCourses(searchQuery)
      setCourses(response)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleSearch = () => {
    setSearchQuery((prevQuery) => ({ ...prevQuery, search: searchTerm }))
  }

  const openModal = (type, course = null) => {
    setModalState({ add: type === 'add', edit: type === 'edit', delete: type === 'delete' })
    setCourseToEdit(course)
    setCourseToDelete(course)
  }

  const closeModal = () => {
    setModalState({ add: false, edit: false, delete: false })
    setCourseToEdit(null)
    setCourseToDelete(null)
  }

  const handleSelectAll = (e) => {
    setSelectedCourses(e.target.checked ? courses.map((course) => course._id) : [])
  }

  const handleSelectCourse = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId],
    )
  }

  const handleCourseAction = async (action, courseData = null) => {
    try {
      if (action === 'add') {
        await CourseService.addCourse(courseData)
      }
      fetchCourses()
    } catch (error) {
      console.error(`Error ${action} course:`, error)
    }
    closeModal()
  }

  const isDeleteButtonEnabled = selectedCourses.length > 0
  const isHeaderCheckboxChecked = courses.length > 0 && selectedCourses.length === courses.length

  return (
    <div>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText style={{ cursor: 'pointer' }} onClick={handleSearch}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={() => openModal('add')} color="primary" size="sm">
          Add course
        </CButton>
        <CButton
          color="primary"
          size="sm"
          disabled={!isDeleteButtonEnabled}
          onClick={() => openModal('delete')}
        >
          Delete
        </CButton>
      </CContainer>

      <CListGroup>
        <CTable hover responsive>
          <CTableHead color="primary">
            <CTableRow className="textprimaryy">
              <CTableHeaderCell>
                <CFormCheck checked={isHeaderCheckboxChecked} onChange={handleSelectAll} />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-1" />
              <CTableHeaderCell className="col-4">Name</CTableHeaderCell>
              <CTableHeaderCell className="col-4">Description</CTableHeaderCell>
              <CTableHeaderCell className="col-1">Modules</CTableHeaderCell>
              <CTableHeaderCell className="text-center col-3">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {courses.map((course) => (
              <CTableRow key={course._id}>
                <CTableDataCell>
                  <CFormCheck
                    checked={selectedCourses.includes(course._id)}
                    onChange={() => handleSelectCourse(course._id)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CCardImage
                    src={
                      'https://online-course-jimmy.onrender.com/' + course.backgroundImg || avatar1
                    }
                    className="rounded"
                  />
                </CTableDataCell>
                <CTableDataCell className="text-course">{course.title}</CTableDataCell>
                <CTableDataCell className="text-course">{course.description}</CTableDataCell>
                <CTableDataCell className="text-course">
                  {course.modules?.length || 0}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/management/courses/${course._id}`)}
                  >
                    <CIcon icon={cilExternalLink} />
                  </CButton>
                  <CButton size="sm" className="me-2" onClick={() => openModal('edit', course)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" onClick={() => openModal('delete', course)}>
                    <CIcon icon={cilTrash} style={{ color: 'red' }} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CListGroup>

      <CModal
        visible={modalState.add}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Add course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse onSubmit={(courseData) => handleCourseAction('add', courseData)} />
        </CModalBody>
      </CModal>

      <CModal
        visible={modalState.edit}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Edit course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse
            courseToEdit={courseToEdit}
            onSubmit={(courseData) => handleCourseAction('edit', courseData)}
          />
        </CModalBody>
      </CModal>

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleCourseAction('delete')}
      />
    </div>
  )
}

export default CoursesManager
