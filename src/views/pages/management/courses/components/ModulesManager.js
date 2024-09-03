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
import { cilSearch, cilPencil, cilExternalLink, cilTrash } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import BaseInputModule from 'src/views/pages/management/courses/components/BaseInputModule'
import BaseInputCourse from 'src/views/pages/management/courses/components/BaseInputCourse'

const ModulesManager = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisibleModule, setIsModalVisibleModule] = useState(false)
  const [isModalVisibleCourse, setIsModalVisibleCourse] = useState(false)
  const [selectedModules, setSelectedModules] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  const modules = [
    {
      id: 1,
      name: 'Module 01: Nhập Môn',
      lessons: [
        { id: 1, name: 'Bài 01: Nhập môn' },
        { id: 2, name: 'Bài 02: Khái quát' },
      ],
    },
    {
      id: 2,
      name: 'Module 02: Lập Trình',
      lessons: [
        { id: 1, name: 'Bài 04: Route' },
        { id: 2, name: 'Bài 05: Controller' },
      ],
    },
    {
      id: 3,
      name: 'Module 03: Thực hành',
      lessons: [
        { id: 1, name: 'Bài 06: Làm ví dụ' },
      ],
    },
  ]

  const toggleModalCourse = () => {
    setIsModalVisibleCourse(!isModalVisibleCourse)
  }

  const toggleModalModule = () => {
    setIsModalVisibleModule(!isModalVisibleModule)
  }

  const handleModuleClick = (moduleId) => {
    const selectedModule = modules.find(module => module.id === moduleId)
    navigate(`/management/courses/course/${id}/module/${moduleId}`, { state: { module: selectedModule } })
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedModules(modules.map(module => module.id))
    } else {
      setSelectedModules([])
    }
  }

  const handleSelectModule = (moduleId) => {
    if (selectedModules.includes(moduleId)) {
      setSelectedModules(selectedModules.filter(id => id !== moduleId))
    } else {
      setSelectedModules([...selectedModules, moduleId])
    }
  }

  const isDeleteButtonEnabled = selectedModules.length > 0

  const isHeaderCheckboxChecked = selectedModules.length === modules.length

  return (
    <div>
      <h1>Khóa học thoát giàu làm nghèo</h1>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Tìm kiếm module"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={toggleModalModule} color="primary" size="sm">
          Thêm module <strong>+</strong>
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
            <CTableRow className='textprimaryy'>
              <CTableHeaderCell className="col-1">
                <CFormCheck
                  checked={isHeaderCheckboxChecked}
                  onChange={handleSelectAll}
                />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-5">Name</CTableHeaderCell>
              <CTableHeaderCell className="col-1">Lesson</CTableHeaderCell>
              <CTableHeaderCell className="text-center col-3">
                Action
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {modules.map((module) => (
              <CTableRow key={module.id} className='textprimaryy'>
                <CTableDataCell>
                  <CFormCheck
                    checked={selectedModules.includes(module.id)}
                    onChange={() => handleSelectModule(module.id)}
                  />
                </CTableDataCell>

                <CTableDataCell>{module.name}</CTableDataCell>
                <CTableDataCell>{module.lessons.length}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton size="sm" className="me-2">
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" className="me-2" onClick={() => handleModuleClick(module.id)}>
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

      <CModal visible={isModalVisibleModule} onClose={toggleModalModule} className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Thêm Module</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputModule />
        </CModalBody>
      </CModal>

      <CModal visible={isModalVisibleCourse} onClose={toggleModalCourse} className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Thêm Khóa Học</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ModulesManager
