// import React, { useState } from 'react';
// import CourseService from 'src/services/CourseService';
// import { useParams } from 'react-router-dom';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilPencil, cilDescription } from '@coreui/icons';

// const AddLesson = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const { moduleId } = useParams();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const lessonData = { title, description };

//     try {
//       await CourseService.addLesson(moduleId, lessonData);
//       alert('Lesson added successfully');
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <CContainer>
//       <CRow className="justify-content-center">
//         <CCol md={8}>
//           <CCard>
//             <CCardBody>
//               <CForm onSubmit={handleSubmit}>
//                 <CInputGroup className="mb-3">
//                   <CInputGroupText>
//                     <CIcon icon={cilPencil} />
//                   </CInputGroupText>
//                   <CFormInput
//                     placeholder="Lesson Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                 </CInputGroup>

//                 <CInputGroup className="mb-3">
//                   <CInputGroupText>
//                     <CIcon icon={cilDescription} />
//                   </CInputGroupText>
//                   <CFormInput
//                     placeholder="Lesson Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </CInputGroup>

//                 <div className="d-grid">
//                   <CButton type="submit" color="primary">
//                     Add Lesson
//                   </CButton>
//                 </div>
//               </CForm>
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </CContainer>
//   );
// };

// export default AddLesson;

import React, { useState } from 'react'
import { CButton, CForm, CFormInput } from '@coreui/react'

const AddLesson = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    const newLesson = {
      id: Date.now(), // Unique ID
      title,
      description,
    }
    onAdd(newLesson)
    setTitle('')
    setDescription('')
  }

  return (
    <CForm>
      <CFormInput
        type="text"
        placeholder="Tên bài học"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CFormInput
        type="text"
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <CButton onClick={handleSubmit}>Thêm Bài Học</CButton>
    </CForm>
  )
}

export default AddLesson

