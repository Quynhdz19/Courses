import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCollapse,
  CListGroup,
  CButton,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormCheck,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CContainer
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMinus, cilPlus, cilPencil, cilTrash, cilExternalLink } from '@coreui/icons'
import DeleteDialog from 'src/views/base/deleteDialog/DeleteDialog'
import BaseInputModule from 'src/views/pages/management/courses/module/BaseInputModule'
import BaseInputLesson from 'src/views/pages/management/courses/lesson/BaseInputLesson'

const ManageModule = (props) => {
  const [visible, setVisible] = useState(false)
  const [selectedLessons, setSelectedLessons] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [currentLessonId, setCurrentLessonId] = useState(null) 
  const [isModalVisibleLesson, setIsModalVisibleLesson] = useState(false)
  const [isModalVisibleModule, setIsModalVisibleModule] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDeleteModule = () => {
    
    setShowConfirmation(false)
   
  }

 
  const handleDeleteLesson = () => {
    
    setShowConfirmation(false)
    
  }
  const toggleModalModule = () => {
    setIsModalVisibleModule(!isModalVisibleModule)
  }

  const toggleModalLesson = () => {
    setIsModalVisibleLesson(!isModalVisibleLesson)
  }

  const handleClick = (lessonId) => {
    navigate(`/courses-detail/${id}/lesson-learn/${lessonId}`)
  }

  const handleTitleClick = (e) => {
    e.stopPropagation()
    setVisible(!visible)
  }

  const handleHeaderCheckChange = (e) => {
    const isChecked = e.target.checked
    setSelectedLessons(isChecked ? props.module.lessons.map(lesson => lesson.id) : [])
  }

  const handleLessonCheckChange = (lessonId) => {
    setSelectedLessons(prevSelected => {
      if (prevSelected.includes(lessonId)) {
        return prevSelected.filter(id => id !== lessonId)
      } else {
        return [...prevSelected, lessonId]
      }
    })
  }

  const isDeleteButtonEnabled = selectedLessons.length > 0

  const openDeleteDialog = (type, lessonId = null) => {
    setConfirmationType(type)
    setCurrentLessonId(lessonId)
    setShowConfirmation(true)
  }

  return (
    <CCard className={'border-light'} style={{ cursor: 'pointer' }} aria-expanded={visible} aria-controls="collapse">
      <CCardBody>
        <CCardTitle onClick={handleTitleClick}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {props.module.name}
            <div>{visible ? <CIcon icon={cilMinus} /> : <CIcon icon={cilPlus} />}</div>
          </div>
        </CCardTitle>
        <CCollapse id="collapse" visible={visible}>
          <CListGroup flush>
            <CTable hover responsive>
              <CTableHead color="primary">
                <CTableRow className='textprimaryy'>
                  <CTableHeaderCell className="col-1">
                    <CFormCheck
                      onChange={handleHeaderCheckChange}
                      checked={selectedLessons.length === props.module.lessons.length}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell className="col-6">Name</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-3">Action</CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-2">
                    <CButton onClick={toggleModalLesson} color="primary" size="sm">
                      Thêm
                    </CButton>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-2">
                    <CButton onClick={toggleModalModule} color="primary" size="sm">
                      sửa
                    </CButton>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center col-2">
                    <CButton
                      color="primary" size="sm"
                      onClick={() => openDeleteDialog('module')}
                      disabled={!isDeleteButtonEnabled}
                      style={{ opacity: isDeleteButtonEnabled ? 1 : 0.5 }}
                    >
                      Xóa
                    </CButton>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {props.module.lessons.map((lesson) => (
                  <CTableRow key={lesson.id} className='textprimaryy'>
                    <CTableDataCell>
                      <CFormCheck
                        checked={selectedLessons.includes(lesson.id)}
                        onChange={() => handleLessonCheckChange(lesson.id)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{lesson.name}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton className="me-2" onClick={toggleModalLesson} >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton className="me-2" onClick={() => handleClick(lesson.id)}>
                        <CIcon icon={cilExternalLink} />
                      </CButton>
                      <CButton
                        onClick={() => openDeleteDialog('lesson', lesson.id)}
                      >
                        <CIcon icon={cilTrash} style={{ color: 'red' }} />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell />
                    <CTableDataCell />
                    <CTableDataCell />
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CListGroup>
        </CCollapse>
        <CContainer />
        <DeleteDialog
          visible={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={() => {
            if (confirmationType === 'module') {
              handleDeleteModule()
            } else if (confirmationType === 'lesson') {
              handleDeleteLesson(currentLessonId)
            }
          }}
        />
        <CModal visible={isModalVisibleModule} onDismiss={toggleModalModule} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
          <CModalHeader>
            <CModalTitle>Module</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <BaseInputModule />
          </CModalBody>
        </CModal>

        <CModal visible={isModalVisibleLesson} onDismiss={toggleModalLesson} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
          <CModalHeader>
            <CModalTitle>Lesson</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <BaseInputLesson />
          </CModalBody>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

ManageModule.propTypes = {
  module: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lessons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
}

export default ManageModule

