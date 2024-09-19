import { cilPencil, cilSearch, cilTrash } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'
import {
  CButton,
  CContainer,
  CFormCheck,
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
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import CourseService from 'src/services/CourseService'
import DeleteModal from '../../components/courses-management/courses/DeleteModal'
import BaseInputLesson from '../../components/courses-management/lessons/BaseInputLesson'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'

const CourseLessonsManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [moduleDetail, setModule] = useState([])
  const [selectedLessons, setSelectedLessons] = useState([])
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
  const [lessonToEdit, setLessonToEdit] = useState(null)
  const [lessonToDelete, setLessonToDelete] = useState(null)

  const openModal = (type, lesson = null) => {
    setModalState({ add: type === 'add', edit: type === 'edit', delete: type === 'delete' })
    setLessonToEdit(lesson)
    setLessonToDelete(lesson)
  }

  const { courseId, moduleId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetchModule()
  }, [])

  const fetchModule = async () => {
    try {
      const response = await CourseService.getDetailModule(moduleId)
      setModule(response.lessons)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const closeModal = () => {
    setModalState({ add: false, edit: false, delete: false })
    setLessonToEdit(null)
    setLessonToDelete(null)
  }

  const handleLessonAction = async (action, lessonData = null) => {
    const presigned = await CourseService.getUploadPresignedUrl({
      filename: lessonData.video.name,
      filetype: lessonData.video.type,
    })

    const response = await fetch(presigned.presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': lessonData.video.type,
      },
      body: lessonData.video,
    })
    if (response.status === 200) {
      lessonData.s3VideoKey = presigned.s3VideoKey
      try {
        if (action === 'add') {
          await CourseService.addLesson(moduleId, {
            title: lessonData.title,
            description: lessonData.description,
            s3VideoKey: presigned.s3VideoKey,
          })
        }
      } catch (error) {
        console.error(`Error ${action} lesson:`, error)
      }
      fetchModule()
      closeModal()
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLessons(lessons.map((lesson) => lesson._id))
    } else {
      setSelectedLessons([])
    }
  }

  const handleSelectLesson = (lessonId) => {
    if (selectedLessons.includes(lessonId)) {
      setSelectedLessons(selectedLessons.filter((id) => id !== lessonId))
    } else {
      setSelectedLessons([...selectedLessons, lessonId])
    }
  }

  const isDeleteButtonEnabled = selectedLessons.length > 0
  const isHeaderCheckboxChecked = selectedLessons.length === moduleDetail.length

  return (
    <div>
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
                <CFormCheck checked={isHeaderCheckboxChecked} onChange={handleSelectAll} />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-4">Name</CTableHeaderCell>
              <CTableHeaderCell className="col-4">Description</CTableHeaderCell>
              <CTableHeaderCell className="text-center col-3">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {moduleDetail.map((lesson) => (
              <CTableRow
                key={lesson._id}
                onClick={() => {
                  console.log(courseId, lesson._id)
                  navigate(bindRouteParams(RouteMap.LessonPage, [courseId, lesson._id]))
                }
                }
              >
                <CTableDataCell>
                  <CFormCheck
                    checked={selectedLessons.includes(lesson._id)}
                    onChange={() => handleSelectLesson(lesson._id)}
                  />
                </CTableDataCell>

                <CTableDataCell>{lesson.title}</CTableDataCell>
                <CTableDataCell>{lesson.description}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CTooltip content="Edit lesson" placement="top">
                    <CButton size="sm" className="me-2">
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Delete lesson" placement="top">
                    <CButton size="sm">
                      <CIcon icon={cilTrash} style={{ color: 'red' }} />
                    </CButton>
                  </CTooltip>
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
          <CModalTitle>Add lesson</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputLesson onSubmit={(lessonData) => handleLessonAction('add', lessonData)} />
        </CModalBody>
      </CModal>

      <CModal
        visible={modalState.edit}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
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

export default CourseLessonsManagementPage
