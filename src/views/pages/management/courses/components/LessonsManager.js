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
import CourseService from 'src/services/CourseService'
import BaseInputLesson from 'src/views/pages/management/courses/components/BaseInputLesson'
import DeleteModal from 'src/views/pages/management/courses/components/DeleteModal'


const LessonsManager = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLessons, setSelectedLessons] = useState([])
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
  const [lessonToEdit, setLessonToEdit] = useState(null)
  const [lessonToDelete, setLessonToDelete] = useState(null)

  const module = location.state?.module || []
  const lessons = module.lessons || []

  const openModal = (type, lesson = null) => {
    setModalState({ add: type === 'add', edit: type === 'edit', delete: type === 'delete' })
    setLessonToEdit(lesson)
    setLessonToDelete(lesson)
  }

  const closeModal = () => {
    setModalState({ add: false, edit: false, delete: false })
    setLessonToEdit(null)
    setLessonToDelete(null)
  }

  const handleLessonAction = async (action, lessonData = null) => {
    try {
      if (action === 'add') {
        await CourseService.addLesson()  // TODO: Quynh todo
      }
      fetchCourses()
    } catch (error) {
      console.error(`Error ${action} lesson:`, error)
    }
    closeModal()
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
        <CButton onClick={() => openModal('add')} color="primary" size="sm">
          Add lesson
        </CButton>
        <CButton color="primary" size="sm">
          Edit module
        </CButton>
        <CButton
          color="danger"
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
            <CTableRow>
              <CTableHeaderCell className="col-1">
                <CFormCheck
                  checked={isHeaderCheckboxChecked}
                  onChange={handleSelectAll}
                />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-4">Name</CTableHeaderCell>
              <CTableHeaderCell className="col-4">Description</CTableHeaderCell>
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
                <CTableDataCell>{lesson.description}</CTableDataCell>
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

      <CModal visible={modalState.add} onClose={closeModal} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Add lesson</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputLesson onSubmit={(lessonData) => handleLessonAction('add', lessonData)} />
        </CModalBody>
      </CModal>

      <CModal visible={modalState.edit} onClose={closeModal} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Edit lesson</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputLesson
            lessonToEdit={lessonToEdit}
            onSubmit={(lessonData) => handleLessonAction('edit', lessonData)}
          />
        </CModalBody>
      </CModal>

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleLessonAction('delete')}
      />
    </div>
  )
}

export default LessonsManager