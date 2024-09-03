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

const BaseInputCourse = ({ onAdd }) => {
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
        <CCol>
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
                    Submit
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

export default BaseInputCourse;
