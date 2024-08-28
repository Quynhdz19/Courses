// import React, { useState } from 'react';
// import CourseService from 'src/services/CourseService';
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
// import { cilImage, cilPencil, cilDescription } from '@coreui/icons';

// const AddCourse = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       await CourseService.addCourse(formData);
//       alert('Course added successfully');
//       history.push('/courses');
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
//                     placeholder="Title"
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
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </CInputGroup>

//                 <CInputGroup className="mb-3">
//                   <CInputGroupText>
//                     <CIcon icon={cilImage} />
//                   </CInputGroupText>
//                   <CFormInput type="file" onChange={(e) => setImage(e.target.files[0])} />
//                 </CInputGroup>

//                 <div className="d-grid">
//                   <CButton type="submit" color="primary">
//                     Add Course
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

// export default AddCourse;


// import React, { useState } from 'react'
// import { CButton, CForm, CFormInput } from '@coreui/react'

// const AddCourse = ({ onAdd }) => {
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')

//   const handleSubmit = () => {
//     const newCourse = {
//       id: Date.now(), // Unique ID
//       title,
//       description,
//       modules: [], // Modules sẽ được thêm vào sau
//     }
//     onAdd(newCourse)
//     setTitle('')
//     setDescription('')
//   }

//   return (
//     <CForm>
//       <CFormInput
//         type="text"
//         placeholder="Tên khóa học"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <CFormInput
//         type="text"
//         placeholder="Mô tả"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <CButton onClick={handleSubmit}>Thêm Khóa Học</CButton>
//     </CForm>
//   )
// }

// export default AddCourse


import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilImage, cilPencil, cilDescription } from '@coreui/icons';

const AddCourse = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    const newCourse = {
      id: Date.now(),
      title,
      description,
      modules: [],
    }
    onAdd(newCourse)
    setTitle('')
    setDescription('')
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Tên khóa học"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilDescription} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilImage} />
                  </CInputGroupText>
                  <CFormInput type="file" onChange={(e) => setImage(e.target.files[0])} />
                </CInputGroup>

                <div className="d-grid">
                  <CButton type="submit" color="primary">
                    Add Course
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddCourse;
