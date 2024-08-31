// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   CAvatar,
//   CCard,
//   CCardBody,
//   CCardImage,
//   CCardText,
//   CCardTitle,
//   CButton,
//   CCardHeader,
//   CModal,
//   CModalBody,
//   CModalHeader,
//   CModalTitle,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CContainer,
// } from '@coreui/react'
// import { CIcon } from '@coreui/icons-react'
// import { cilSearch, cilX } from '@coreui/icons'
// import AddCourse from 'src/views/pages/management/courses/course/AddCourse'
// import ModuleList from 'src/views/pages/management/courses/module/ModuleList'
// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'

// const CourseManager = () => {
//   const navigate = useNavigate()

//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [searchTerm, setSearchTerm] = useState('')

//   const imgCarousel = [
//     {
//       image: {
//         src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
//         status: 'success',
//       },
//     },
//     {
//       image: {
//         src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
//         status: 'success',
//       },
//     },
//     {
//       image: {
//         src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
//         status: 'success',
//       },
//     },
//     {
//       image: {
//         src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
//         status: 'success',
//       },
//     },
//   ]

//   const tableExamples = [
//     {
//       id: 1,
//       image: { src: avatar1, status: 'success' },
//       title: 'Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 2,
//       image: { src: avatar1, status: 'success' },
//       title: 'Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 3,
//       image: { src: avatar1, status: 'success' },
//       title: 'Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 4,
//       image: { src: avatar1, status: 'success' },
//       title: 'Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 5,
//       image: { src: avatar1, status: 'success' },
//       title: 'Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 6,
//       image: { src: avatar1, status: 'success' },
//       title: 'Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//   ]

//   const handleAddCourse = (newCourse) => {
//     setCourses([...courses, newCourse])
//     setIsModalVisible(false)
//   }

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible)
//   }

//   const handleCourseClick = (courseId) => {
//     navigate(`/management/courses/course/${courseId}`)
//   }

//   return (
//     <div>
//       <h2>Quản lý khóa học</h2>
//       <CInputGroup className="mb-3">
//         <CFormInput
//           type="text"
//           placeholder="Tìm kiếm khóa học"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <CInputGroupText style={{ cursor: 'pointer' }} onClick={() => handleSearch()}>
//           <CIcon icon={cilSearch} />
//         </CInputGroupText>
//       </CInputGroup>

//       <CContainer className="d-flex justify-content-end mb-4">
//         <CButton onClick={toggleModal} color="primary">
//           Thêm khóa học +
//         </CButton>
//       </CContainer>

//       <CModal visible={isModalVisible} onDismiss={toggleModal} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
//         <CModalHeader>
//           <CModalTitle>Thêm Khóa Học</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <AddCourse onAdd={handleAddCourse} />
//         </CModalBody>
//       </CModal>
//       <CContainer>

//       </CContainer>

//       {/* <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//         {tableExamples.map((item) => (
//           <CCard key={item.id} className="m-lg-3" onClick={() => handleCourseClick(item.id)} style={{ cursor: 'pointer' }}>
//             <CCardBody className="d-grid gap-2">
//               <CCardImage size="" src={item.image.src} status={item.image.status} />
//               <CCardTitle>
//                 <span className="m-lg-2">{item.title}</span>
//               </CCardTitle>
//               <CCardText>
//                 <ins className="m-lg-2 text-primary">{item.price}</ins>
//               </CCardText>
//               <div style={{ display: 'flex', justifyContent: 'flex', flexWrap: 'wrap' }}>
//                 <CAvatar
//                   className="m-lg-1"
//                   size="md"
//                   src={item.avtar.src}
//                   status={item.avtar.status}
//                 />
//                 <CCardText>
//                   <div className="text-center m-lg-2">{item.name}</div>
//                 </CCardText>
//                 <CCardText style={{ display: 'flex', justifyContent: 'right' }}>
//                   <div className="text-center m-lg-2">{item.lecture}</div>
//                 </CCardText>
//               </div>
//             </CCardBody>
//           </CCard>
//         ))}
//       </div> */}
//     </div>
//   )
// }

// export default CourseManager

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CContainer,
  CCardImage,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormCheck,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash, cilExternalLink } from '@coreui/icons'
import "./indexx.css"
import BaseInputCourse from 'src/views/pages/management/courses/course/BaseInputCourse'
import avatar1 from 'src/assets/images/avatars/1.jpg'

const CoursesManager = () => {
  const navigate = useNavigate()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const courseExamples = [
    {
      id: 1,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      module: [
        { id: '1' },
        { id: '2' },
      ],
    },
    {
      id: 2,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      module: [
        { id: '3' },
        { id: '4' },
      ],
    },
    {
      id: 3,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      module: [
        { id: '5' },
        { id: '6' },
      ],
    },
  ]

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse])
    setIsModalVisible(false)
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleCourseClick = (courseId) => {
    navigate(`/management/courses/course/${courseId}`)
  }
  const handleEditCourse = () => {
    
  }
  

  return (
    <div>
      <h2>Quản lý khóa học</h2>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Tìm kiếm khóa học"
        />
        <CInputGroupText style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4">
        <CButton onClick={toggleModal} color="primary">
          Thêm khóa học +
        </CButton>
      </CContainer>

      <CModal visible={isModalVisible} onDismiss={toggleModal} backdrop="static" className="modal-lg d-flex justify-content-center align-items-center">
        <CModalHeader>
          <CModalTitle>Thêm Khóa Học</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse onAdd={handleAddCourse} />
        </CModalBody>
      </CModal>
      <CContainer>
        <CTable hover responsive>
          <CTableHead color="primary">
            <CTableRow className='textprimaryy'>
              <CTableHeaderCell>
                <CFormCheck />
              </CTableHeaderCell>
              <CTableHeaderCell className="col-1" />
              <CTableHeaderCell className="col-4" >Name</CTableHeaderCell>
              <CTableHeaderCell className="col-2">Price</CTableHeaderCell>
              <CTableHeaderCell className="col-2">Module</CTableHeaderCell>
              <CTableHeaderCell className="text-center col-3">
                Action
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {courseExamples.map((item) => (
              <CTableRow key={item.id} className='textprimaryy'>
                <CTableDataCell>
                  <CFormCheck />
                </CTableDataCell>
                <CTableDataCell>
                  <CCardImage src={item.image.src} className="rounded" />
                </CTableDataCell>
                <CTableDataCell>{item.title}</CTableDataCell>
                <CTableDataCell>{item.price} $</CTableDataCell>
                <CTableDataCell>{item.module.length}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton size="sm" className="me-2" onClick={() => handleEditCourse(item.id)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" className="me-2" onClick={() => handleCourseClick(item.id)}>
                    <CIcon icon={cilExternalLink} />
                  </CButton>
                  <CButton size="sm" onClick={() => handleDeleteCourse(item.id)}>
                    <CIcon icon={cilTrash} style={{ color: 'red' }}></CIcon>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CContainer>
    </div>
  )
}

export default CoursesManager





