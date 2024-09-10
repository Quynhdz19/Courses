import { cilExternalLink, cilPencil, cilSearch, cilTrash } from '@coreui/icons'
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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import CourseService from 'src/services/CourseService'
import BaseInputModule from 'src/views/pages/management/courses/components/BaseInputModule'

const ModulesManager = () => {
  const [modules, setModule] = useState([])
  const [nameCourse, setNameCourse] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
  const [selectedModules, setSelectedModules] = useState([])
  const { courseId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourse()
  }, [])

  const fetchCourse = async () => {
    try {
      const response = await CourseService.getCourse(courseId)
      setModule(response.modules)
      setNameCourse(response.title)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleModuleClick = (moduleId) => {
    const selectedModule = modules.find((module) => module._id === moduleId)
    navigate(bindRouteParams(RouteMap.LessonsManagementPage, [courseId, moduleId]), {
      state: { module: selectedModule },
    })
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedModules(modules.map((module) => module._id))
    } else {
      setSelectedModules([])
    }
  }

  const handleSelectModule = (moduleId) => {
    if (selectedModules.includes(moduleId)) {
      setSelectedModules(selectedModules.filter((id) => id !== moduleId))
    } else {
      setSelectedModules([...selectedModules, moduleId])
    }
  }

  const openModal = (type, course = null) => {
    setModalState({ add: type === 'add', edit: type === 'edit', delete: type === 'delete' })
    // setCourseToEdit(course)
    // setCourseToDelete(course)
  }

  const closeModal = () => {
    setModalState({ add: false, edit: false, delete: false })
    // setCourseToEdit(null)
    // setCourseToDelete(null)
  }
  const handleCourseAction = async (action, courseData) => {
    try {
      if (action === 'add') {
        await CourseService.addModule(id, courseData)
      }
      fetchCourse()
    } catch (error) {
      console.error(`Error ${action} course:`, error)
    }
    closeModal()
  }

  const isDeleteButtonEnabled = selectedModules.length > 0

  const isHeaderCheckboxChecked = selectedModules.length === modules.length

  return (
    <div>
      <p className="fs-2">{nameCourse}</p>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={() => openModal('add')} color="primary" size="sm">
          Add module
        </CButton>
        <CButton color="danger" size="sm" disabled={!isDeleteButtonEnabled}>
          Delete
        </CButton>
      </CContainer>

      <CListGroup>
        <CTable hover responsive>
          <CTableHead color="primary">
            <CTableRow className="textprimaryy">
              <CTableHeaderCell className="col-1">
                <CFormCheck checked={isHeaderCheckboxChecked} onChange={handleSelectAll} />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-5">Name</CTableHeaderCell>
              <CTableHeaderCell className="col-1">Lesson</CTableHeaderCell>
              <CTableHeaderCell className="text-center col-3">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {modules.map((module, id) => (
              <CTableRow key={module._id} className="textprimaryy">
                <CTableDataCell>
                  <CFormCheck
                    checked={selectedModules.includes(module._id)}
                    onChange={() => handleSelectModule(module._id)}
                  />
                </CTableDataCell>

                <CTableDataCell>{`module ${id + 1}: ` + module.title}</CTableDataCell>
                <CTableDataCell>{module.lessons.length}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton size="sm" className="me-2">
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" className="me-2" onClick={() => handleModuleClick(module._id)}>
                    <CIcon icon={cilExternalLink} />
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
      <CModal
        visible={modalState.add}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Add module</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputModule onSubmit={(courseData) => handleCourseAction('add', courseData)} />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ModulesManager
