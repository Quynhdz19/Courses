// import React, { useState } from 'react'
// import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
// import AddLesson from 'src/views/pages/management/courses/lesson/AddLesson'
// import LessonDetail from 'src/views/pages/management/courses/lesson/LessonDetail'

// const ModuleList = () => {
//   const [selectedLesson, setSelectedLesson] = useState(null)


//   return (
//     <div>
//       <h3>Chi tiết Module: {module.title}</h3>
//       <AddLesson/>
//       <div>
//         {module.lessons.map((lesson) => (
//           <CCard key={lesson.id}>
//             <CCardHeader>{lesson.title}</CCardHeader>
//             <CCardBody>
//               <CButton>Xem chi tiết</CButton>
//               <CButton color="danger">Xóa</CButton>
//             </CCardBody>
//           </CCard>
//         ))}
//       </div>
//       {selectedLesson && <LessonDetail lesson={selectedLesson} />}
//     </div>
//   )
// }

// export default ModuleList


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
import { cilSearch, cilX } from '@coreui/icons'
import CourseDetailModuleCollapse from 'src/views/pages/management/courses/module/CollapseModule'
import AddModule from 'src/views/pages/management/courses/module/AddModule'

const ModuleList = () => {
  const modules = [
    {
      name: 'Module 01: Nhập Môn',
      lessons: [
        {
          id: 1,
          name: 'Bài 01: Nhập môn',
        },
      ],
    },
    {
      name: 'Module 02: Lập Trình',
      lessons: [
        {
          id: 1,
          name: 'Bài 04: Route',
        },
        {
          id: 1,
          name: 'Bài 05: Controller',
        },
      ],
    },
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleAddModule = (newCourse) => {
    setIsModalVisible(false)
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
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

      <CContainer className="d-flex justify-content-end mb-4">
        <CButton onClick={toggleModal} color="primary">
          Thêm module +
        </CButton>
      </CContainer>

      <CModal visible={isModalVisible} onDismiss={toggleModal} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Thêm Khóa Học</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddModule />
        </CModalBody>
      </CModal>


      <CCard className={'border-light'}>
        <CCardBody className="d-grid gap-2">
          <CCardTitle>
            <strong>Bài Học</strong>
          </CCardTitle>

          {modules.map((module, index) => (
            <div>
              <CourseDetailModuleCollapse key={index} module={module} />
            </div>))}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ModuleList