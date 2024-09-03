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
import { cilMovie, cilPencil, cilDescription } from '@coreui/icons';

const BaseInputCourse = () => {
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol>
          <CCard>
            <CCardBody>
              <CForm>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Tên bài học"
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
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilMovie} />
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
