import { cilSearch } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'
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
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ModuleService from 'src/services/ModuleService'
import BaseInputModule from '../../components/courses-management/modules/BaseInputModule'
import ModuleTable from 'src/views/components/courses-management/modules/ModuleTable'
import DeleteModal from 'src/views/components/courses-management/courses/DeleteModal'
import Pagination from 'src/views/components/courses-management/courses/Pagination'
import './CoursesManagementPage.scss'

const CourseModulesManagementPage = () => {
  const [modules, setModule] = useState([])
  const [nameCourse, setNameCourse] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
  const [selectedModules, setSelectedModules] = useState([])

  const { courseId } = useParams()

  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    size: 10,
    orderBy: 'createdAt',
    orderDirection: 'asc',
    search: null,
  })

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchQuery(prevQuery => ({ ...prevQuery, search: searchTerm, page: 1 }))
    }, 200)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm])

  useEffect(() => {
    fetchModules()
  }, [searchQuery])

  const fetchModules = async () => {
    try {
      const response = await ModuleService.getModules(courseId, searchQuery)
      setModules(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      console.error('Error fetching modules:', error)
    }
  }

  const handlePageChange = (page) => {
    setSearchQuery(prevQuery => ({ ...prevQuery, page }))
    setCurrentPage(page)
  }

  const closeModal = () => {
    setModalState({ add: false, edit: false, delete: false })
  }

  const handleUserAction = (moduleId, action) => {
    if (action === 'add') {
      setModalState({ add: true, edit: false, delete: false, moduleIdToAction: null })
    } else if (action === 'edit') {
      const moduleToEditData = modules.find(module => module._id === moduleId)
      setModuleToEdit(moduleToEditData)
      setModalState({ add: false, edit: true, delete: false, moduleIdToAction: moduleId })
    } else if (action === 'delete') {
      setModalState({ add: false, edit: false, delete: true, moduleIdToAction: moduleId })
    }
  }

  const handleModuleAction = async (action, moduleData = null) => {
    try {
      const moduleId = modalState.moduleIdToAction
      const formattedData = { moduleIds: moduleId ? [moduleId.toString()] : selectedModules.map(id => id.toString()) }
      if (action === 'add') {
        await ModuleService.addModule(courseId, moduleData)
      } else if (action === 'edit') {
        await ModuleService.updateModule(moduleId, moduleData)
      } else if (action === 'delete') {
        await ModuleService.deleteModules(courseId, formattedData)
      }
      fetchModules()
      closeModal()
    } catch (error) {
      console.error(`Error ${action} module:`, error)
    }
  }

  const handleSelectAll = (e) => {
    setSelectedModules(modules.length === selectedModules.length ? [] : modules.map(module => module._id))
  }

  const handleSelectedModule = (moduleId) => {
    setSelectedModules(prevSelectedModules =>
      prevSelectedModules.includes(moduleId)
        ? prevSelectedModules.filter(id => id !== moduleId)
        : [...prevSelectedModules, moduleId]
    )
  }

  const isDeleteButtonEnabled = selectedModules.length > 0
  const isHeaderCheckboxChecked = modules.length > 0 && selectedModules.length === modules.length

  return (
    <div>
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
        <CButton onClick={() => handleUserAction(null, 'add')} color="primary" size="sm">
          Add module
        </CButton>
        <CButton
          color="primary"
          size="sm"
          disabled={!isDeleteButtonEnabled}
          onClick={() => handleUserAction(null, 'delete')}
        >
          Delete
        </CButton>
      </CContainer>

      <CListGroup>
        <ModuleTable
          modules={modules}
          handleUserAction={handleUserAction}
          handleSelectedModule={handleSelectedModule}
          selectedModules={selectedModules}
          isHeaderCheckboxChecked={isHeaderCheckboxChecked}
          handleSelectAll={handleSelectAll}
        />
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
              <CTableRow
                key={module._id}
                onClick={() =>
                  navigate(
                    bindRouteParams(RouteMap.CourseLessonsManagementPage, [courseId, module._id]),
                  )
                }
                className="textprimaryy"
              >
                <CTableDataCell>
                  <CFormCheck
                    checked={selectedModules.includes(module._id)}
                    onChange={() => handleSelectModule(module._id)}
                  />
                </CTableDataCell>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
                <CTableDataCell>{`module ${id + 1}: ` + module.title}</CTableDataCell>
                <CTableDataCell>{module.lessons.length}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CTooltip content="Chi tiết lesson" placement="top">
                    <CButton
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      size="sm"
                      className="me-2"
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Thêm lesson" placement="top">
                    <CButton
                      size="sm"
                      className="me-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModuleClick(module._id)
                      }}
                    >
                      <CIcon icon={cilExternalLink} />
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Xoá module" placement="top">
                    <CButton
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
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
          <CModalTitle>Add module</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputModule onSubmit={(moduleData) => handleModuleAction('add', moduleData)} />
        </CModalBody>
      </CModal>

      <CModal
        visible={modalState.edit}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Edit module</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputModule
            moduleToEdit={moduleToEdit}
            onSubmit={(moduleData) => handleModuleAction('edit', moduleData)}
          />
        </CModalBody>
      </CModal>

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleModuleAction('delete')}
      />
    </div>
  )
}

export default CourseModulesManagementPage
