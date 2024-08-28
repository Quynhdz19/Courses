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

// const AddModule = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const { courseId } = useParams();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const moduleData = { title, description };

//     try {
//       await CourseService.addModule(courseId, moduleData);
//       alert('Module added successfully');
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
//                     placeholder="Module Title"
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
//                     placeholder="Module Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </CInputGroup>

//                 <div className="d-grid">
//                   <CButton type="submit" color="primary">
//                     Add Module
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

// export default AddModule;

import React, { useState } from 'react'
import { CButton, CForm, CFormInput } from '@coreui/react'

const AddModule = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    const newModule = {
      id: Date.now(), // Unique ID
      title,
      description,
      lessons: [], // Lessons sẽ được thêm vào sau
    }
    onAdd(newModule)
    setTitle('')
    setDescription('')
  }

  return (
    <CForm>
      <CFormInput
        type="text"
        placeholder="Tên module"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CFormInput
        type="text"
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <CButton onClick={handleSubmit}>Thêm Module</CButton>
    </CForm>
  )
}

export default AddModule
