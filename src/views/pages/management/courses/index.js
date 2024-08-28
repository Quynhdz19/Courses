// import React, { useEffect, useState, createRef } from 'react'
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
//   CImage,
//   CLink,
//   CRow,
//   CCol,
//   CContainer,
// } from '@coreui/react'
// import { CIcon } from '@coreui/icons-react'
// import { cilSearch } from '@coreui/icons'
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
//         status: 'succes',
//       },
//     },
//     {
//       image: {
//         src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
//         status: 'succes',
//       },
//     },
//     {
//       image: {
//         src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
//         status: 'succes',
//       },
//     },
//     {
//       image: {
//         src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
//         status: 'succes',
//       },
//     },
//   ]
//   const tableExamples = [
//     {
//       id: 1,
//       image: { src: avatar1, status: 'success' },
//       title: ' Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 2,
//       image: { src: avatar1, status: 'success' },
//       title: ' Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 3,
//       image: { src: avatar1, status: 'success' },
//       title: ' Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 4,
//       image: { src: avatar1, status: 'success' },
//       title: ' Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 5,
//       image: { src: avatar1, status: 'success' },
//       title: ' Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//     {
//       id: 6,
//       image: { src: avatar1, status: 'success' },
//       title: ' Khóa học thoát giàu làm nghèo',
//       price: '100000',
//       avtar: { src: avatar2, status: 'success' },
//       name: 'TDZ',
//       lecture: '69 bài học',
//     },
//   ]

//   const handleClick = () => {
//     navigate('/courses/course')
//   }

//   const [courses, setCourses] = useState([])
//   const [selectedCourse, setSelectedCourse] = useState(null)

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible)
//   }


//   return (
//     <div>
//       <h1>Quản lý khóa học</h1>
//       <CInputGroup className="mb-3">
//         <CFormInput
//           type="text"
//           placeholder="Tìm kiếm khóa học"
//           value={searchTerm}
//         />
//         <CInputGroupText style={{ cursor: 'pointer' }}>
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
//           <CButton color="light" onClick={toggleModal} className="p-0 ms-auto">
//           </CButton>
//         </CModalHeader>
//         <CModalBody>
//           <AddCourse />
//         </CModalBody>
//       </CModal>
//       <div>
//         <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//           {tableExamples.map((item, index) => (
//             // eslint-disable-next-line react/jsx-key
//             <CLink href={`course/${item.id}`}>
//               <CCardBody className="d-grid gap-2">
//                 <CCard key={index} className="m-lg-3">
//                   <CCardImage size="md" src={item.image.src} status={item.image.status} />
//                   <CCardTitle>
//                     <span className="m-lg-2">{item.title}</span>
//                   </CCardTitle>
//                   <CCardText>
//                     <ins className="m-lg-2 text-primary">{item.price}</ins>
//                   </CCardText>
//                   <div style={{ display: 'flex', justifyContent: 'flex', flexWrap: 'wrap' }}>
//                     <CAvatar
//                       className="m-lg-1"
//                       size="md"
//                       src={item.avtar.src}
//                       status={item.avtar.status}
//                     />
//                     <CCardText>
//                       <div className="text-center m-lg-2">{item.name}</div>
//                     </CCardText>
//                     <CCardText style={{ display: 'flex', justifyContent: 'right' }}>
//                       <div className="text-center m-lg-2">{item.lecture}</div>
//                     </CCardText>
//                   </div>
//                 </CCard>
//               </CCardBody>
//             </CLink>
//           ))}
//         </div>
//       </div>
//       <div>
//         {courses.map((course) => (
//           <CCard key={course.id}>
//             <CCardHeader>{course.title}</CCardHeader>
//             <CCardBody>
//               <CButton onClick={() => setSelectedCourse(course)}>Xem chi tiết</CButton>
//               <CButton onClick={() => handleDeleteCourse(course.id)} color="danger">Xóa</CButton>
//               <UpdateCourse course={course} onUpdate={handleUpdateCourse} />
//             </CCardBody>
//           </CCard>
//         ))}
//       </div>
//       {selectedCourse && <ModuleList course={selectedCourse} />}
//     </div>
//   )
// }

// export default CourseManager


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CButton,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CContainer,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'
import AddCourse from 'src/views/pages/management/courses/course/AddCourse'
import ModuleList from 'src/views/pages/management/courses/module/ModuleList'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'

const CourseManager = () => {
  const navigate = useNavigate()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const imgCarousel = [
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'success',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'success',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'success',
      },
    },
    {
      image: {
        src: 'https://online.unicode.vn/storage/images/Laravel-banner.png?ver=1',
        status: 'success',
      },
    },
  ]

  const tableExamples = [
    {
      id: 1,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 2,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 3,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 4,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 5,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
    },
    {
      id: 6,
      image: { src: avatar1, status: 'success' },
      title: 'Khóa học thoát giàu làm nghèo',
      price: '100000',
      avtar: { src: avatar2, status: 'success' },
      name: 'TDZ',
      lecture: '69 bài học',
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

  return (
    <div>
      <h1>Quản lý module</h1>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Tìm kiếm khóa học"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText style={{ cursor: 'pointer' }} onClick={() => handleSearch()}>
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
          <AddCourse onAdd={handleAddCourse} />
        </CModalBody>
      </CModal>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {tableExamples.map((item) => (
          <CCard key={item.id} className="m-lg-3" onClick={() => handleCourseClick(item.id)} style={{ cursor: 'pointer' }}>
            <CCardBody className="d-grid gap-2">
              <CCardImage size="md" src={item.image.src} status={item.image.status} />
              <CCardTitle>
                <span className="m-lg-2">{item.title}</span>
              </CCardTitle>
              <CCardText>
                <ins className="m-lg-2 text-primary">{item.price}</ins>
              </CCardText>
              <div style={{ display: 'flex', justifyContent: 'flex', flexWrap: 'wrap' }}>
                <CAvatar
                  className="m-lg-1"
                  size="md"
                  src={item.avtar.src}
                  status={item.avtar.status}
                />
                <CCardText>
                  <div className="text-center m-lg-2">{item.name}</div>
                </CCardText>
                <CCardText style={{ display: 'flex', justifyContent: 'right' }}>
                  <div className="text-center m-lg-2">{item.lecture}</div>
                </CCardText>
              </div>
            </CCardBody>
          </CCard>
        ))}
      </div>
    </div>
  )
}

export default CourseManager



