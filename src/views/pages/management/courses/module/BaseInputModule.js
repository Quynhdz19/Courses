import React, { useState } from 'react'
import {
  CContainer,
  CCard,
  CCardBody,
  CButton,
  CForm,
  CInputGroup,
  CInputGroupText,
  CCol,
  CRow,
  CFormInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPencil, cilDescription } from '@coreui/icons';

const BaseInputModule = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
                    placeholder="Tên module"
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
  )
}

export default BaseInputModule
