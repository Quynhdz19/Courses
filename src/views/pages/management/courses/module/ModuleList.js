import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CContainer,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import ManageModule from 'src/views/pages/management/courses/module/ManageModule'
import BaseInputModule from 'src/views/pages/management/courses/module/BaseInputModule'
import BaseInputCourse from 'src/views/pages/management/courses/course/BaseInputCourse'

const ModuleList = () => {
  const modules = [
    {
      id: 1,
      name: 'Module 01: Nhập Môn',
      lessons: [
        {
          id: 1,
          name: 'Bài 01: Nhập môn',
        },
        {
          id: 2,
          name: 'Bài 02: Khái quát',
        },
      ],
    },
    {
      id: 2,
      name: 'Module 02: Lập Trình',
      lessons: [
        {
          id: 1,
          name: 'Bài 04: Route',
        },
        {
          id: 2,
          name: 'Bài 05: Controller',
        },
      ],
    },
    {
      id: 3,
      name: 'Module 03: Thực hành',
      lessons: [
        {
          id: 1,
          name: 'Bài 06: Làm ví dụ',
        },
      ],
    },
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisibleModule, setIsModalVisibleModule] = useState(false)
  const [isModalVisibleCourse, setIsModalVisibleCourse] = useState(false)
  const handleAddModule = (newCourse) => {
    setIsModalVisible(false)
  }

  const toggleModalCourse = () => {
    setIsModalVisibleCourse(!isModalVisibleCourse)
  }

  const toggleModalModule = () => {
    setIsModalVisibleModule(!isModalVisibleModule)
  }

  const handleCourseClick = (courseId) => {
    navigate(`/management/courses/course/${courseId}`)
  }

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
        <CInputGroupText style={{ cursor: 'pointer' }} onClick={() => handleSearch()}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>
      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={toggleModalModule} color="primary" size="sm">
          Thêm module <strong>+</strong>
        </CButton>
        <CButton onClick={toggleModalCourse} color="primary" size="sm">
          Sửa thông tin
        </CButton>
      </CContainer>

      <CCard className={'border-light'}>
        <CCardBody className="d-grid gap-2">
          {modules.map((module, index) => (
            <div>
              <ManageModule key={module.id} module={module} />
            </div>))}
        </CCardBody>
      </CCard>

      <CModal visible={isModalVisibleModule} onDismiss={toggleModalModule} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Module</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputModule />
        </CModalBody>
      </CModal>

      <CModal visible={isModalVisibleCourse} onDismiss={toggleModalCourse} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ModuleList


